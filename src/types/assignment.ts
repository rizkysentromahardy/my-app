export type AssignmentStatus = 'PENDING' | 'SUBMITTED' | 'LATE'
export type SubmissionType = 'file' | 'text' | 'link'

export interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  learningGroupId: string
  teacherId: string
  deadline: string
  attachment?: string
  submissionType: SubmissionType
  createdAt: string
  updatedAt: string
}

export interface AssignmentWithStatus extends Assignment {
  status: AssignmentStatus
  submittedAt?: string
  score?: number
}

export interface AssignmentSummary {
  id: string
  title: string
  subject: string
  deadline: string
  submissionCount: number
  totalStudents: number
  status: AssignmentStatus
}
