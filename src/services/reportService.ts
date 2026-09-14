import { supabase } from './supabase'
import type { Report, SubjectPerformance } from '../types/report'

export const reportService = {
  // Get report for a student
  async getStudentReport(studentId: string): Promise<Report> {
    // Get assignments
    const { data: assignments } = await supabase
      .from('assignments')
      .select('*')

    // Get submissions
    const { data: submissions } = await supabase
      .from('submissions')
      .select('*')
      .eq('student_id', studentId)

    // Get assessment results
    const { data: results } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('student_id', studentId)

    // Get student name
    const { data: student } = await supabase
      .from('students')
      .select('users:user_id (name)')
      .eq('id', studentId)
      .single()

    const totalAssignments = assignments?.length || 0
    const completedAssignments = submissions?.filter((s) => s.status === 'SUBMITTED' || s.status === 'GRADED').length || 0
    const pendingAssignments = totalAssignments - completedAssignments
    const lateAssignments = submissions?.filter((s) => s.status === 'LATE').length || 0

    // Calculate average score
    const scores = [
      ...(submissions?.filter((s) => s.score !== null).map((s) => s.score as number) || []),
      ...(results?.map((r) => r.score) || []),
    ]
    const averageScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0

    // Calculate subject performance
    const subjectMap = new Map<string, { scores: number[]; count: number }>()

    submissions?.forEach((s) => {
      const assignment = assignments?.find((a) => a.id === s.assignment_id)
      if (assignment && s.score !== null) {
        const existing = subjectMap.get(assignment.subject) || { scores: [], count: 0 }
        existing.scores.push(s.score as number)
        existing.count++
        subjectMap.set(assignment.subject, existing)
      }
    })

    const subjectPerformance: SubjectPerformance[] = Array.from(subjectMap.entries()).map(
      ([subject, data]) => ({
        subject,
        score: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
        assignmentCount: data.count,
      })
    )

    // Determine progress (simplified)
    const recentScores = scores.slice(-3)
    const olderScores = scores.slice(0, -3)
    const recentAvg = recentScores.length > 0
      ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length
      : 0
    const olderAvg = olderScores.length > 0
      ? olderScores.reduce((a, b) => a + b, 0) / olderScores.length
      : 0

    let progress: 'IMPROVING' | 'STABLE' | 'DECLINING' = 'STABLE'
    if (recentScores.length > 0 && olderScores.length > 0) {
      if (recentAvg > olderAvg + 5) progress = 'IMPROVING'
      else if (recentAvg < olderAvg - 5) progress = 'DECLINING'
    }

    return {
      studentId,
      studentName: (student?.users as unknown as { name: string })?.name || 'Unknown',
      totalAssignments,
      completedAssignments,
      pendingAssignments,
      lateAssignments,
      averageScore,
      subjectPerformance,
      learningProgress: progress,
    }
  },
}
