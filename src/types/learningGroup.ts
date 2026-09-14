export interface LearningGroup {
  id: string
  name: string
  subject: string
  teacherId: string
  studentIds: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

export interface LearningGroupSummary {
  id: string
  name: string
  subject: string
  studentCount: number
  activeAssignments: number
}
