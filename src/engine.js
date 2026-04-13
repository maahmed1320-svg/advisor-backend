const PLACEHOLDER_PREFIXES = ['CREDITS_', 'JUNIOR_LEVEL', 'SENIOR_LEVEL']

function isPlaceholder(code) {
  return PLACEHOLDER_PREFIXES.some(p => code.startsWith(p))
}

// ============================================================
// CO-REQUISITES (FIXED FROM STUDY PLANS)
// ============================================================
const COREQS = {
  CEN: [
    ['EEN210',  'EEN210L'],
    ['PHY102',  'PHY102L'],
    ['PHY201',  'PHY201L'],
    ['CSC201',  'CSC202L'],
    ['CSC202',  'CSC202L'],
    ['CEN320',  'CEN464L'],
    ['CEN464',  'CEN464L'],
    ['CEN425',  'CEN401L'],
    ['EEN210L', 'CEN401L'],
  ],

  CSE: [
    ['PHY102',  'PHY102L'],
    ['PHY201',  'PHY201L'],
    ['CHE205',  'CHE201L'],
    ['CSC305',  'ITE408'],
    ['CSC202',  'CSC202L'],
    ['MTT204',  'MTT205'],
    ['MTT200',  'MTT205'],
  ],

  SWE: [
    ['PHY102',  'PHY102L'],
    ['PHY201',  'PHY201L'],
    ['CHE205',  'CHE201L'],
    ['CSC202',  'CSC202L'],
  ],
}

// ============================================================
// CHAINS (FIXED CLEAN VERSION)
// ============================================================
const CHAINS = {

  CEN: [
    ['ARL101A'], ['ISL100'], ['ECS100'], ['MTT102'], ['STT100'], ['ENG200'],
    ['FWS205','ENG200'],

    ['COE101','STT100'],
    ['PHY102','MTT102'], ['PHY102L','MTT102'],
    ['PHY201','PHY102'], ['PHY201L','PHY102'],

    ['MTT200','MTT102'],
    ['CSC201','MTT102'],
    ['EEN210','ECS100'], ['EEN210L','EEN210'],

    ['COE202','ENG200'], ['COE202','MTT102'],
    ['MTT202','STT100'],

    ['CSC202','CSC201'],
    ['CEN333','CSC201'],
    ['CEN201','ECS100'], ['CEN201','PHY201'], ['CEN201','EEN210L'],

    ['MTT204','MTT200'], ['MTT205','MTT200','MTT204'],

    ['AIRE310','CSC201','COE101','MTT200'],

    ['CEN320','MTT205','CEN201'],
    ['CSC301','CSC202','MTT202'],

    ['CSC305','JUNIOR_LEVEL'],

    ['CEN304','CEN201'],
    ['CEN325','CSC201','EEN210'],

    ['CEN368','CEN325','EEN210'],

    ['CEN330','CEN320','STT100'],

    ['CSC308','CSC301'],

    ['CEN324','CEN304'],
    ['CEN425','CEN325'],
    ['CEN401L','CEN425','EEN210L'],

    ['AIRE410','AIRE310'],

    ['CEN399i','CREDITS_90'],
    ['CEN399ii','CEN399i'],

    ['GEN300','MTT205','CSC201'],

    ['FWS310','ENG200','CREDITS_60'],

    ['AIRE475','AIRE310','CEN325'],

    ['CEN455','CSC308','CSC305','CEN325'],

    ['CEN464','CEN320'],
    ['CEN464L','CEN464'],

    ['CEN451','SENIOR_LEVEL'],

    ['EEN365','CEN320','MTT204'],

    ['AIRE325','CEN325','AIRE310'],

    ['CEN466','EEN210'],

    ['CEN452','CEN451'],

    ['CEN454','CEN464','CEN464L'],

    ['AIRE430','AIRE310'],
  ],

  CSE: [
    ['ARL101A'], ['ISL100'], ['ENG200'], ['ECT200'], ['MTT102'], ['STT100'],

    ['CSE210','ECT200'],
    ['FWS205','ENG200'],

    ['PHY102','MTT102'], ['PHY102L','MTT102'],
    ['PHY201','PHY102'], ['PHY201L','PHY102'],

    ['COE102','STT100'],
    ['MTT200','MTT102'],

    ['SWE201','MTT102'],
    ['CSC202','SWE201'],

    ['CSC302','MTT202','SWE201'],

    ['FWS305','ENG200','CREDITS_45'],

    ['CSC301','CSC202','MTT202'],
    ['CSC305','JUNIOR_LEVEL'],

    ['CSC303','ECT200'],

    ['CSE310','STT201','MTT202'],

    ['ITE408','CSC305'],

    ['CSC308','CSC301'],

    ['CSC406','CSC301','STT201'],

    ['CSC307','SWE201'],

    ['ITE421','CSC202'],

    ['CSE399A','CREDITS_60'],
    ['CSE399B','CSE399A'],

    ['CSC408','CSC202','CSC305'],

    ['CSC302','CSC305'],

    ['SWE370','CSC202'],
    ['SWE371','CSC202'],

    ['FWS310','ENG200','CREDITS_60'],
  ],

  SWE: [
    ['ARL101A'], ['ISL100'], ['ENG200'], ['MTT102'], ['STT100'],

    ['PHY102','MTT102'], ['PHY102L','MTT102'],
    ['PHY201','PHY102'], ['PHY201L','PHY102'],

    ['CHE205','ENG200'], ['CHE201L','CHE205'],

    ['MTT200','MTT102'],
    ['COE102','STT100'],

    ['SWE201','MTT102'],
    ['CSC202','SWE201'],
    ['CSC307','SWE201'],

    ['CSC302','MTT202','SWE201'],

    ['CSC301','CSC202','MTT202'],
    ['CSC305','JUNIOR_LEVEL'],

    ['CSC308','CSC301'],

    ['ITE390','CSC202'],
    ['SWE371','CSC202'],
    ['SWE401','CSC202'],
    ['SWE370','CSC202'],

    ['CSC406','CSC301','STT201'],

    ['ITE421','CSC202'],

    ['SWE302','MTT202','SWE401'],
    ['SWE471','SWE401'],

    ['SWE399A','CREDITS_60'],
    ['SWE399B','SWE399A','CREDITS_90'],

    ['ITE408','CSC305'],
    ['ITE409','SWE401'],

    ['SWE472','SWE471'],
    ['CSC408','CSC202','CSC305'],

    ['SWE473','SWE401'],

    ['SWE499A','SWE471','ITE421'],
    ['SWE499B','SWE499A'],

    ['FWS310','ENG200','CREDITS_60'],
  ],
}

