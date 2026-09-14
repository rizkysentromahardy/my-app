import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { dummyAssessments } from '../../data/assessments'
import { formatDate } from '../../utils/formatDate'
import type { Assessment } from '../../types/assessment'

interface AssessmentWithResult extends Assessment {
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED'
  score?: number
}

const dummyParentAssessments: AssessmentWithResult[] = [
  { ...dummyAssessments[0], status: 'COMPLETED', score: 82 },
  { ...dummyAssessments[1], status: 'UPCOMING' },
  { ...dummyAssessments[2], status: 'COMPLETED', score: 76 },
]

export default function ParentAssessments() {
  const assessments = dummyParentAssessments

  const getStatusBadge = (status: AssessmentWithResult['status']) => {
    const variants = {
      UPCOMING: 'info' as const,
      ACTIVE: 'success' as const,
      COMPLETED: 'default' as const,
    }
    const labels = {
      UPCOMING: 'Akan Datang',
      ACTIVE: 'Sedang Berlangsung',
      COMPLETED: 'Selesai',
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  const completedAssessments = assessments.filter((a) => a.status === 'COMPLETED')
  const averageScore = completedAssessments.length > 0
    ? Math.round(completedAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / completedAssessments.length)
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Assessment Anak</h1>
        <p className="text-text-secondary mt-1">
          Pantau hasil assessment anak Anda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Assessment</p>
            <p className="text-3xl font-bold text-primary">{assessments.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Selesai</p>
            <p className="text-3xl font-bold text-success">{completedAssessments.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Nilai</p>
            <p className="text-3xl font-bold text-success">{averageScore}</p>
          </div>
        </Card>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-primary">{assessment.subject}</span>
                  {getStatusBadge(assessment.status)}
                </div>
                <h3 className="font-semibold text-text">{assessment.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{assessment.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-text-secondary">
                    {assessment.duration} menit • {assessment.questionCount} soal
                  </span>
                  {assessment.startDate && (
                    <span className="text-sm text-text-secondary">
                      {formatDate(assessment.startDate)}
                    </span>
                  )}
                </div>
              </div>
              {assessment.status === 'COMPLETED' && assessment.score !== undefined && (
                <div className="text-center">
                  <p className="text-4xl font-bold text-success">{assessment.score}</p>
                  <p className="text-sm text-text-secondary">Nilai</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
