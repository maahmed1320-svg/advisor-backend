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

  CEN: [

  // ─────────────────────────────
  // 🎓 YEAR 1 — SEM 1
  // ─────────────────────────────
  ['ARL101A'],
  ['ISL100'],
  ['ECS100'],
  ['MTT102'],
  ['STT100'],

  // ─────────────────────────────
  // 🎓 YEAR 1 — SEM 2
  // ─────────────────────────────
  ['ENG200'],
  ['ENG200','FWS205'],

  ['STT100','COE101'],

  ['MTT102','PHY102'],
  ['MTT102','PHY102L'],
  ['PHY102','PHY102L'],

  ['MTT102','MTT200'],

  // ─────────────────────────────
  // 🎓 YEAR 2 — SEM 3
  // ─────────────────────────────
  ['MTT102','CSC201'],

  ['PHY102','PHY201'],
  ['PHY102','PHY201L'],
  ['PHY201','PHY201L'],

  ['ECS100','EEN210'],
  ['EEN210','EEN210L'], // co-req

  ['ENG200','COE202'],
  ['MTT102','COE202'],

  ['STT100','MTT202'],

  // ─────────────────────────────
  // 🎓 YEAR 2 — SEM 4
  // ─────────────────────────────
  ['CSC201','CSC202'],
  ['CSC201','CEN333'],

  ['ECS100','CEN201'],
  ['PHY201','CEN201'],
  ['EEN210L','CEN201'],

  ['MTT200','MTT204'],
  ['MTT200','MTT205'],
  ['MTT204','MTT205'], // co-req

  ['CSC201','AIRE310'],
  ['COE101','AIRE310'],
  ['MTT200','AIRE310'],

  // ─────────────────────────────
  // 🎓 YEAR 3 — SEM 5
  // ─────────────────────────────
  ['MTT205','CEN320'],
  ['CEN201','CEN320'],

  ['CSC202','CSC301'],
  ['MTT202','CSC301'],

  ['JUNIOR_LEVEL','CSC305'],

  ['CEN201','CEN304'],

  ['CSC201','CEN325'],
  ['EEN210','CEN325'],

  ['EEN210','CEN368'],
  ['CEN325','CEN368'],

  // ─────────────────────────────
  // 🎓 YEAR 3 — SEM 6
  // ─────────────────────────────
  ['CEN320','CEN330'],
  ['STT100','CEN330'],

  ['CSC301','CSC308'],

  ['CEN304','CEN324'],

  ['CEN325','CEN425'],

  ['CEN425','CEN401L'], // co-req
  ['EEN210L','CEN401L'],

  ['CSC201','CSC202L'],
  ['CSC202','CSC202L'],

  ['AIRE310','AIRE410'],

  // ─────────────────────────────
  // ☀️ INTERNSHIP
  // ─────────────────────────────
  ['CREDITS_90','CEN399i'],
  ['CEN399i','CEN399ii'],

  // ─────────────────────────────
  // 🎓 YEAR 4 — SEM 7
  // ─────────────────────────────
  ['MTT205','GEN300'],
  ['CSC201','GEN300'],

  ['ENG200','FWS310'],
  ['CREDITS_60','FWS310'],

  ['AIRE310','AIRE475'],
  ['CEN325','AIRE475'],

  ['CSC308','CEN455'],
  ['CSC305','CEN455'],
  ['CEN325','CEN455'],

  ['CEN320','CEN464'],
  ['CEN464','CEN464L'], // co-req

  ['SENIOR_LEVEL','CEN451'],

  // ─────────────────────────────
  // 🎓 YEAR 4 — SEM 8
  // ─────────────────────────────
  ['CEN320','EEN365'],
  ['MTT204','EEN365'],

  ['CEN325','AIRE325'],
  ['AIRE310','AIRE325'],

  ['EEN210','CEN466'],

  ['CEN451','CEN452'],

  ['CEN464','CEN454'],
  ['CEN464L','CEN454'],

  ['AIRE310','AIRE430'],

],

 CSE: [

  // ─────────────────────────────────────────
  // 🎓 YEAR 1 — SEMESTER 1 (ROOTS)
  // ─────────────────────────────────────────
  ['ARL101A'],
  ['ISL100'],
  ['ENG200'],
  ['ECT200'],
  ['MTT102'],                 // enables SWE201
  ['STT100'],

  // ─────────────────────────────────────────
  // 🎓 YEAR 1 — SEMESTER 2
  // ─────────────────────────────────────────
  ['ECT200','CSE210'],

  ['ENG200','FWS205'],        // (+ FWS100 co-req not modeled)

  ['MTT102','PHY102'],
  ['MTT102','PHY102L'],       // + PHY102 co-req
  ['PHY102','PHY102L'],

  ['MTT102','MTT200'],
  ['STT100','COE102'],

  // ─────────────────────────────────────────
  // 🎓 YEAR 2 — SEMESTER 3
  // ─────────────────────────────────────────
  ['MTT102','SWE201'],        // ✅ FIXED (was wrong before)

  ['STT100','MTT202'],
  ['STT100','STT201'],

  ['PHY102','PHY201'],
  ['PHY102','PHY201L'],       // + PHY201 co-req
  ['PHY201','PHY201L'],

  // ─────────────────────────────────────────
  // 🎓 YEAR 2 — SEMESTER 4
  // ─────────────────────────────────────────
  ['SWE201','CSC202'],

  ['MTT202','CSC302'],
  ['SWE201','CSC302'],

  ['ENG200','FWS305'],
  ['CREDITS_45','FWS305'],    // ✅ FIXED

  ['MTT200','MTT204'],

  ['CHE205','CHE201L'],       // co-req relation simplified

  // ─────────────────────────────────────────
  // ☀️ SUMMER — INTERNSHIP A
  // ─────────────────────────────────────────
  ['CREDITS_60','CSE399A'],   // ✅ FIXED (not CSC301)

  // ─────────────────────────────────────────
  // 🎓 YEAR 3 — SEMESTER 5
  // ─────────────────────────────────────────
  ['CSC202','CSC301'],
  ['MTT202','CSC301'],

  ['ECT200','CSC303'],

  ['STT201','CSE310'],
  ['MTT202','CSE310'],

  ['CSC202','SWE401'],

  // CSC305 → no course prereq (junior level)
  ['JUNIOR_LEVEL','CSC305'],  // ✅ FIXED

  ['CSC305','ITE408'],        // co-req

  // ─────────────────────────────────────────
  // 🎓 YEAR 3 — SEMESTER 6
  // ─────────────────────────────────────────
  ['CSC301','CSC308'],

  ['SWE201','CSE300'],

  ['SWE201','CSC307'],
  ['CSC307','ITE410'],

  ['SWE201','CEN325_CSE'],
  ['CSC303','CEN325_CSE'],

  ['CSC301','CSC406'],
  ['STT201','CSC406'],

  ['CSC202','ITE390'],

  ['CSC202','ITE421'],

  // Internship continuation
  ['CSE399A','CSE399B'],

  // ─────────────────────────────────────────
  // 🎓 YEAR 4 — SEMESTER 7
  // ─────────────────────────────────────────
  ['CSC305','CSE400'],
  ['CSC305','CSE410'],

  ['CEN325_CSE','CEN425_CSE'],
  ['ITE421','CEN425_CSE'],    // OR condition simplified
  ['CSC305','CEN425_CSE'],

  ['CSC406','CSE499A'],
  ['ITE408','CSE499A'],

  ['CSC202','CSC408'],
  ['CSC305','CSC408'],

  ['CSC302','CIS404'],

  // ─────────────────────────────────────────
  // 🎓 YEAR 4 — SEMESTER 8
  // ─────────────────────────────────────────
  ['CSC305','CSE420'],

  ['CSE499A','CSE499B'],

  ['ENG200','FWS310'],
  ['CREDITS_60','FWS310'],    // ✅ FIXED

  // ─────────────────────────────────────────
  // 📦 STANDALONE / NO PREREQ COURSES
  // ─────────────────────────────────────────
  ['ITE414'],

],
 SWE: [

  // ─────────────────────────────
  // 🎓 YEAR 1 — SEM 1
  // ─────────────────────────────
  ['ENG200'],
  ['ARL101A'],
  ['MTT102'],
  ['STT100'],
  ['ISL100'],

  // ─────────────────────────────
  // 🎓 YEAR 1 — SEM 2
  // ─────────────────────────────
  ['MTT102','PHY102'],
  ['MTT102','PHY102L'],
  ['PHY102','PHY102L'],

  ['ENG200','CHE205'],
  ['CHE205','CHE201L'],

  ['MTT102','MTT200'],
  ['STT100','COE102'],

  // ─────────────────────────────
  // 🎓 YEAR 2 — SEM 3
  // ─────────────────────────────
  ['MTT102','SWE201'],   // ✅ fixed

  ['ENG200','FWS205'],

  ['PHY102','PHY201'],
  ['PHY102','PHY201L'],
  ['PHY201','PHY201L'],

  ['STT100','MTT202'],
  ['STT100','STT201'],

  // ─────────────────────────────
  // 🎓 YEAR 2 — SEM 4
  // ─────────────────────────────
  ['SWE201','CSC202'],

  ['SWE201','CSC307_SWE'],

  ['MTT202','CSC302_SWE'],
  ['SWE201','CSC302_SWE'],

  ['ENG200','FWS305'],
  ['CREDITS_45','FWS305'],

  ['MTT200','MTT204'],

  ['ENG200','COE202_SWE'],
  ['MTT102','COE202_SWE'],

  // ─────────────────────────────
  // ☀️ INTERNSHIP A
  // ─────────────────────────────
  ['CREDITS_60','SWE399A'],

  // ─────────────────────────────
  // 🎓 YEAR 3 — SEM 5
  // ─────────────────────────────
  ['CSC202','CSC301'],
  ['MTT202','CSC301'],

  ['JUNIOR_LEVEL','CSC305'],

  ['CSC202','ITE390_SWE'],
  ['CSC202','SWE371_SWE'],
  ['CSC202','SWE401_SWE'],
  ['CSC202','SWE370_SWE'],

  // ─────────────────────────────
  // 🎓 YEAR 3 — SEM 6
  // ─────────────────────────────
  ['CSC301','CSC308'],

  ['STT201','CSC406_SWE'],
  ['CSC301','CSC406_SWE'],

  ['CSC307_SWE','ITE410'],

  ['CSC202','ITE421_SWE'],

  ['MTT202','SWE302'],
  ['SWE401_SWE','SWE302'],

  ['SWE401_SWE','SWE471'],

  // ─────────────────────────────
  // ☀️ INTERNSHIP B
  // ─────────────────────────────
  ['SWE399A','SWE399B'],
  ['CREDITS_90','SWE399B'],

  // ─────────────────────────────
  // 🎓 YEAR 4 — SEM 7
  // ─────────────────────────────
  ['CSC305','ITE408_SWE'],

  ['SWE401_SWE','ITE409_SWE'], // OR with CSC401

  ['SWE471','SWE472'],

  ['CSC305','CSE410_SWE'],

  ['JUNIOR_LEVEL','ITE414'],

  ['SWE471','SWE499A'],
  ['ITE421_SWE','SWE499A'],
  ['CREDITS_90','SWE499A'],

  // ─────────────────────────────
  // 🎓 YEAR 4 — SEM 8
  // ─────────────────────────────
  ['CSC202','CSC408_SWE'],
  ['CSC305','CSC408_SWE'],

  ['SWE401_SWE','SWE473'],

  ['ENG200','FWS310'],
  ['CREDITS_60','FWS310'],

  ['ITE421_SWE','ITE423'],

  ['ITE414','ITE415'],

  ['SWE499A','SWE499B'],

],
}

