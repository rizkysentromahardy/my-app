import { supabase } from './supabase'

export const submissionService = {
  // Get submissions for an assignment
  async getByAssignment(assignmentId: string) {
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        students:user_id (
          id,
          name,
          email
        )
      `)
      .eq('assignment_id', assignmentId)
      .order('submitted_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get submissions by a student
  async getByStudent(studentId: string) {
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        assignments:assignment_id (
          id,
          title,
          subject,
          deadline
        )
      `)
      .eq('student_id', studentId)
      .order('submitted_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get submission by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create or update submission
  async upsert(submission: {
    assignment_id: string
    student_id: string
    content?: string
    file_url?: string
    link_url?: string
  }) {
    const { data, error } = await supabase
      .from('submissions')
      .upsert({
        ...submission,
        submitted_at: new Date().toISOString(),
        status: 'SUBMITTED',
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Grade submission
  async grade(
    id: string,
    score: number,
    feedback: string,
    gradedBy: string
  ) {
    const { data, error } = await supabase
      .from('submissions')
      .update({
        score,
        feedback,
        status: 'GRADED',
        graded_at: new Date().toISOString(),
        graded_by: gradedBy,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
