// ── Co-requisite pairs ────────────────────────────────────────
// [A, B] A and B CAN be taken together.
// B can be taken with A, or took A alone then can take B.
const COREQS = [
  ['PHY102',  'PHY102L'],
  ['PHY201',  'PHY201L'],
  ['CHE205',  'CHE201L'],
  ['CHE205',  'CME210'],
  ['CHE206',  'CHE206L'],
  ['MTT204',  'MTT205'],

  ['CME331',  'CME305'],
  ['CME301',  'CME320'],
  ['CME331',  'CME321'],

  ['CME400',  'CME430'],
  ['CME400',  'CME450'],
  ['CME400',  'CME455'],
]

//   ['COURSE']        → standalone course (no prerequisite edge)
//   ['A', 'B']        → A is prerequisite for B
const chains = {
  CME2022: [
    ['ARL101(A)'],
    ['ENG200'],
    ['CME200'],
    ['STT100'],
    ['MTT102'],
    ['FWS100'],

    ['STT100', 'COE102'],
    ['FWS100', 'FWS211'],
    ['MTT102', 'PHY102'],
    ['MTT102', 'PHY102L'],
    ['PHY102', 'PHY102L'],
    ['MTT102', 'MTT200'],
    ['CHE205'],
    ['CHE205', 'CHE201L'],
    ['CME200', 'CME210'],
    ['CHE205', 'CME210'],

    ['MTT102', 'CSC201'],
    ['MTT200', 'MTT201'],
    ['PHY102', 'PHY201'],
    ['PHY102', 'PHY201L'],
    ['PHY201', 'PHY201L'],
    ['STT100', 'COE101'],
    ['CME210', 'CME212'],
    ['ISL100(A)'],

    ['CHE205', 'MEC300'],
    ['CME210', 'CME220'],
    ['CHE205', 'CHE206'],
    ['CHE205', 'CHE206L'],
    ['CHE206', 'CHE206L'],
    ['MTT200', 'MTT204'],
    ['MTT200', 'MTT205'],
    ['MTT204', 'MTT205'],

    ['CREDITS_60', 'CME398'],

    ['CHE206', 'CHE305'],
    ['CME220', 'CME300'],
    ['MTT205', 'CME300'],
    ['CME220', 'CHE330'],
    ['CHE206', 'CHE330'],
    ['CME212', 'CME341'],
    ['ENG200', 'FWS305'],
    ['CREDITS_45', 'FWS305'],
    ['ENG200', 'COE202'],
    ['MTT102', 'COE202'],

    ['CME300', 'CME301'],
    ['CME341', 'CME301'],
    ['CHE330', 'CME331'],
    ['MTT205', 'CME331'],
    ['CME341', 'CME331'],
    ['CME210', 'CME305'],
    ['CME212', 'CME305'],
    ['CME331', 'CME305'],
    ['CME212', 'CME320'],
    ['CME341', 'CME320'],
    ['CME301', 'CME320'],
    ['CME331', 'CME321'],
    ['ENG200', 'FWS310'],
    ['CREDITS_60', 'FWS310'],

    ['CREDITS_60', 'CME399'],

    ['CME301', 'CME400'],
    ['CME305', 'CME400'],
    ['CME321', 'CME430'],
    ['CME331', 'CME430'],
    ['CME331', 'CME450'],
    ['CME300', 'CME455'],
    ['CME331', 'CME455'],
    ['MEI'],
    ['CME321', 'CME498'],
    ['CME331', 'CME498'],
    ['CME305', 'CME498'],
    ['CME301', 'CME498'],
    ['ENG200', 'FWS205'],

    ['CME498', 'CME499'],
    ['OEI'],
    ['OEII'],
    ['MEII'],
    ['MEIII'],
  ],

  ME_Electives: [
    ['CME301', 'CME460'],
    ['CHE305', 'CME461'],
    ['CME341', 'CME461'],
    ['CME331', 'CME461'],
    ['CHE305', 'CME462'],
    ['CME331', 'CME462'],
    ['CHE330', 'CME463'],
    ['CME301', 'CME464'],
    ['CME341', 'CME465'],
    ['MEC300', 'CME465'],
    ['CHE305', 'CME470'],
    ['CHE330', 'CME470'],
    ['CHE305', 'CME471'],
    ['CHE330', 'CME471'],
    ['CME470', 'CME472'],
    ['CME471', 'CME473'],
    ['CME301', 'CME480'],
    ['CHE330', 'CME480'],
    ['CME341', 'CME481'],
    ['CME300', 'CME481'],
    ['CME480', 'CME482'],
    ['CME301', 'CME483'],
    ['CME301', 'CME484'],
    ['CHE330', 'CME490'],
    ['CME490', 'CME491'],
    ['CME490', 'CME492'],
    ['CME490', 'CME493'],
    ['CME331', 'CME493'],
  ],
}

