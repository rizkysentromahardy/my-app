export type QuestionType = 'MULTIPLE_CHOICE' | 'ESSAY'

export interface Assessment {
  id: string
  title: string
  description: string
  subject: string
  learningGroupId: string
  teacherId: string
  duration: number // in minutes
  questionCount: number
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export interface Question {
  id: string
  assessmentId: string
  question: string
  type: QuestionType
  options?: string[] // for multiple choice: ['A', 'B', 'C', 'D']
  correctAnswer?: string
  score: number
  order: number
}

export interface AssessmentAnswer {
  id: string
  assessmentId: string
  questionId: string
  studentId: string
  answer: string
  isCorrect?: boolean
  score?: number
}

export interface AssessmentResult {
  id: string
  assessmentId: string
  studentId: string
  score: number
  correctAnswers: number
  wrongAnswers: number
  completedAt: string
}

export interface AssessmentWithResults extends Assessment {
  averageScore: number
  completionRate: number
}
