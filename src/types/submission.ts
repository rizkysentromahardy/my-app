export type SubmissionStatus = 'PENDING' | 'SUBMITTED' | 'LATE' | 'GRADED'

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  content?: string
  fileUrl?: string
  linkUrl?: string
  submittedAt: string
  status: SubmissionStatus
  score?: number
  feedback?: string
  gradedAt?: string
  gradedBy?: string
}

export interface SubmissionWithDetails extends Submission {
  studentName: string
  assignmentTitle: string
  subject: string
}
