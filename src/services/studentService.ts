import { supabase } from './supabase'

export const studentService = {
  // Get all students
  async getAll() {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        users:user_id (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get students by learning group
  async getByLearningGroup(learningGroupId: string) {
    const { data, error } = await supabase
      .from('student_learning_groups')
      .select(`
        students:student_id (
          id,
          user_id,
          student_id,
          users:user_id (
            name,
            email
          )
        )
      `)
      .eq('learning_group_id', learningGroupId)

    if (error) throw error
    return data
  },

  // Get student by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        users:user_id (
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create student
  async create(student: { user_id: string; student_id: string }) {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Add student to learning group
  async addToLearningGroup(studentId: string, learningGroupId: string) {
    const { error } = await supabase
      .from('student_learning_groups')
      .insert({
        student_id: studentId,
        learning_group_id: learningGroupId,
      })

    if (error) throw error
  },

  // Remove student from learning group
  async removeFromLearningGroup(studentId: string, learningGroupId: string) {
    const { error } = await supabase
      .from('student_learning_groups')
      .delete()
      .eq('student_id', studentId)
      .eq('learning_group_id', learningGroupId)

    if (error) throw error
  },
}