const Course_Year_Map = {
  FWS100:11, ARL101: 11, ENG200: 11, CME200: 11, STT100: 11, MTT102: 11,
  COE102: 12, FWS211:12, PHY102: 12, PHY102L: 12, MTT200: 12, CHE205: 12, CHE201L: 12, CME210: 12,
  MTT201: 21, CSC201: 21, PHY201: 21, ISL100: 21, PHY201L: 21, COE101: 21, CME212: 21,
  MTT204: 22, MTT205: 22, MEC300: 22, CHE206: 22, CHE206L: 22, CME220: 22,
  CME398: 222,
  CHE305: 31, CME300: 31, CHE330: 31, CME341: 31, FWS305: 31, COE202: 31,
  CME301: 32, CME331: 32, CME305: 32, CME320: 32, CME321: 32, FWS310: 32,
  CME399: 322,
  CME400: 41, CME430: 41, CME450: 41, CME455: 41, MEI: 41, CME498: 41, FWS205: 41,
  CME499: 42, MEII: 42, MEIII: 42, OEI: 42, OEII: 42,
}

// ── Placeholder guard ─────────────────────────────────────────
function isPlaceholder(code) {
  return (
    code.startsWith('CREDITS_') ||
    code.endsWith('_LEVEL')     ||
    /^(ME|OE)[IVX\d]*$/.test(code)
  )
}

// ── Extract structural credit hour constraints ────────────────
function buildCreditRequirementsMap(chainKey) {
  const map = {}
  for (const entry of chains[chainKey] || []) {
    if (entry.length < 2) continue
    const [prereq, course] = entry
    if (prereq.startsWith('CREDITS_')) {
      const parsedCredits = parseInt(prereq.replace('CREDITS_', ''), 10)
      if (!isNaN(parsedCredits)) {
        map[course] = parsedCredits
      }
    }
  }
  return map
}

// ── Build prereq map: code → [required codes] ─────────────────
function buildPrereqMap(chainKey) {
  const map = {}
  for (const entry of chains[chainKey] || []) {
    if (entry.length < 2) continue
    const [prereq, course] = entry
    if (isPlaceholder(prereq)) continue
    if (!map[course]) map[course] = []
    if (!map[course].includes(prereq)) map[course].push(prereq)
  }
  return map
}

// ── Build combined unlock map across multiple chain keys ──────
function buildCombinedUnlockMap(...chainKeys) {
  const map = {}
  for (const key of chainKeys) {
    for (const entry of chains[key] || []) {
      if (entry.length < 2) continue
      const [prereq, course] = entry
      if (isPlaceholder(prereq)) continue
      if (!map[prereq]) map[prereq] = []
      if (!map[prereq].includes(course)) map[prereq].push(course)
    }
  }
  return map
}

// ── Count downstream courses recursively (memoised) ──────────
function countDownstream(code, unlockMap, courseSet, memo = {}) {
  if (memo[code] !== undefined) return memo[code]
  const unlocks = (unlockMap[code] || []).filter(c => courseSet.has(c))
  let count = unlocks.length
  for (const c of unlocks) count += countDownstream(c, unlockMap, courseSet, memo)
  memo[code] = count
  return count
}

// ── Prereq satisfaction check ─────────────────────────────────
function isPrereqSatisfied(prereq, completedSet, passingSet) {
  if (prereq.includes('|')) {
    return prereq.split('|').some(c => completedSet.has(c) || passingSet.has(c))
  }
  return completedSet.has(prereq) || passingSet.has(prereq)
}

// ── Reachability check ────────────────────────────────────────
function isReachable(code, completedSet, inProgressSet, blockedSet) {
  return completedSet.has(code) || inProgressSet.has(code) || !blockedSet.has(code)
}

// ── Compute blocked set incorporating Credit Threshold Rules ──
function computeBlocked(failingCodes, prereqMap, prereqMapMajor, completedSet, combinedSet, passingSet, creditRequirementsMap, totalEarnedCredits) { 
  const mergedPrereqMap = { ...prereqMap }
  for (const [course, prereqs] of Object.entries(prereqMapMajor)) {
    if (!mergedPrereqMap[course]) mergedPrereqMap[course] = []
    for (const p of prereqs) {
      if (!mergedPrereqMap[course].includes(p)) mergedPrereqMap[course].push(p)
    }
  }

  // Set initial blocks for failing courses
  const blocked = new Set(failingCodes)
  
  // Apply initial blocks if student credit hours fall below structural rules
  for (const code of combinedSet) {
    if (creditRequirementsMap[code] !== undefined) {
      if (totalEarnedCredits < creditRequirementsMap[code]) {
        blocked.add(code)
      }
    }
  }

  // Cascade iterative blocking downstream
  let changed = true
  while (changed) {
    changed = false
    for (const code of combinedSet) {
      if (blocked.has(code) || completedSet.has(code)) continue
      const prereqs = mergedPrereqMap[code] || []
      const hasBroken = prereqs.some(p =>
        !isPrereqSatisfied(p, completedSet, passingSet) ||
        blocked.has(p)
      )
      if (hasBroken) { blocked.add(code); changed = true }
    }
  }

  // 💡 FIXED: Safely loop using .keys() because completedSet is a Map object instance
  for (const c of completedSet.keys()) {
    blocked.delete(c)
  }
  return blocked
}