// ============================================================
// 🔥 PREREQUISITE LOGIC (UPDATED WITH OR SUPPORT)
// ============================================================

function isSatisfied(code, completedSet, passingSet) {
  return completedSet.has(code) || passingSet.has(code)
}

// NEW: supports OR groups like "ENG200|FWS205"
function isPrereqSatisfied(prereq, completedSet, passingSet) {
  if (typeof prereq === 'string' && prereq.includes('|')) {
    return prereq
      .split('|')
      .some(code => isSatisfied(code, completedSet, passingSet))
  }

  return isSatisfied(prereq, completedSet, passingSet)
}


// ============================================================
// BUILD MAPS
// ============================================================

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


// ============================================================
// DOWNSTREAM SCORING
// ============================================================

function countDownstream(code, unlockMap, majorCourseSet, memo = {}) {
  if (memo[code] !== undefined) return memo[code]

  const direct = (unlockMap[code] || []).filter(c => majorCourseSet.has(c))

  let total = direct.length
  for (const next of direct) {
    total += countDownstream(next, unlockMap, majorCourseSet, memo)
  }

  memo[code] = total
  return total
}


// ============================================================
// BLOCKING LOGIC
// ============================================================

function computeBlocked(failingCodes, prereqMap, completedSet, majorCourseSet, passingSet) {
  const blocked = new Set(failingCodes)
  let changed = true

  while (changed) {
    changed = false

    for (const code of majorCourseSet) {
      if (blocked.has(code) || completedSet.has(code)) continue

      const prereqs = prereqMap[code] || []

      const hasBrokenPrereq = prereqs.some(p => {
        // OR SUPPORT
        if (p.includes('|')) {
          return !p.split('|').some(c =>
            completedSet.has(c) || passingSet.has(c)
          )
        }

        return blocked.has(p)
      })

      if (hasBrokenPrereq) {
        blocked.add(code)
        changed = true
      }
    }
  }

  for (const c of completedSet) blocked.delete(c)
  return blocked
}


