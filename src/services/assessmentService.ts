import { supabase } from './supabase'

export const assessmentService = {
  // Get all assessments
  async getAll() {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get assessments by teacher
  async getByTeacher(teacherId: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get assessment by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create assessment
  async create(assessment: {
    title: string
    description: string
    subject: string
    learning_group_id: string
    teacher_id: string
    duration: number
    question_count: number
    start_date?: string
    end_date?: string
  }) {
    const { data, error } = await supabase
      .from('assessments')
      .insert(assessment)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update assessment
  async update(id: string, updates: Record<string, unknown>) {
    const { data, error } = await supabase
      .from('assessments')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get questions for assessment
  async getQuestions(assessmentId: string) {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('assessment_id', assessmentId)
      .order('order', { ascending: true })

    if (error) throw error
    return data
  },

  // Create questions
  async createQuestions(questions: {
    assessment_id: string
    question: string
    type: 'MULTIPLE_CHOICE' | 'ESSAY'
    options?: string[]
    correct_answer?: string
    score: number
    order: number
  }[]) {
    const { data, error } = await supabase
      .from('questions')
      .insert(questions)
      .select()

    if (error) throw error
    return data
  },

  // Submit assessment answers
  async submitAnswers(answers: {
    assessment_id: string
    question_id: string
    student_id: string
    answer: string
  }[]) {
    const { data, error } = await supabase
      .from('assessment_answers')
      .insert(answers)
      .select()

    if (error) throw error
    return data
  },

  // Get assessment results
  async getResults(assessmentId: string) {
    const { data, error } = await supabase
      .from('assessment_results')
      .select(`
        *,
        users:student_id (
          name,
          email
        )
      `)
      .eq('assessment_id', assessmentId)
      .order('score', { ascending: false })

    if (error) throw error
    return data
  },

  // Create assessment result
  async createResult(result: {
    assessment_id: string
    student_id: string
    score: number
    correct_answers: number
    wrong_answers: number
  }) {
    const { data, error } = await supabase
      .from('assessment_results')
      .insert(result)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
