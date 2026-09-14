export const APP_NAME = 'EduConnect'

export const USER_ROLES = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
} as const

export const ASSIGNMENT_STATUS = {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  LATE: 'LATE',
} as const

export const SUBMISSION_TYPE = {
  FILE: 'file',
  TEXT: 'text',
  LINK: 'link',
} as const

export const QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  ESSAY: 'ESSAY',
} as const

export const LEARNING_PROGRESS = {
  IMPROVING: 'IMPROVING',
  STABLE: 'STABLE',
  DECLINING: 'DECLINING',
} as const

export const ROUTES = {
  LOGIN: '/login',
  TEACHER: {
    DASHBOARD: '/teacher',
    GROUPS: '/teacher/groups',
    STUDENTS: '/teacher/students',
    ASSIGNMENTS: '/teacher/assignments',
    CREATE_ASSIGNMENT: '/teacher/assignments/create',
    SUBMISSIONS: '/teacher/submissions',
    ASSESSMENTS: '/teacher/assessments',
    CREATE_ASSESSMENT: '/teacher/assessments/create',
    RESULTS: '/teacher/results',
    GRADES: '/teacher/grades',
    REPORTS: '/teacher/reports',
  },
  STUDENT: {
    DASHBOARD: '/student',
    ASSIGNMENTS: '/student/assignments',
    ASSIGNMENT_DETAIL: '/student/assignments/:id',
    ASSESSMENTS: '/student/assessments',
    RESULTS: '/student/results',
  },
  PARENT: {
    DASHBOARD: '/parent',
    CHILD: '/parent/child',
    ASSIGNMENTS: '/parent/assignments',
    ASSESSMENTS: '/parent/assessments',
    GRADES: '/parent/grades',
    REPORTS: '/parent/reports',
  },
} as const
