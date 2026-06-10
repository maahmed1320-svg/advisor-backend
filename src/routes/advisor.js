import { Router } from 'express'
import { supabase } from '../supabase.js'
import { runAdvisoryEngine } from '../engine.js'

export const router = Router()

// ── Simple in-memory cache: studentId → raw data ─────────────
const studentCache = new Map()

// ============================================================
// 1. GET /student/:id
// ============================================================
router.get('/student/:id', async (req, res) => {
  const { id } = req.params
  const currentSemester = req.query.semester ?? 'fall'

  const { data: student, error: sErr } = await supabase
    .from('students')
    .select('*, major:majors(id, code, name, required_credits)')
    .eq('ID', parseInt(id))
    .single()

  if (sErr || !student) return res.status(404).json({ error: 'Student not found' })
  if (!student.major?.id) return res.status(400).json({ error: 'Student major missing' })

  const { data: enrollments, error: mErr } = await supabase
    .from('enrollment')
    .select('*')
    .eq('student_id', id)

  if (mErr) return res.status(500).json({ error: 'Failed to fetch enrollments' })

  const { data: allCourses, error: cErr } = await supabase
    .from('courses')
    .select('*')

  if (cErr) return res.status(500).json({ error: 'Failed to fetch courses' })

  const sectionsMap = (allCourses || []).reduce((acc, sec) => {
    if (!acc[sec.descr]) acc[sec.descr] = []
    acc[sec.descr].push(sec)
    return acc
  }, {})

  // ── Save to cache so /compute can reuse it ────────────────
  studentCache.set(id, { student, enrollments: enrollments || [], sectionsMap, currentSemester })

  const result = runAdvisoryEngine({
    student,
    enrollments: enrollments || [],
    sectionsMap,
    manualOverrides: {},
    currentSemester,
  })

  // No need to send raw to frontend anymore
  return res.json({ result })
})

// ============================================================
// 2. POST /student/:id/compute
// ============================================================
router.post('/student/:id/compute', async (req, res) => {
  try {
    const { id } = req.params
    const { overrides = {} } = req.body   // only overrides from frontend now

    // ── Pull raw data from cache ──────────────────────────────
    const cached = studentCache.get(id)
    if (!cached) {
      return res.status(400).json({ error: 'Session expired. Please reload the student first.' })
    }

    const result = runAdvisoryEngine({
      student:         cached.student,
      enrollments:     cached.enrollments,
      sectionsMap:     cached.sectionsMap,
      manualOverrides: overrides,
      currentSemester: cached.currentSemester,
    })

    return res.json({ result })

  } catch (error) {
    console.error('Computation Endpoint Error:', error)
    return res.status(500).json({ error: 'Internal computation error.' })
  }
})

router.get('/health', (_, res) => res.json({ ok: true }))

// ============================================================
// 3. POST /student/:id/enroll (Submit Cart to Database)
// ============================================================
router.post('/student/:id/enroll', async (req, res) => {
  const { id: studentId } = req.params;
  const { courses = [] } = req.body;

  if (courses.length === 0) {
    return res.status(400).json({ error: 'Cannot submit an empty cart schedule.' });
  }

  try {
    const studentIntId = parseInt(studentId);

    // 💡 UNIQUE GUARD: Fetch existing records to prevent duplicates
    const { data: existingRows } = await supabase
      .from('cart_submissions')
      .select('course_code')
      .eq('student_id', studentIntId);

    const existingCodes = new Set((existingRows || []).map(r => r.course_code));
    
    // Filter out rows that are already present in the table
    const targetPayloadCourses = courses.filter(c => !existingCodes.has(c.code));

    if (targetPayloadCourses.length === 0) {
      return res.status(400).json({ error: 'All selected courses are already submitted.' });
    }

    const rowsToInsert = targetPayloadCourses.map(item => {
      const termRaw = item.session || 'FAL';
      const termClean = termRaw.toUpperCase().includes('SUM') ? 'SUM' : 'FAL';

      return {
        student_id: studentIntId,
        course_code: item.code,
        term: termClean,
        status: 'Submitted',
        submitted_at: new Date().toISOString()
      };
    });

    const { error: dbErr } = await supabase
      .from('cart_submissions')
      .insert(rowsToInsert);

    if (dbErr) throw dbErr;

    return res.json({ success: true, message: 'Schedule cart securely submitted.' });

  } catch (e) {
    console.error('Cart Submission Database Error:', e);
    return res.status(500).json({ error: `Database Save Failed: ${e.message}` });
  }
});

// ============================================================
// 4. DELETE /student/:id/enroll (Withdraw & Clear Database Rows)
// ============================================================
router.delete('/student/:id/enroll', async (req, res) => {
  const { id: studentId } = req.params;
  const { codes = [] } = req.body;

  if (codes.length === 0) {
    return res.status(400).json({ error: 'Missing target course codes for withdrawal deletion.' });
  }

  try {
    // Drops targeted submitted courses matching the student pointer
    const { error: dbErr } = await supabase
      .from('cart_submissions')
      .delete()
      .eq('student_id', parseInt(studentId))
      .in('course_code', codes);

    if (dbErr) throw dbErr;

    return res.json({ success: true, message: 'Target courses successfully withdrawn.' });

  } catch (e) {
    console.error('Cart Withdrawal Database Error:', e);
    return res.status(500).json({ error: `Database Deletion Failed: ${e.message}` });
  }
});