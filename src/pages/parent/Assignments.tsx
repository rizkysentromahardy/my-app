import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { dummyAssignments } from '../../data/assignments'
import { formatDate, isOverdue } from '../../utils/formatDate'
import type { Assignment } from '../../types/assignment'

interface AssignmentWithStatus extends Assignment {
  status: 'PENDING' | 'SUBMITTED' | 'LATE'
}

const dummyParentAssignments: AssignmentWithStatus[] = [
  { ...dummyAssignments[0], status: 'PENDING' },
  { ...dummyAssignments[1], status: 'SUBMITTED' },
  { ...dummyAssignments[2], status: 'LATE' },
  { ...dummyAssignments[3], status: 'SUBMITTED' },
]

export default function ParentAssignments() {
  const [assignments] = useState<AssignmentWithStatus[]>(dummyParentAssignments)
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
      PENDING: 'Belum Dikerjakan',
      SUBMITTED: 'Sudah Dikerjakan',
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
        <h1 className="text-2xl font-bold text-text">Tugas Anak</h1>
        <p className="text-text-secondary mt-1">
          Pantau tugas yang harus dikerjakan anak Anda
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
            <p className="text-sm text-text-secondary">Belum</p>
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
            { value: 'PENDING', label: 'Belum Dikerjakan' },
            { value: 'SUBMITTED', label: 'Sudah Dikerjakan' },
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
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-primary">{assignment.subject}</span>
                  {getStatusBadge(assignment.status)}
                </div>
                <h3 className="font-semibold text-text">{assignment.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{assignment.description}</p>
                <p className="text-sm text-text-secondary mt-2">
                  Deadline: {formatDate(assignment.deadline)}
                  {isOverdue(assignment.deadline) && assignment.status !== 'SUBMITTED' && (
                    <span className="text-danger ml-2">(Sudah lewat)</span>
                  )}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
