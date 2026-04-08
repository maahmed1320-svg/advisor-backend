import { Router } from 'express'
import { supabase } from '../supabase.js'
import { runAdvisoryEngine } from '../engine.js'

export const router = Router()

router.get('/student/:id', async (req, res) => {
  const { id } = req.params
  const currentSemester = req.query.semester ?? 'spring'

  const manualOverrides = {}
  if (req.query.overrides) {
    for (const part of req.query.overrides.split(',')) {
      const [code, verdict] = part.split(':')
      if (code && (verdict === 'pass' || verdict === 'fail'))
        manualOverrides[code] = verdict === 'pass'
    }
  }

  const { data: student, error: sErr } = await supabase
    .from('students')
    .select('*, major:majors(id, code, name, required_credits)')
    .eq('id', id).single()
  if (sErr || !student) return res.status(404).json({ error: 'Student not found' })

  const { data: enrollments, error: eErr } = await supabase
    .from('enrollments')
    .select('*, course:courses(code, name, credits, type, semester_offered, once_per_year, instructor, days, time_slot, room)')
    .eq('student_id', id)
  if (eErr) return res.status(500).json({ error: 'Failed to fetch enrollments' })

  const { data: allCourses, error: cErr } = await supabase
    .from('courses')
    .select('code, name, credits, type, semester_offered, once_per_year, instructor, days, time_slot, room, major_id')
    .or(`major_id.eq.${student.major.id},major_id.is.null`)
  if (cErr) return res.status(500).json({ error: 'Failed to fetch courses' })

  const courseCodes = allCourses.map(c => c.code)
  const { data: prerequisites, error: pErr } = await supabase
    .from('prerequisites')
    .select('course_code, requires_code')
    .in('course_code', courseCodes)
  if (pErr) return res.status(500).json({ error: 'Failed to fetch prerequisites' })

  // Fetch sections for the current semester
  const { data: sections } = await supabase
    .from('course_sections')
    .select('course_code, section_number, instructor, days, time_slot, room, instructor2, days2, time_slot2, room2, status')
    .eq('semester', currentSemester)
    .in('course_code', courseCodes)

  // Build sections map: code → [section, ...]
  const sectionsMap = {}
  for (const sec of (sections || [])) {
    if (!sectionsMap[sec.course_code]) sectionsMap[sec.course_code] = []
    sectionsMap[sec.course_code].push(sec)
  }

  const payload = runAdvisoryEngine({
    student, enrollments, allCourses, prerequisites,
    manualOverrides, currentSemester, sectionsMap,
  })

  return res.json(payload)
})

router.post('/cart', async (req, res) => {
  const { student_id, courses, term } = req.body
  if (!student_id || !Array.isArray(courses) || !courses.length)
    return res.status(400).json({ error: 'student_id and courses[] required' })
  const rows = courses.map(code => ({ student_id, course_code: code, term: term ?? null, status: 'pending' }))
  const { data, error } = await supabase.from('cart_submissions').insert(rows).select()
  if (error) return res.status(500).json({ error: error.message })
  return res.status(201).json({ submitted: data.length, courses: data })
})

router.get('/cart/:student_id', async (req, res) => {
  const { data, error } = await supabase
    .from('cart_submissions')
    .select('*, course:courses(name, credits, instructor, days, time_slot, room)')
    .eq('student_id', req.params.student_id)
    .eq('status', 'pending')
    .order('submitted_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
  return res.json(data)
})

router.get('/health', (_, res) => res.json({ ok: true }))
