import { useState, useEffect, useCallback } from 'react'
import { assessmentService } from '../services/assessmentService'
import type { Assessment, Question } from '../types/assessment'

export function useAssessments(teacherId?: string) {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      let data
      if (teacherId) {
        data = await assessmentService.getByTeacher(teacherId)
      } else {
        data = await assessmentService.getAll()
      }
      setAssessments(data as Assessment[])
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [teacherId])

  useEffect(() => {
    fetchAssessments()
  }, [fetchAssessments])

  const createAssessment = useCallback(async (assessment: {
    title: string
    description: string
    subject: string
    learning_group_id: string
    teacher_id: string
    duration: number
    question_count: number
    start_date?: string
    end_date?: string
  }) => {
    const newAssessment = await assessmentService.create(assessment)
    setAssessments((prev) => [newAssessment as Assessment, ...prev])
    return newAssessment
  }, [])

  const getQuestions = useCallback(async (assessmentId: string) => {
    const questions = await assessmentService.getQuestions(assessmentId)
    return questions as Question[]
  }, [])

  const createQuestions = useCallback(async (questions: {
    assessment_id: string
    question: string
    type: 'MULTIPLE_CHOICE' | 'ESSAY'
    options?: string[]
    correct_answer?: string
    score: number
    order: number
  }[]) => {
    return await assessmentService.createQuestions(questions)
  }, [])

  return {
    assessments,
    loading,
    error,
    refetch: fetchAssessments,
    createAssessment,
    getQuestions,
    createQuestions,
  }
}
