const PLACEHOLDER_PREFIXES = ['CREDITS_', 'JUNIOR_LEVEL', 'SENIOR_LEVEL']
function isPlaceholder(code) {
  return PLACEHOLDER_PREFIXES.some(p => code.startsWith(p))
}

// ============================================================
// CO-REQUISITES — explicit pairs per major
// These are displayed with indigo dashed arrows in the graph
// ============================================================
const COREQS = {
  CEN: [
    ['EEN210',  'EEN210L'],
    ['PHY102',  'PHY102L'],
    ['PHY201',  'PHY201L'],
    ['MTT204',  'MTT205'],
    ['CEN464',  'CEN464L'],
    ['CEN425',  'CEN401L'],
    ['CSC202',  'CSC202L'],
  ],
  CSE: [
    ['PHY102',  'PHY102L'],
    ['PHY201',  'PHY201L'],
    ['CHE205',  'CHE201L'],
    ['CSC305',  'ITE408'],
  ],
  SWE: [
    ['PHY102',  'PHY102L'],
    ['PHY201',  'PHY201L'],
    ['CHE205',  'CHE201L'],
  ],
}

// ============================================================
// CHAINS — study plan paths (no * markers needed anymore)
// ============================================================
const CHAINS = {

  CEN: [
  ['ARL101A'],
  ['ISL100'],
  ['ECS100'],
  ['MTT102'],
  ['STT100'],
  ['ENG200'],
  ['ENG200','FWS205'],
  ['STT100','COE101'],
  ['MTT102','PHY102'],
  ['MTT102','PHY102L'],
  ['PHY102','PHY102L'],
  ['MTT102','MTT200'],
  ['MTT102','CSC201'],
  ['PHY102','PHY201'],
  ['PHY102','PHY201L'],
  ['PHY201','PHY201L'],
  ['ECS100','EEN210'],
  ['EEN210','EEN210L'],
  ['ENG200','COE202'],
  ['MTT102','COE202'],
  ['STT100','MTT202'],
  ['CSC201','CSC202'],
  ['CSC201','CEN333'],
  ['ECS100','CEN201'],
  ['PHY201','CEN201'],
  ['EEN210L','CEN201'],
  ['MTT200','MTT204'],
  ['MTT200','MTT205'],
  ['MTT204','MTT205'],
  ['CSC201','AIRE310'],
  ['COE101','AIRE310'],
  ['MTT200','AIRE310'],
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
  ['CEN320','CEN330'],
  ['STT100','CEN330'],
  ['CSC301','CSC308'],
  ['CEN304','CEN324'],
  ['CEN325','CEN425'],
  ['CEN425','CEN401L'],
  ['EEN210L','CEN401L'],
  ['CSC201','CSC202L'],
  ['CSC202','CSC202L'],
  ['AIRE310','AIRE410'],
  ['CREDITS_90','CEN399i'],
  ['CEN399i','CEN399ii'],
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
  ['CEN464','CEN464L'],
  ['SENIOR_LEVEL','CEN451'],
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
  ['ARL101A'],
  ['ISL100'],
  ['ENG200'],
  ['ECT200'],
  ['MTT102'],
  ['STT100'],
  ['ECT200','CSE210'],
  ['ENG200','FWS205'],
  ['MTT102','PHY102'],
  ['MTT102','PHY102L'],
  ['PHY102','PHY102L'],
  ['MTT102','MTT200'],
  ['STT100','COE102'],
  ['MTT102','SWE201'],
  ['STT100','MTT202'],
  ['STT100','STT201'],
  ['PHY102','PHY201'],
  ['PHY102','PHY201L'],
  ['PHY201','PHY201L'],
  ['SWE201','CSC202'],
  ['MTT202','CSC302'],
  ['SWE201','CSC302'],
  ['ENG200','FWS305'],
  ['CREDITS_45','FWS305'],
  ['MTT200','MTT204'],
  ['CHE205','CHE201L'],
  ['CREDITS_60','CSE399A'],
  ['CSC202','CSC301'],
  ['MTT202','CSC301'],
  ['ECT200','CSC303'],
  ['STT201','CSE310'],
  ['MTT202','CSE310'],
  ['CSC202','SWE401'],
  ['JUNIOR_LEVEL','CSC305'],
  ['CSC305','ITE408'],
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
  ['CSE399A','CSE399B'],
  ['CSC305','CSE400'],
  ['CSC305','CSE410'],
  ['CEN325_CSE','CEN425_CSE'],
  ['ITE421','CEN425_CSE'],
  ['CSC305','CEN425_CSE'],
  ['CSC406','CSE499A'],
  ['ITE408','CSE499A'],
  ['CSC202','CSC408'],
  ['CSC305','CSC408'],
  ['CSC302','CIS404'],
  ['CSC305','CSE420'],
  ['CSE499A','CSE499B'],
  ['ENG200','FWS310'],
  ['CREDITS_60','FWS310'],
  ['ITE414'],
  ['STT201','ITE442'],
  ['CSC202','SWE370'],
  ['CSC202','SWE371'],
  ],

  SWE: [
  ['ENG200'],
  ['ARL101A'],
  ['MTT102'],
  ['STT100'],
  ['ISL100'],
  ['MTT102','PHY102'],
  ['MTT102','PHY102L'],
  ['PHY102','PHY102L'],
  ['ENG200','CHE205'],
  ['CHE205','CHE201L'],
  ['MTT102','MTT200'],
  ['STT100','COE102'],
  ['MTT102','SWE201'],
  ['ENG200','FWS205'],
  ['PHY102','PHY201'],
  ['PHY102','PHY201L'],
  ['PHY201','PHY201L'],
  ['STT100','MTT202'],
  ['STT100','STT201'],
  ['SWE201','CSC202'],
  ['SWE201','CSC307_SWE'],
  ['MTT202','CSC302_SWE'],
  ['SWE201','CSC302_SWE'],
  ['ENG200','FWS305'],
  ['CREDITS_45','FWS305'],
  ['MTT200','MTT204'],
  ['ENG200','COE202_SWE'],
  ['MTT102','COE202_SWE'],
  ['CREDITS_60','SWE399A'],
  ['CSC202','CSC301'],
  ['MTT202','CSC301'],
  ['JUNIOR_LEVEL','CSC305'],
  ['CSC202','ITE390_SWE'],
  ['CSC202','SWE371_SWE'],
  ['CSC202','SWE401_SWE'],
  ['CSC202','SWE370_SWE'],
  ['CSC301','CSC308'],
  ['STT201','CSC406_SWE'],
  ['CSC301','CSC406_SWE'],
  ['CSC307_SWE','ITE410'],
  ['CSC202','ITE421_SWE'],
  ['MTT202','SWE302'],
  ['SWE401_SWE','SWE302'],
  ['SWE401_SWE','SWE471'],
  ['SWE399A','SWE399B'],
  ['CREDITS_90','SWE399B'],
  ['CSC305','ITE408_SWE'],
  ['SWE401_SWE','ITE409_SWE'],
  ['SWE471','SWE472'],
  ['CSC305','CSE410_SWE'],
  ['JUNIOR_LEVEL','ITE414'],
  ['SWE471','SWE499A'],
  ['ITE421_SWE','SWE499A'],
  ['CREDITS_90','SWE499A'],
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
// PREREQ LOGIC
// ============================================================
function isSatisfied(code, completedSet, passingSet) {
  return completedSet.has(code) || passingSet.has(code)
}

function isPrereqSatisfied(prereq, completedSet, passingSet) {
  if (typeof prereq === 'string' && prereq.includes('|')) {
    return prereq.split('|').some(c => isSatisfied(c, completedSet, passingSet))
  }
  return isSatisfied(prereq, completedSet, passingSet)
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

function computeBlocked(failingCodes, prereqMap, completedSet, majorCourseSet, passingSet) {
  const blocked = new Set(failingCodes)
  let changed = true
  while (changed) {
    changed = false
    for (const code of majorCourseSet) {
      if (blocked.has(code) || completedSet.has(code)) continue
      const prereqs = prereqMap[code] || []
      const hasBroken = prereqs.some(p => {
        if (p.includes('|')) return !p.split('|').some(c => completedSet.has(c) || passingSet.has(c))
        return blocked.has(p)
      })
      if (hasBroken) { blocked.add(code); changed = true }
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
  const chains    = CHAINS[majorCode] || []

  // Real courses only — no placeholders
  const majorCourseSet = new Set(
    chains.flat().filter(c => !isPlaceholder(c))
  )

  // Build co-req edge set for this major — "parent->child"
  const coReqEdgeSet = new Set(
    (COREQS[majorCode] || []).map(([a, b]) => `${a}->${b}`)
  )

  const prereqMap  = buildPrereqMap(prerequisites)
  const unlockMap  = buildUnlockMap(prerequisites)
  const unlockMemo = {}
  const courseMap  = Object.fromEntries(allCourses.map(c => [c.code, c]))

  // ── Classify enrollments ──────────────────────────────────
  const completedSet   = new Set()
  const inProgressList = []
  const passingSet     = new Set()
  const failingCodes   = new Set()

  for (const e of enrollments) {
    if (e.status === 'completed') {
      completedSet.add(e.course_code)
    } else if (e.status === 'in_progress') {
      const score    = (e.grade ?? 0) * 0.7 + (e.attendance ?? 0) * 0.3
      const prediction = { score: Math.round(score), predicted: score >= 60 }
      const passFail = manualOverrides[e.course_code] !== undefined
        ? manualOverrides[e.course_code]
        : prediction.predicted

      if (passFail) passingSet.add(e.course_code)
      else          failingCodes.add(e.course_code)

      inProgressList.push({
        code: e.course_code, name: e.course?.name ?? e.course_code,
        credits: e.course?.credits ?? 3,
        semesterOffered: e.course?.semester_offered ?? 'spring',
        grade: e.grade, attendance: e.attendance,
        prediction, passFail,
        manualOverride: manualOverrides[e.course_code] !== undefined,
      })
    }
  }

  const inProgressCodes = new Set(inProgressList.map(c => c.code))
  const blockedSet = computeBlocked(failingCodes, prereqMap, completedSet, majorCourseSet, passingSet)
  for (const c of inProgressCodes) blockedSet.delete(c)

  // ── Build availableSet (completed + passing + available this sem) ──
  // Used so co-req children unlock when their parent is available
  const availableSet = new Set([...completedSet, ...passingSet])
  for (const code of majorCourseSet) {
    if (completedSet.has(code) || inProgressCodes.has(code)) continue
    const prereqs = prereqMap[code] || []
    if (prereqs.every(p => isPrereqSatisfied(p, completedSet, passingSet))) {
      availableSet.add(code)
    }
  }

  // ── Recommendations ───────────────────────────────────────
  const recommendations = [...majorCourseSet]
    .map(code => {
      const course = courseMap[code]
      if (!course) return null
      const offered = course.semester_offered === currentSemester || course.semester_offered === 'both'
      if (!offered) return null
      if (completedSet.has(code)) return null
      if (inProgressCodes.has(code)) return null

      const prereqs    = prereqMap[code] || []
      // Co-req nodes: count as met if parent course is available this semester
      const isCoReqNode = (COREQS[majorCode] || []).some(([,child]) => child === code)
      const checkSet    = isCoReqNode ? availableSet : completedSet
      const passSet     = isCoReqNode ? availableSet : passingSet
      const prereqsMet  = prereqs.every(p => isPrereqSatisfied(p, checkSet, passSet))
      const isBlocked  = blockedSet.has(code)
      const downstream = countDownstream(code, unlockMap, majorCourseSet, unlockMemo)
      const sections   = sectionsMap[code] || []

      return {
        code, name: course.name, credits: course.credits,
        type: course.type, semesterOffered: course.semester_offered,
        oncePerYear: course.once_per_year, sections,
        instructor: sections[0]?.instructor ?? course.instructor ?? null,
        days: sections[0]?.days ?? course.days ?? null,
        timeSlot: sections[0]?.time_slot ?? course.time_slot ?? null,
        room: sections[0]?.room ?? course.room ?? null,
        prereqsMet, isBlocked, downstreamUnlocks: downstream,
        missingPrereqs: prereqs.filter(p => !isPrereqSatisfied(p, completedSet, passingSet)),
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.isBlocked !== b.isBlocked) return a.isBlocked ? 1 : -1
      if (a.prereqsMet !== b.prereqsMet) return a.prereqsMet ? -1 : 1
      return b.downstreamUnlocks - a.downstreamUnlocks
    })

  // ── Chain display ─────────────────────────────────────────
  const chainDisplay = chains.map(chain =>
    chain.map(code => {
      let state = 'locked'
      if (isPlaceholder(code)) {
        state = 'placeholder'
      } else if (completedSet.has(code)) {
        state = 'completed'
      } else if (inProgressCodes.has(code)) {
        const ip = inProgressList.find(x => x.code === code)
        state = ip?.passFail ? 'in_progress' : 'in_progress_at_risk'
      } else {
        const prereqs = prereqMap[code] || []
        // For co-req nodes: satisfied if all prereqs are available (not just completed/passing)
        const isCoReqNode = (COREQS[majorCode] || []).some(([,child]) => child === code)
        if (isCoReqNode) {
          if (prereqs.every(p => isPrereqSatisfied(p, availableSet, availableSet))) state = 'available'
        } else {
          if (prereqs.every(p => isPrereqSatisfied(p, completedSet, passingSet))) state = 'available'
        }
      }
      return { code, state }
    })
  )

  // ── Completed list ────────────────────────────────────────
  const completed = enrollments
    .filter(e => e.status === 'completed')
    .map(e => ({ code: e.course_code, name: e.course?.name ?? e.course_code, credits: e.course?.credits ?? 3, term: e.term }))
    .reverse()

  return {
    student: {
      id: student.id, name: student.name, semester: student.semester,
      gpa: student.gpa, gpaTrend: student.gpa_trend,
      earnedCredits: student.earned_credits,
      requiredCredits: student.major?.required_credits ?? 130,
      major: student.major?.name ?? '', majorCode,
    },
    inProgress: inProgressList, completed, recommendations,
    chains: chainDisplay,
    coReqEdges: [...coReqEdgeSet],  // pass to frontend
    blockedCodes: [...blockedSet],
  }
}