// ============================================================
// MAIN ENGINE
// ============================================================

export function runAdvisoryEngine({
  student,
  enrollments,
  allCourses,
  prerequisites,
  manualOverrides = {},
  currentSemester = 'spring',
  sectionsMap = {},
}) {
  const majorCode = student.major?.code ?? 'CSE'

  const chains = CHAINS[majorCode] || []
  const majorCourseSet = new Set(chains.flat())

  const prereqMap = buildPrereqMap(prerequisites)
  const unlockMap = buildUnlockMap(prerequisites)
  const unlockMemo = {}

  const courseMap = Object.fromEntries(allCourses.map(c => [c.code, c]))

  // ─────────────────────────────────────────────
  // CLASSIFY ENROLLMENTS
  // ─────────────────────────────────────────────

  const completedSet = new Set()
  const inProgressList = []
  const passingSet = new Set()
  const failingCodes = new Set()

  for (const e of enrollments) {
    if (e.status === 'completed') {
      completedSet.add(e.course_code)

    } else if (e.status === 'in_progress') {

      const prediction = predictPass(e.grade, e.attendance)

      const passFail =
        manualOverrides[e.course_code] !== undefined
          ? manualOverrides[e.course_code]
          : prediction.predicted

      if (passFail) passingSet.add(e.course_code)
      else failingCodes.add(e.course_code)

      inProgressList.push({
        code: e.course_code,
        name: e.course?.name ?? e.course_code,
        credits: e.course?.credits ?? 3,
        semesterOffered: e.course?.semester_offered ?? 'spring',
        instructor: e.course?.instructor ?? null,
        days: e.course?.days ?? null,
        timeSlot: e.course?.time_slot ?? null,
        room: e.course?.room ?? null,
        grade: e.grade,
        attendance: e.attendance,
        prediction,
        passFail,
        manualOverride: manualOverrides[e.course_code] !== undefined,
      })
    }
  }

  const inProgressCodes = new Set(inProgressList.map(c => c.code))

  const blockedSet = computeBlocked(
    failingCodes,
    prereqMap,
    completedSet,
    majorCourseSet,
    passingSet
  )

  for (const c of inProgressCodes) blockedSet.delete(c)


  // ─────────────────────────────────────────────
  // RECOMMENDATIONS
  // ─────────────────────────────────────────────

  const recommendations = [...majorCourseSet]
    .map(code => {
      const course = courseMap[code]
      if (!course) return null

      const offeredThisSemester =
        course.semester_offered === currentSemester ||
        course.semester_offered === 'both'

      if (!offeredThisSemester) return null
      if (completedSet.has(code)) return null
      if (inProgressCodes.has(code)) return null

      const prereqs = prereqMap[code] || []

      // 🔥 OR-AWARE PREREQ CHECK
      const prereqsMet = prereqs.every(p =>
        isPrereqSatisfied(p, completedSet, passingSet)
      )

      const isBlocked = blockedSet.has(code)

      const downstream = countDownstream(
        code,
        unlockMap,
        majorCourseSet,
        unlockMemo
      )

      const courseSections = sectionsMap[code] || []

      return {
        code,
        name: course.name,
        credits: course.credits,
        type: course.type,
        semesterOffered: course.semester_offered,
        oncePerYear: course.once_per_year,
        sections: courseSections,
        instructor: courseSections[0]?.instructor ?? course.instructor ?? null,
        days: courseSections[0]?.days ?? course.days ?? null,
        timeSlot: courseSections[0]?.time_slot ?? course.time_slot ?? null,
        room: courseSections[0]?.room ?? course.room ?? null,
        prereqsMet,
        isBlocked,
        downstreamUnlocks: downstream,
        missingPrereqs: prereqs.filter(p =>
          !isPrereqSatisfied(p, completedSet, passingSet)
        ),
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.isBlocked !== b.isBlocked) return a.isBlocked ? 1 : -1
      if (a.prereqsMet !== b.prereqsMet) return a.prereqsMet ? -1 : 1
      return b.downstreamUnlocks - a.downstreamUnlocks
    })


  // ─────────────────────────────────────────────
  // CHAIN DISPLAY
  // ─────────────────────────────────────────────

  const chainDisplay = chains.map(chain =>
    chain.map(code => {
      let state = 'locked'

      if (completedSet.has(code)) {
        state = 'completed'

      } else if (inProgressCodes.has(code)) {
        const ip = inProgressList.find(x => x.code === code)
        state = ip?.passFail ? 'in_progress' : 'in_progress_at_risk'

      } else {
        const prereqs = prereqMap[code] || []

        const available = prereqs.every(p =>
          isPrereqSatisfied(p, completedSet, passingSet)
        )

        if (available) state = 'available'
      }

      return { code, state }
    })
  )


  // ─────────────────────────────────────────────
  // COMPLETED LIST
  // ─────────────────────────────────────────────

  const completed = enrollments
    .filter(e => e.status === 'completed')
    .map(e => ({
      code: e.course_code,
      name: e.course?.name ?? e.course_code,
      credits: e.course?.credits ?? 3,
      term: e.term,
    }))
    .reverse()


  // ─────────────────────────────────────────────
  // OUTPUT
  // ─────────────────────────────────────────────

  return {
    student: {
      id: student.id,
      name: student.name,
      semester: student.semester,
      gpa: student.gpa,
      gpaTrend: student.gpa_trend,
      earnedCredits: student.earned_credits,
      requiredCredits: student.major?.required_credits ?? 130,
      major: student.major?.name ?? '',
      majorCode,
    },
    inProgress: inProgressList,
    completed,
    recommendations,
    chains: chainDisplay,
    blockedCodes: [...blockedSet],
  }
}