// ============================================================
// ADVISORY ENGINE
//
// What it does:
//   1. CHAINS defines the full study plan for each major
//   2. Enrollments from DB tell us where the student is
//   3. Recommendations = CHAINS minus completed minus in-progress
//      minus courses not offered this semester
//   4. Chain display = color each node by student's current state
// ============================================================

const CHAINS = {

  // ── CEN chains ───────────────────────────────────────────
  CEN: [
    ['ARL101A','ISL100'],
    ['ECS100','COE101'],
    ['ECS100','EEN210','EEN210L','CEN201','CEN304','CEN324'],
    ['ECS100','EEN210','CEN325','CEN368','CEN451','CEN452'],
    ['ECS100','EEN210','CEN325','CEN425','CEN401L'],
    ['ECS100','EEN210','CEN466'],
    ['MTT102','STT100','MTT202'],
    ['MTT102','MTT200','MTT204','MTT205','CEN320','CEN330'],
    ['MTT102','MTT200','MTT204','MTT205','CEN320','EEN365'],
    ['MTT102','MTT200','MTT204','MTT205','CEN320','CEN464','CEN464L','CEN454'],
    ['MTT102','MTT200','MTT204','MTT205','CSC201','GEN300'],
    ['MTT102','PHY102','PHY102L','PHY201','PHY201L'],
    ['ENG200','FWS205'],
    ['ENG200','COE202'],
    ['ENG200','FWS310'],
    ['CSC201','CSC202','CSC301','CSC305','CSC308','CEN455'],
    ['MTT202','CSC301'],
    ['CSC305','ITE408'],
    ['CSC201','CSC202','CSC202L'],
    ['CSC201','CEN333'],
    ['CSC201','CEN325','CEN368','CEN399i','CEN399ii'],
    ['COE101','AIRE310','AIRE410'],
    ['CEN325','AIRE310','AIRE325'],
    ['AIRE310','AIRE430'],
    ['AIRE310','AIRE475'],
    ['MTT202','CSC201','CSC302'],
    ['CSC201','CSC307'],
    ['CSC202','SWE401'],
    ['CSC305','ITE402'],
    ['CEN425','CEN435'],
    ['CEN425','CEN445'],
    ['CEN201','EEN220'],
    ['CEN320','EEN337'],
  ],

  // ── CSE chains — exact from official study plan ───────────
  // Every edge below comes directly from the prerequisite table.
  // Multi-parent nodes: CSC301(CSC202+MTT202), CSC302(MTT202+SWE201),
  //   PHY102L(MTT102+PHY102), PHY201L(PHY102+PHY201),
  //   CEN325_CSE(SWE201+CSC303), CEN425_CSE(CEN325_CSE+ITE421+CSC305),
  //   CSE310(STT201+MTT202), CSC406(STT201+CSC301),
  //   CSE499A(CSC406+ITE408), CSC408(CSC202+CSC305)
  CSE: [
    // ── Sem 1 roots ──────────────────────────────────────────
    ['ARL101A','ISL100'],
    ['ENG200','FWS205'],
    ['ENG200','FWS305'],
    ['ENG200','FWS310'],
    ['ECT200','CSE210'],
    ['ECT200','CSC303'],            // CSC303 needs ECT200

    // ── MTT102 subtree ───────────────────────────────────────
    ['MTT102','PHY102','PHY201'],   // PHY102→PHY201
    ['MTT102','PHY102L'],           // PHY102L needs MTT102 (+ PHY102 co-req)
    ['PHY102','PHY102L'],           // second parent of PHY102L
    ['PHY102','PHY201L'],           // PHY201L needs PHY102 (+ PHY201 co-req)
    ['PHY201','PHY201L'],           // second parent of PHY201L
    ['MTT102','MTT200','MTT204'],
    ['MTT102','STT100','COE102'],
    ['STT100','MTT202'],
    ['STT100','STT201'],

    // ── SWE201 subtree ───────────────────────────────────────
    ['SWE201','CSC202'],
    ['SWE201','CSC302'],            // CSC302 needs SWE201 (+ MTT202)
    ['MTT202','CSC302'],            // second parent of CSC302
    ['SWE201','CSC307','ITE410'],
    ['SWE201','CSE300'],
    ['SWE201','CEN325_CSE'],        // CEN325_CSE needs SWE201 (+ CSC303)
    ['CSC303','CEN325_CSE'],        // second parent of CEN325_CSE

    // ── CSC202 branches ──────────────────────────────────────
    ['CSC202','CSC301'],            // CSC301 needs CSC202 (+ MTT202)
    ['MTT202','CSC301'],            // second parent of CSC301
    ['CSC202','SWE401','ITE401'],
    ['SWE401','ITE409'],
    ['CSC202','ITE421'],
    ['CSC202','ITE390'],
    ['CSC202','SWE370'],
    ['CSC202','SWE371'],

    // ── CSC301 branches ──────────────────────────────────────
    ['CSC301','CSC305'],            // CSC305 needs CSC301
    ['CSC301','CSC308'],
    ['CSC301','CSC406'],            // CSC406 needs CSC301 (+ STT201)
    ['STT201','CSC406'],            // second parent of CSC406

    // ── CSC305 branches ──────────────────────────────────────
    ['CSC305','ITE408','CSE499A'],  // ITE408→CSE499A
    ['CSC406','CSE499A'],           // second parent of CSE499A
    ['CSE499A','CSE499B'],
    ['CSC305','CSE400'],
    ['CSC305','CSE410'],
    ['CSC305','CSE420'],
    ['CSC305','ITE402_CSE'],
    ['CSC305','ITE422'],
    ['CSC305','CSC408'],            // CSC408 needs CSC305 (+ CSC202)
    ['CSC202','CSC408'],            // second parent of CSC408

    // ── CEN325_CSE branches ──────────────────────────────────
    ['CEN325_CSE','CEN425_CSE'],    // CEN425_CSE needs CEN325_CSE+ITE421+CSC305
    ['ITE421','CEN425_CSE'],        // second parent
    ['CSC305','CEN425_CSE'],        // third parent

    // ── STT201 branches ──────────────────────────────────────
    ['STT201','CSE310'],            // CSE310 needs STT201 (+ MTT202)
    ['MTT202','CSE310'],            // second parent of CSE310
    ['STT201','ITE442'],

    // ── Internships ──────────────────────────────────────────
    ['CSC301','CSE399A'],           // CSE399A after 60cr (approx after CSC301)
    ['CSE399A','CSE399B'],

    // ── CHE ──────────────────────────────────────────────────
    ['CHE205','CHE201L'],

    // ── CSC302 elective ──────────────────────────────────────
    ['CSC302','CIS404'],

    // ── Standalone ───────────────────────────────────────────
    ['ITE414'],
  ],

  // ── SWE chains — official study plan ─────────────────────
  SWE: [
    ['SWE201','CSC202','SWE401_SWE','SWE471','SWE472'],
    ['SWE201','CSC202','SWE401_SWE','SWE471','SWE499A','SWE499B'],
    ['SWE401_SWE','SWE473'],
    ['SWE201','CSC202','SWE370_SWE'],
    ['SWE201','CSC202','SWE371_SWE'],
    ['SWE201','CSC202','ITE421_SWE','SWE499A'],
    ['SWE201','CSC202','ITE390_SWE'],
    ['SWE201','CSC202','CSC301','CSC308'],
    ['MTT202','CSC301'],
    ['CSC301','CSC305','ITE408_SWE'],
    ['CSC305','ITE422_SWE'],
    ['CSC305','CSC408_SWE'],
    ['CSC202','CSC305'],
    ['CSC301','SWE399A','SWE399B'],
    ['SWE201','CSC302_SWE'],
    ['MTT202','CSC302_SWE'],
    ['SWE201','CSC307_SWE'],
    ['STT201','CSC301'],
    ['STT201','CSC406_SWE'],
    ['CSC301','CSC406_SWE'],
    ['MTT202','CSE310_SWE'],
    ['STT201','CSE310_SWE'],
    ['SWE401_SWE','ITE409_SWE'],
    ['ARL101A','ISL100'],
    ['ENG200','FWS205'],
    ['ENG200','MTT102','COE202_SWE'],
    ['ENG200','FWS305','FWS310'],
    ['MTT102','STT100','STT201'],
    ['STT100','COE102'],
    ['STT100','MTT202'],
    ['MTT102','MTT200','MTT204'],
    ['MTT102','PHY102','PHY102L','PHY201','PHY201L'],
    ['CHE205','CHE201L'],
  ],
}