// ============================================================
// PREREQ HELPERS (UNCHANGED CORE)
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
        if (p.includes('|')) {
          return !p.split('|').some(c => completedSet.has(c) || passingSet.has(c))
        }
        return blocked.has(p)
      })

      if (hasBroken) {
        blocked.add(code)
        changed = true
      }
    }
  }

  for (const c of completedSet) blocked.delete(c)
  return blocked
}

// ============================================================
// MAIN ENGINE (FIXED)
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

  const majorCourseSet = new Set(
    chains.flat().filter(c => !isPlaceholder(c))
  )

  const coReqEdgeSet = new Set(
    (COREQS[majorCode] || []).map(([a, b]) => `${a}->${b}`)
  )

  const prereqMap = buildPrereqMap(prerequisites)
  const unlockMap = buildUnlockMap(prerequisites)
  const unlockMemo = {}
  const courseMap = Object.fromEntries(allCourses.map(c => [c.code, c]))

  const completedSet = new Set()
  const inProgressList = []
  const passingSet = new Set()
  const failingCodes = new Set()

  for (const e of enrollments) {
    if (e.status === 'completed') {
      completedSet.add(e.course_code)
    } else if (e.status === 'in_progress') {

      const score = (e.grade ?? 0) * 0.7 + (e.attendance ?? 0) * 0.3
      const predicted = score >= 60

      const passFail = manualOverrides[e.course_code] !== undefined
        ? manualOverrides[e.course_code]
        : predicted

      if (passFail) passingSet.add(e.course_code)
      else failingCodes.add(e.course_code)

      inProgressList.push({
        code: e.course_code,
        name: e.course?.name ?? e.course_code,
        credits: e.course?.credits ?? 3,
        semesterOffered: e.course?.semester_offered ?? 'spring',
        grade: e.grade,
        attendance: e.attendance,
        prediction: { score: Math.round(score), predicted },
        passFail,
      })
    }
  }

  const inProgressCodes = new Set(inProgressList.map(c => c.code))
  const blockedSet = computeBlocked(failingCodes, prereqMap, completedSet, majorCourseSet, passingSet)

  for (const c of inProgressCodes) blockedSet.delete(c)

  // FIXED: co-req availability now includes in-progress
  const availableSet = new Set([
    ...completedSet,
    ...passingSet,
    ...inProgressCodes
  ])

  const recommendations = [...majorCourseSet]
    .map(code => {
      const course = courseMap[code]
      if (!course) return null

      if (completedSet.has(code)) return null
      if (inProgressCodes.has(code)) return null

      const prereqs = prereqMap[code] || []

      const isCoReqNode = (COREQS[majorCode] || [])
        .some(pair => pair.includes(code))

      const checkSet = isCoReqNode ? availableSet : completedSet
      const passSet = isCoReqNode ? availableSet : passingSet

      const prereqsMet = prereqs.every(p =>
        isPrereqSatisfied(p, checkSet, passSet)
      )

      const isBlocked = blockedSet.has(code)
      const downstream = countDownstream(code, unlockMap, majorCourseSet, unlockMemo)

      return {
        code,
        name: course.name,
        credits: course.credits,
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

        const isCoReqNode = (COREQS[majorCode] || [])
          .some(pair => pair.includes(code))

        if (isCoReqNode) {
          if (prereqs.every(p =>
            isPrereqSatisfied(p, availableSet, availableSet)
          )) state = 'available'
        } else {
          if (prereqs.every(p =>
            isPrereqSatisfied(p, completedSet, passingSet)
          )) state = 'available'
        }
      }

      return { code, state }
    })
  )

  const completed = enrollments
    .filter(e => e.status === 'completed')
    .map(e => ({
      code: e.course_code,
      name: e.course?.name ?? e.course_code,
      credits: e.course?.credits ?? 3,
      term: e.term
    }))
    .reverse()

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
    coReqEdges: [...coReqEdgeSet],
    blockedCodes: [...blockedSet],
  }
}