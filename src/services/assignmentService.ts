import { supabase } from './supabase'
import type { Assignment, AssignmentStatus } from '../types/assignment'

export const assignmentService = {
  // Get all assignments for a learning group
  async getByLearningGroup(learningGroupId: string) {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('learning_group_id', learningGroupId)
      .order('deadline', { ascending: true })

    if (error) throw error
    return data
  },

  // Get all assignments for a teacher
  async getByTeacher(teacherId: string) {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get assignment by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new assignment
  async create(assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('assignments')
      .insert({
        title: assignment.title,
        description: assignment.description,
        subject: assignment.subject,
        learning_group_id: assignment.learningGroupId,
        teacher_id: assignment.teacherId,
        deadline: assignment.deadline,
        attachment: assignment.attachment,
        submission_type: assignment.submissionType,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update assignment
  async update(id: string, updates: Partial<Assignment>) {
    const { data, error } = await supabase
      .from('assignments')
      .update({
        title: updates.title,
        description: updates.description,
        subject: updates.subject,
        deadline: updates.deadline,
        attachment: updates.attachment,
        submission_type: updates.submissionType,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete assignment
  async delete(id: string) {
    const { error } = await supabase.from('assignments').delete().eq('id', id)
    if (error) throw error
  },

  // Get assignment status for a student
  getAssignmentStatus(assignment: Assignment, submittedAt?: string): AssignmentStatus {
    if (!submittedAt) return 'PENDING'
    const deadline = new Date(assignment.deadline)
    const submitted = new Date(submittedAt)
    return submitted <= deadline ? 'SUBMITTED' : 'LATE'
  },
}