export function predictPass(grade, attendance) {
  const score = (grade ?? 0) * 0.7 + (attendance ?? 0) * 0.3
  return { score: Math.round(score), predicted: score >= 60 }
}

function isSatisfied(code, completedSet, passingSet) {
  return completedSet.has(code) || passingSet.has(code)
}

function buildPrereqMap(prerequisites) {
  const map = {}
  for (const { course_code, requires_code } of prerequisites) {
    if (!map[course_code]) map[course_code] = []
    map[course_code].push(requires_code)
  }
  return map
}

function buildUnlockMap(prerequisites) {
  const map = {}
  for (const { course_code, requires_code } of prerequisites) {
    if (!map[requires_code]) map[requires_code] = []
    map[requires_code].push(course_code)
  }
  return map
}

function countDownstream(code, unlockMap, majorCourseSet, memo = {}) {
  if (memo[code] !== undefined) return memo[code]
  const direct = (unlockMap[code] || []).filter(c => majorCourseSet.has(c))
  let total = direct.length
  for (const next of direct) total += countDownstream(next, unlockMap, majorCourseSet, memo)
  memo[code] = total
  return total
}

function computeBlocked(failingCodes, prereqMap, completedSet, majorCourseSet) {
  const blocked = new Set(failingCodes)
  let changed = true
  while (changed) {
    changed = false
    for (const code of majorCourseSet) {
      if (!blocked.has(code) && !completedSet.has(code)) {
        if ((prereqMap[code] || []).some(p => blocked.has(p))) {
          blocked.add(code); changed = true
        }
      }
    }
  }
  for (const c of completedSet) blocked.delete(c)
  return blocked
}

