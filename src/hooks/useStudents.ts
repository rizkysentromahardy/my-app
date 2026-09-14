import { useState, useEffect, useCallback } from 'react'
import { studentService } from '../services/studentService'

interface StudentWithUser {
  id: string
  user_id: string
  student_id: string
  users: {
    id: string
    name: string
    email: string
  }
}

export function useStudents(learningGroupId?: string) {
  const [students, setStudents] = useState<StudentWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      let data
      if (learningGroupId) {
        data = await studentService.getByLearningGroup(learningGroupId)
      } else {
        data = await studentService.getAll()
      }
      setStudents(data as unknown as StudentWithUser[])
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [learningGroupId])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  return {
    students,
    loading,
    error,
    refetch: fetchStudents,
  }
}
