export interface Report {
  studentId: string
  studentName: string
  totalAssignments: number
  completedAssignments: number
  pendingAssignments: number
  lateAssignments: number
  averageScore: number
  subjectPerformance: SubjectPerformance[]
  learningProgress: 'IMPROVING' | 'STABLE' | 'DECLINING'
}

export interface SubjectPerformance {
  subject: string
  score: number
  assignmentCount: number
}

export interface ReportSummary {
  assignmentCompletion: number
  averageScore: number
  topSubject: string
  weakestSubject: string
  progress: 'IMPROVING' | 'STABLE' | 'DECLINING'
}