// ── Apply co-requisite rules ──────────────────────────────────
function applyCoreqs(blockedSet, completedSet, inProgressSet) {
  let changed = true
  while (changed) {
    changed = false
    for (const [A, B] of COREQS) {
      if (!blockedSet.has(B)) continue
      if (isReachable(A, completedSet, inProgressSet, blockedSet)) {
        blockedSet.delete(B)
        changed = true
      }
    }
  }
  return blockedSet
}

// ── Build co-req edge set for frontend ────────────────────────
function buildCoReqEdgeSet() {
  return new Set(COREQS.map(([a, b]) => `${a}->${b}`))
}

// ── Merge two prereq maps ─────────────────────────────────────
function mergePrereqMaps(mapA, mapB) {
  const merged = { ...mapA }
  for (const [course, prereqs] of Object.entries(mapB)) {
    if (!merged[course]) merged[course] = []
    for (const p of prereqs) {
      if (!merged[course].includes(p)) merged[course].push(p)
    }
  }
  return merged
}

export function runAdvisoryEngine({
  student,
  enrollments,
  manualOverrides = {},   // { "CME300": true | false }
  currentSemester = 'fall',
  sectionsMap = {},       // { "CME300": [ ...rows ] }
}) {

  const chainKey = student.major?.code ?? 'CME2022'

  // ── Course sets ───────────────────────────────────────────
  const Course_Set = new Set(
    (chains[chainKey] || [])
      .flat()
      .filter(code => !isPlaceholder(code))
  )

  const Major_course_Set = new Set(
    chains["ME_Electives"].flat().filter(code => !isPlaceholder(code))
  )

  const combinedSet = new Set([...Course_Set, ...Major_course_Set])

  // ── Prereq, Credit & unlock maps ──────────────────────────
  const creditRequirementsMap   = buildCreditRequirementsMap(chainKey)
  const prereqMap               = buildPrereqMap(chainKey)
  const prereqMapForMajorCourse = buildPrereqMap("ME_Electives")
  const mergedPrereqMap         = mergePrereqMaps(prereqMap, prereqMapForMajorCourse)
  const unlockMap               = buildCombinedUnlockMap(chainKey, "ME_Electives")
  const unlockMemo              = {}
  const coReqEdgeSet            = buildCoReqEdgeSet()

  // ── Classify enrollments ──────────────────────────────────
  const completedMAP   = new Map()
  const passingSet     = new Set()   
  const failingCodes   = new Set()   
  const inProgressList = []

  let enrollmentCreditsEarned = 0

  for (const e of enrollments) {
    if (e.type === 'completed') {
      completedMAP.set(e.course_id, {
        grade:          e.grade,
        title:          e.course_title,
        type2:          e.type2,
        credits:        e.credits,
        enrollmentDate: e.enrollment_date,
        semester:       e.semseter,
      })
      enrollmentCreditsEarned += Number(e.credits || 0)
      continue
    }

    if (e.type === 'in_progress') {
      const hasOverride = manualOverrides[e.course_id] !== undefined
      const willPass    = hasOverride ? manualOverrides[e.course_id] : true

      if (willPass) {
        passingSet.add(e.course_id)
      } else {
        failingCodes.add(e.course_id)
      }

      inProgressList.push({
        code:          e.course_id,
        name:          e.course_title    ?? e.course_id,
        credits:       e.credits         ?? 3,
        term:          e.semseter        ?? null,   
        date:          e.enrollment_date ?? null,
        passFail:      willPass,
        manualOverride: hasOverride,
        type2:         e.type2 ?? null,
      })
    }
  }

  const inProgressSet = new Set(inProgressList.map(c => c.code))

  // Determine current baseline earned credits safely
  const totalEarnedCredits = Math.max(
    Number(student['Total Credit Pass'] || 0),
    enrollmentCreditsEarned
  )

  // Compute block state tracking both core requirements and credit limits
  const blockedSet = computeBlocked(
    failingCodes, 
    prereqMap, 
    prereqMapForMajorCourse,
    completedMAP, 
    combinedSet, 
    passingSet,
    creditRequirementsMap,
    totalEarnedCredits
  )

  applyCoreqs(blockedSet, completedMAP, inProgressSet)

  // ── Recommendations ───────────────────────────────────────
  const recommendations = []
  const All_courses = []

  for (const code of Object.keys(sectionsMap)) {
    const sections     = sectionsMap[code]  
    const firstSection = sections[0] 

    All_courses.push({
      code:       code,
      name:       firstSection.long_title,
      credits:    firstSection.max_units,
      sections:   sections
    })

    if (!combinedSet.has(code)) continue                          
    if (completedMAP.has(code) || inProgressSet.has(code)) continue
                         
    const prereqs    = mergedPrereqMap[code] || []
    const isBlocked  = blockedSet.has(code)
    const prereqsMet = prereqs.every(p =>
      isPrereqSatisfied(p, completedMAP, passingSet)
    ) && (creditRequirementsMap[code] === undefined || totalEarnedCredits >= creditRequirementsMap[code])

    const downstream = countDownstream(code, unlockMap, combinedSet, unlockMemo)

    const missingPrereqs = prereqs.filter(p => !isPrereqSatisfied(p, completedMAP, passingSet))
    if (creditRequirementsMap[code] !== undefined && totalEarnedCredits < creditRequirementsMap[code]) {
      missingPrereqs.push(`Required: ${creditRequirementsMap[code]} Credit Hours (Current: ${totalEarnedCredits})`)
    }

    recommendations.push({
      code,
      name:      firstSection.long_title,
      credits:   firstSection.max_units,
      career:    firstSection.career,
      sections,                                                                   
      instructor: `${firstSection.first_name ?? ''} ${firstSection.last_name ?? ''}`.trim(),
      days: {
        Mon:   firstSection.Mon,
        Tues:  firstSection.Tues,
        Wed:   firstSection.Wed,
        Thurs: firstSection.Thurs,
        Fri:   firstSection.Fri,
      },
      timeSlot:  `${firstSection.mtg_start} - ${firstSection.mtg_end}`,
      startDate: firstSection.start_date,
      endDate:   firstSection.end_date,
      capacity:  firstSection.cap_enrl,
      enrolled:  firstSection.tot_enrl,
      prereqsMet,
      isBlocked,
      downstreamUnlocks: downstream,
      missingPrereqs,
    })
  }

  recommendations.sort((a, b) => {
    if (a.isBlocked  !== b.isBlocked)  return a.isBlocked  ? 1 : -1
    if (a.prereqsMet !== b.prereqsMet) return a.prereqsMet ? -1 : 1
    return b.downstreamUnlocks - a.downstreamUnlocks
  })

  // ── Chain display ─────────────────────────────────────────
  const seenInChain = new Set()
  const chainDisplay = [...(chains[chainKey] || []), ...(chains["ME_Electives"] || [])]
    .flat()
    .filter(code => {
      if (isPlaceholder(code) || seenInChain.has(code)) return false
      seenInChain.add(code)
      return true
    })
    .map(code => {
      let state = 'locked'
      let meta = {}

      if (completedMAP.has(code)) {
        state = 'completed'
        meta = completedMAP.get(code)
      } else if (inProgressSet.has(code)) {
        const ip = inProgressList.find(x => x.code === code)
        state = ip?.passFail ? 'in_progress' : 'in_progress_at_risk'
        meta = { title: ip?.name }   
      } else if (!blockedSet.has(code)) {
        state = 'available'
      }

      const sectionName = sectionsMap[code]?.[0]?.long_title ?? null

      return { 
        code, 
        state, 
        year: Course_Year_Map[code] ?? null, 
        title: meta.title ?? sectionName ?? null,  
        ...meta 
      }
    })

  // ── Completed list ────────────────────────────────────────
  const completed = enrollments
    .filter(e => e.type === 'completed')
    .map(e => ({
      code:         e.course_id,
      name:         e.course_title    ?? e.course_id,
      credits:      e.credits         ?? 3,
      term:         e.semseter        ?? null,   
      grade:        e.grade           ?? null,
      enrolledDate: e.enrollment_date ?? null,
      type2 :       e.type2           ?? null,
    }))
    .reverse()

  return {
    student: {
      id:                 student.ID,
      name:               student['Student Name'],
      titleName:          student['Student Name'],
      cgpa:               student.CGPA,
      totalCreditsPassed: totalEarnedCredits,
      requiredCredits:    student.major?.required_credits ?? 136,
      major:              student.major?.name  ?? '',
      majorCode:          chainKey,
      campus:             student['Student Campus'] ?? null,
    },
    inProgress:   inProgressList,
    completed,
    blockedSet: [...blockedSet],
    recommendations,
    chainDisplay,
    prereqMap: mergedPrereqMap, 
    coReqEdges:    [...coReqEdgeSet],
    All_courses,
  }
}