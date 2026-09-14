import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { dummyAssignments } from '../../data/assignments'
import { formatRelativeDate } from '../../utils/formatDate'
import type { Assignment } from '../../types/assignment'

interface AssignmentWithStatus extends Assignment {
  status: 'PENDING' | 'SUBMITTED' | 'LATE'
  submittedAt?: string
}

const dummyStudentAssignments: AssignmentWithStatus[] = [
  {
    ...dummyAssignments[0],
    status: 'PENDING',
  },
  {
    ...dummyAssignments[1],
    status: 'SUBMITTED',
    submittedAt: '2024-12-14T10:00:00Z',
  },
  {
    ...dummyAssignments[2],
    status: 'LATE',
    submittedAt: '2024-12-26T10:00:00Z',
  },
  {
    ...dummyAssignments[3],
    status: 'SUBMITTED',
    submittedAt: '2024-12-17T09:00:00Z',
  },
]

export default function Assignments() {
  const navigate = useNavigate()
  const [assignments] = useState<AssignmentWithStatus[]>(dummyStudentAssignments)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredAssignments = filterStatus === 'all'
    ? assignments
    : assignments.filter((a) => a.status === filterStatus)

  const getStatusBadge = (status: AssignmentWithStatus['status']) => {
    const variants = {
      PENDING: 'warning' as const,
      SUBMITTED: 'success' as const,
      LATE: 'danger' as const,
    }
    const labels = {
      PENDING: 'Belum Dikumpulkan',
      SUBMITTED: 'Sudah Dikumpulkan',
      LATE: 'Terlambat',
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  const stats = {
    total: assignments.length,
    pending: assignments.filter((a) => a.status === 'PENDING').length,
    submitted: assignments.filter((a) => a.status === 'SUBMITTED').length,
    late: assignments.filter((a) => a.status === 'LATE').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Tugas</h1>
        <p className="text-text-secondary mt-1">
          Daftar tugas yang harus dikerjakan
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
            <p className="text-sm text-text-secondary">Pending</p>
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Selesai</p>
            <p className="text-2xl font-bold text-success">{stats.submitted}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Terlambat</p>
            <p className="text-2xl font-bold text-danger">{stats.late}</p>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Semua' },
            { value: 'PENDING', label: 'Belum Dikumpulkan' },
            { value: 'SUBMITTED', label: 'Sudah Dikumpulkan' },
            { value: 'LATE', label: 'Terlambat' },
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

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-text-secondary">Tidak ada tugas ditemukan</p>
            </div>
          </Card>
        ) : (
          filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-primary">{assignment.subject}</span>
                    {getStatusBadge(assignment.status)}
                  </div>
                  <h3 className="font-semibold text-text">{assignment.title}</h3>
                  <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                    {assignment.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Deadline: {formatRelativeDate(assignment.deadline)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Tipe: {assignment.submissionType}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/student/assignments/${assignment.id}`)}
                  >
                    {assignment.status === 'PENDING' ? 'Kerjakan' : 'Lihat Detail'}
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
