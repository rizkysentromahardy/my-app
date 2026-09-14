export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'TEACHER' | 'STUDENT' | 'PARENT'
          avatar: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: 'TEACHER' | 'STUDENT' | 'PARENT'
          avatar?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'TEACHER' | 'STUDENT' | 'PARENT'
          avatar?: string | null
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          updated_at?: string
        }
      }
      learning_groups: {
        Row: {
          id: string
          name: string
          subject: string
          teacher_id: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subject: string
          teacher_id: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subject?: string
          teacher_id?: string
          description?: string | null
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          user_id: string
          student_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          student_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          student_id?: string
          updated_at?: string
        }
      }
      student_learning_groups: {
        Row: {
          student_id: string
          learning_group_id: string
          created_at: string
        }
        Insert: {
          student_id: string
          learning_group_id: string
          created_at?: string
        }
        Update: {
          student_id?: string
          learning_group_id?: string
        }
      }
      student_guardians: {
        Row: {
          id: string
          student_id: string
          parent_id: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          parent_id: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          parent_id?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      assignments: {
        Row: {
          id: string
          title: string
          description: string
          subject: string
          learning_group_id: string
          teacher_id: string
          deadline: string
          attachment: string | null
          submission_type: 'file' | 'text' | 'link'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          subject: string
          learning_group_id: string
          teacher_id: string
          deadline: string
          attachment?: string | null
          submission_type: 'file' | 'text' | 'link'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          subject?: string
          learning_group_id?: string
          teacher_id?: string
          deadline?: string
          attachment?: string | null
          submission_type?: 'file' | 'text' | 'link'
          updated_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          assignment_id: string
          student_id: string
          content: string | null
          file_url: string | null
          link_url: string | null
          submitted_at: string
          status: 'PENDING' | 'SUBMITTED' | 'LATE' | 'GRADED'
          score: number | null
          feedback: string | null
          graded_at: string | null
          graded_by: string | null
        }
        Insert: {
          id?: string
          assignment_id: string
          student_id: string
          content?: string | null
          file_url?: string | null
          link_url?: string | null
          submitted_at?: string
          status: 'PENDING' | 'SUBMITTED' | 'LATE' | 'GRADED'
          score?: number | null
          feedback?: string | null
          graded_at?: string | null
          graded_by?: string | null
        }
        Update: {
          id?: string
          assignment_id?: string
          student_id?: string
          content?: string | null
          file_url?: string | null
          link_url?: string | null
          submitted_at?: string
          status?: 'PENDING' | 'SUBMITTED' | 'LATE' | 'GRADED'
          score?: number | null
          feedback?: string | null
          graded_at?: string | null
          graded_by?: string | null
        }
      }
      assessments: {
        Row: {
          id: string
          title: string
          description: string
          subject: string
          learning_group_id: string
          teacher_id: string
          duration: number
          question_count: number
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          subject: string
          learning_group_id: string
          teacher_id: string
          duration: number
          question_count: number
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          subject?: string
          learning_group_id?: string
          teacher_id?: string
          duration?: number
          question_count?: number
          start_date?: string | null
          end_date?: string | null
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          assessment_id: string
          question: string
          type: 'MULTIPLE_CHOICE' | 'ESSAY'
          options: string[] | null
          correct_answer: string | null
          score: number
          order: number
        }
        Insert: {
          id?: string
          assessment_id: string
          question: string
          type: 'MULTIPLE_CHOICE' | 'ESSAY'
          options?: string[] | null
          correct_answer?: string | null
          score: number
          order: number
        }
        Update: {
          id?: string
          assessment_id?: string
          question?: string
          type?: 'MULTIPLE_CHOICE' | 'ESSAY'
          options?: string[] | null
          correct_answer?: string | null
          score?: number
          order?: number
        }
      }
      assessment_answers: {
        Row: {
          id: string
          assessment_id: string
          question_id: string
          student_id: string
          answer: string
          is_correct: boolean | null
          score: number | null
        }
        Insert: {
          id?: string
          assessment_id: string
          question_id: string
          student_id: string
          answer: string
          is_correct?: boolean | null
          score?: number | null
        }
        Update: {
          id?: string
          assessment_id?: string
          question_id?: string
          student_id?: string
          answer?: string
          is_correct?: boolean | null
          score?: number | null
        }
      }
      assessment_results: {
        Row: {
          id: string
          assessment_id: string
          student_id: string
          score: number
          correct_answers: number
          wrong_answers: number
          completed_at: string
        }
        Insert: {
          id?: string
          assessment_id: string
          student_id: string
          score: number
          correct_answers: number
          wrong_answers: number
          completed_at?: string
        }
        Update: {
          id?: string
          assessment_id?: string
          student_id?: string
          score?: number
          correct_answers?: number
          wrong_answers?: number
          completed_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'TEACHER' | 'STUDENT' | 'PARENT'
      assignment_status: 'PENDING' | 'SUBMITTED' | 'LATE' | 'GRADED'
      question_type: 'MULTIPLE_CHOICE' | 'ESSAY'
      submission_type: 'file' | 'text' | 'link'
    }
  }
}