// ── Main engine ───────────────────────────────────────────────

export function runAdvisoryEngine({
  student,
  enrollments,
  allCourses,
  prerequisites,
  manualOverrides = {},
  currentSemester = 'spring',
  sectionsMap = {},
}) {
  const majorCode      = student.major?.code ?? 'CSE'
  const chains         = CHAINS[majorCode] || []
  const majorCourseSet = new Set(chains.flat())
  const prereqMap      = buildPrereqMap(prerequisites)
  const unlockMap      = buildUnlockMap(prerequisites)
  const unlockMemo     = {}
  const courseMap      = Object.fromEntries(allCourses.map(c => [c.code, c]))

  // ── Classify enrollments ──────────────────────────────────
  const completedSet   = new Set()
  const inProgressList = []
  const passingSet     = new Set()
  const failingCodes   = new Set()

  for (const e of enrollments) {
    if (e.status === 'completed') {
      completedSet.add(e.course_code)
    } else if (e.status === 'in_progress') {
      const prediction = predictPass(e.grade, e.attendance)
      const passFail   = manualOverrides[e.course_code] !== undefined
        ? manualOverrides[e.course_code]
        : prediction.predicted

      if (passFail) passingSet.add(e.course_code)
      else          failingCodes.add(e.course_code)

      inProgressList.push({
        code:           e.course_code,
        name:           e.course?.name ?? e.course_code,
        credits:        e.course?.credits ?? 3,
        semesterOffered:e.course?.semester_offered ?? 'spring',
        instructor:     e.course?.instructor ?? null,
        days:           e.course?.days ?? null,
        timeSlot:       e.course?.time_slot ?? null,
        room:           e.course?.room ?? null,
        grade:          e.grade,
        attendance:     e.attendance,
        prediction,
        passFail,
        manualOverride: manualOverrides[e.course_code] !== undefined,
      })
    }
  }

  const inProgressCodes = new Set(inProgressList.map(c => c.code))
  const blockedSet      = computeBlocked(failingCodes, prereqMap, completedSet, majorCourseSet)
  for (const c of inProgressCodes) blockedSet.delete(c)

  // ── Recommendations ───────────────────────────────────────
  // Take all courses in CHAINS for this major, then remove:
  //   - already completed
  //   - currently in progress
  //   - not offered this semester (wrong semester)
  // Sort: non-blocked first, then by how many courses they unlock

  const recommendations = [...majorCourseSet]
    .map(code => {
      const course = courseMap[code]
      if (!course) return null

      // SEMESTER FILTER — only show if offered this semester
      const offeredThisSemester =
        course.semester_offered === currentSemester ||
        course.semester_offered === 'both'

      if (!offeredThisSemester) return null
      if (completedSet.has(code))   return null
      if (inProgressCodes.has(code)) return null

      const prereqs        = prereqMap[code] || []
      const prereqsMet     = prereqs.every(p => isSatisfied(p, completedSet, passingSet))
      const isBlocked      = blockedSet.has(code)
      const downstream     = countDownstream(code, unlockMap, majorCourseSet, unlockMemo)
      const courseSections = sectionsMap[code] || []

      return {
        code,
        name:            course.name,
        credits:         course.credits,
        type:            course.type,
        semesterOffered: course.semester_offered,
        oncePerYear:     course.once_per_year,
        sections:        courseSections,
        instructor:      courseSections[0]?.instructor ?? course.instructor ?? null,
        days:            courseSections[0]?.days       ?? course.days ?? null,
        timeSlot:        courseSections[0]?.time_slot  ?? course.time_slot ?? null,
        room:            courseSections[0]?.room       ?? course.room ?? null,
        prereqsMet,
        isBlocked,
        downstreamUnlocks: downstream,
        missingPrereqs: prereqs.filter(p => !isSatisfied(p, completedSet, passingSet)),
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Blocked always last
      if (a.isBlocked !== b.isBlocked) return a.isBlocked ? 1 : -1
      // Locked (prereqs not met) before blocked but after available
      if (a.prereqsMet !== b.prereqsMet) return a.prereqsMet ? -1 : 1
      // Among available: more downstream unlocks = higher priority
      return b.downstreamUnlocks - a.downstreamUnlocks
    })

  // ── Chain display states ──────────────────────────────────
  const chainDisplay = chains.map(chain =>
    chain.map(code => {
      let state = 'locked'
      if (completedSet.has(code)) {
        state = 'completed'
      } else if (inProgressCodes.has(code)) {
        const ip = inProgressList.find(x => x.code === code)
        state = ip?.passFail ? 'in_progress' : 'in_progress_at_risk'
      } else if ((prereqMap[code] || []).every(p => isSatisfied(p, completedSet, passingSet))) {
        state = 'available'
      }
      return { code, state }
    })
  )

  // ── Completed list ────────────────────────────────────────
  const completed = enrollments
    .filter(e => e.status === 'completed')
    .map(e => ({
      code:    e.course_code,
      name:    e.course?.name ?? e.course_code,
      credits: e.course?.credits ?? 3,
      term:    e.term,
    }))
    .reverse()

  return {
    student: {
      id:              student.id,
      name:            student.name,
      semester:        student.semester,
      gpa:             student.gpa,
      gpaTrend:        student.gpa_trend,
      earnedCredits:   student.earned_credits,
      requiredCredits: student.major?.required_credits ?? 130,
      major:           student.major?.name ?? '',
      majorCode,
    },
    inProgress:   inProgressList,
    completed,
    recommendations,
    chains:       chainDisplay,
    blockedCodes: [...blockedSet],
  }
}
