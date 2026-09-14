import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import { dummyAssignments } from '../../data/assignments'
import { formatDate, isOverdue } from '../../utils/formatDate'
import type { Assignment } from '../../types/assignment'

export default function Assignments() {
  const navigate = useNavigate()
  const [assignments] = useState<Assignment[]>(dummyAssignments)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredAssignments = filterStatus === 'all'
    ? assignments
    : assignments.filter((a) => {
        if (filterStatus === 'active') return !isOverdue(a.deadline)
        if (filterStatus === 'overdue') return isOverdue(a.deadline)
        return true
      })

  const columns = [
    {
      key: 'subject',
      header: 'Mata Pelajaran',
      render: (row: Assignment) => (
        <span className="font-medium text-primary">{row.subject}</span>
      ),
    },
    {
      key: 'title',
      header: 'Judul Tugas',
      render: (row: Assignment) => (
        <div>
          <p className="font-medium text-text">{row.title}</p>
          <p className="text-xs text-text-secondary line-clamp-1">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'deadline',
      header: 'Deadline',
      render: (row: Assignment) => (
        <div>
          <p className="text-sm text-text">{formatDate(row.deadline)}</p>
          {isOverdue(row.deadline) ? (
            <Badge variant="danger">Terlambat</Badge>
          ) : (
            <Badge variant="success">Aktif</Badge>
          )}
        </div>
      ),
    },
    {
      key: 'submissionType',
      header: 'Tipe',
      render: (row: Assignment) => (
        <Badge variant="default">{row.submissionType}</Badge>
      ),
    },
    {
      key: 'submissions',
      header: 'Submission',
      render: () => (
        <span className="text-sm text-text">28 / 32</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row: Assignment) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/teacher/submissions?assignment=${row.id}`)}
          >
            Lihat Submission
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Tugas</h1>
          <p className="text-text-secondary mt-1">
            Kelola tugas untuk siswa Anda
          </p>
        </div>
        <Button onClick={() => navigate('/teacher/assignments/create')}>
          + Buat Tugas
        </Button>
      </div>

      {/* Filter */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Semua' },
            { value: 'active', label: 'Aktif' },
            { value: 'overdue', label: 'Terlambat' },
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

      {/* Assignments Table */}
      <Card padding={false}>
        <Table
          columns={columns}
          data={filteredAssignments}
          emptyMessage="Tidak ada tugas ditemukan"
        />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Tugas</p>
            <p className="text-3xl font-bold text-primary mt-1">{assignments.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Aktif</p>
            <p className="text-3xl font-bold text-success mt-1">
              {assignments.filter((a) => !isOverdue(a.deadline)).length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Terlambat</p>
            <p className="text-3xl font-bold text-danger mt-1">
              {assignments.filter((a) => isOverdue(a.deadline)).length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Submission</p>
            <p className="text-3xl font-bold text-warning mt-1">85%</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
