import { useState, useEffect, useCallback } from 'react'
import { assignmentService } from '../services/assignmentService'
import type { Assignment } from '../types/assignment'

export function useAssignments(teacherId?: string) {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      let data
      if (teacherId) {
        data = await assignmentService.getByTeacher(teacherId)
      } else {
        data = await assignmentService.getByTeacher('')
      }
      setAssignments(data as Assignment[])
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [teacherId])

  useEffect(() => {
    fetchAssignments()
  }, [fetchAssignments])

  const createAssignment = useCallback(async (assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAssignment = await assignmentService.create(assignment)
    setAssignments((prev) => [newAssignment as Assignment, ...prev])
    return newAssignment
  }, [])

  const updateAssignment = useCallback(async (id: string, updates: Partial<Assignment>) => {
    const updated = await assignmentService.update(id, updates)
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? (updated as Assignment) : a))
    )
    return updated
  }, [])

  const deleteAssignment = useCallback(async (id: string) => {
    await assignmentService.delete(id)
    setAssignments((prev) => prev.filter((a) => a.id !== id))
  }, [])

  return {
    assignments,
    loading,
    error,
    refetch: fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  }
}
