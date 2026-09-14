export interface Student {
  id: string
  userId: string
  name: string
  email: string
  studentId: string
  learningGroupIds: string[]
  parentIds: string[]
  createdAt: string
  updatedAt: string
}

export interface StudentSummary {
  id: string
  name: string
  studentId: string
  learningGroupName: string
  assignmentCompletion: number
  averageScore: number
}
