export type UserRole = 'TEACHER' | 'STUDENT' | 'PARENT'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Teacher extends User {
  role: 'TEACHER'
  subjects: string[]
  learningGroupIds: string[]
}

export interface Student extends User {
  role: 'STUDENT'
  studentId: string
  learningGroupIds: string[]
  parentIds: string[]
}

export interface Parent extends User {
  role: 'PARENT'
  childIds: string[]
}
