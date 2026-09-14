import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { dummyAssessments } from '../../data/assessments'
import { formatDate } from '../../utils/formatDate'
import type { Assessment } from '../../types/assessment'

interface AssessmentWithStatus extends Assessment {
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED'
  score?: number
}

const dummyStudentAssessments: AssessmentWithStatus[] = [
  {
    ...dummyAssessments[0],
    status: 'ACTIVE',
  },
  {
    ...dummyAssessments[1],
    status: 'UPCOMING',
  },
  {
    ...dummyAssessments[2],
    status: 'COMPLETED',
    score: 82,
  },
]

export default function Assessments() {
  const navigate = useNavigate()
  const [assessments] = useState<AssessmentWithStatus[]>(dummyStudentAssessments)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredAssessments = filterStatus === 'all'
    ? assessments
    : assessments.filter((a) => a.status === filterStatus)

  const getStatusBadge = (status: AssessmentWithStatus['status']) => {
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

  const stats = {
    total: assessments.length,
    upcoming: assessments.filter((a) => a.status === 'UPCOMING').length,
    active: assessments.filter((a) => a.status === 'ACTIVE').length,
    completed: assessments.filter((a) => a.status === 'COMPLETED').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Assessment</h1>
        <p className="text-text-secondary mt-1">
          Daftar ujian dan evaluasi pembelajaran
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total</p>
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Akan Datang</p>
            <p className="text-2xl font-bold text-info">{stats.upcoming}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Aktif</p>
            <p className="text-2xl font-bold text-success">{stats.active}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Selesai</p>
            <p className="text-2xl font-bold text-text-secondary">{stats.completed}</p>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Semua' },
            { value: 'UPCOMING', label: 'Akan Datang' },
            { value: 'ACTIVE', label: 'Aktif' },
            { value: 'COMPLETED', label: 'Selesai' },
          ].map((filter) => (
            <Button
              key={filter.value}
              size="sm"
              variant={filterStatus === filter.value ? 'primary' : 'outline'}
              onClick={() => setFilterStatus(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Assessments List */}
      <div className="space-y-4">
        {filteredAssessments.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-text-secondary">Tidak ada assessment ditemukan</p>
            </div>
          </Card>
        ) : (
          filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-primary">{assessment.subject}</span>
                    {getStatusBadge(assessment.status)}
                  </div>
                  <h3 className="font-semibold text-text">{assessment.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{assessment.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {assessment.duration} menit
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {assessment.questionCount} soal
                    </div>
                    {assessment.startDate && (
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(assessment.startDate)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {assessment.status === 'COMPLETED' && assessment.score !== undefined && (
                    <div className="text-center">
                      <p className="text-3xl font-bold text-success">{assessment.score}</p>
                      <p className="text-xs text-text-secondary">Nilai</p>
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant={assessment.status === 'ACTIVE' ? 'primary' : 'outline'}
                    disabled={assessment.status === 'UPCOMING'}
                    onClick={() => {
                      if (assessment.status === 'ACTIVE') {
                        // Navigate to take assessment
                        navigate('/student/assessments')
                      }
                    }}
                  >
                    {assessment.status === 'ACTIVE' ? 'Mulai' :
                     assessment.status === 'COMPLETED' ? 'Lihat Hasil' : 'Belum Tersedia'}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
