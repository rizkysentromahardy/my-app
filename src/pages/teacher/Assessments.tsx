import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import { dummyAssessments } from '../../data/assessments'
import { formatDate } from '../../utils/formatDate'
import type { Assessment } from '../../types/assessment'

export default function Assessments() {
  const navigate = useNavigate()
  const [assessments] = useState<Assessment[]>(dummyAssessments)

  const columns = [
    {
      key: 'subject',
      header: 'Mata Pelajaran',
      render: (row: Assessment) => (
        <span className="font-medium text-primary">{row.subject}</span>
      ),
    },
    {
      key: 'title',
      header: 'Judul Assessment',
      render: (row: Assessment) => (
        <div>
          <p className="font-medium text-text">{row.title}</p>
          <p className="text-xs text-text-secondary line-clamp-1">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'duration',
      header: 'Durasi',
      render: (row: Assessment) => (
        <span className="text-sm text-text">{row.duration} menit</span>
      ),
    },
    {
      key: 'questionCount',
      header: 'Jumlah Soal',
      render: (row: Assessment) => (
        <span className="text-sm text-text">{row.questionCount} soal</span>
      ),
    },
    {
      key: 'startDate',
      header: 'Tanggal',
      render: (row: Assessment) => (
        <div>
          {row.startDate ? (
            <>
              <p className="text-sm text-text">{formatDate(row.startDate)}</p>
              <Badge variant="success">Terjadwal</Badge>
            </>
          ) : (
            <Badge variant="default">Draft</Badge>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row: Assessment) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/teacher/results?assessment=${row.id}`)}
          >
            Lihat Hasil
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
          <h1 className="text-2xl font-bold text-text">Assessment</h1>
          <p className="text-text-secondary mt-1">
            Kelola ujian dan evaluasi pembelajaran
          </p>
        </div>
        <Button onClick={() => navigate('/teacher/assessments/create')}>
          + Buat Assessment
        </Button>
      </div>

      {/* Assessments Table */}
      <Card padding={false}>
        <Table
          columns={columns}
          data={assessments}
          emptyMessage="Tidak ada assessment ditemukan"
        />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Assessment</p>
            <p className="text-3xl font-bold text-primary mt-1">{assessments.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Terjadwal</p>
            <p className="text-3xl font-bold text-success mt-1">
              {assessments.filter((a) => a.startDate).length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Draft</p>
            <p className="text-3xl font-bold text-warning mt-1">
              {assessments.filter((a) => !a.startDate).length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Nilai</p>
            <p className="text-3xl font-bold text-info mt-1">78</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
