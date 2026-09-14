import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import { formatDate } from '../../utils/formatDate'

interface Submission {
  id: string
  studentId: string
  studentName: string
  assignmentId: string
  assignmentTitle: string
  subject: string
  submittedAt: string
  status: 'SUBMITTED' | 'LATE' | 'GRADED'
  score?: number
  feedback?: string
}

const dummySubmissions: Submission[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Andi Pratama',
    assignmentId: '1',
    assignmentTitle: 'Persamaan Linear',
    subject: 'Matematika',
    submittedAt: '2024-12-15T10:30:00Z',
    status: 'SUBMITTED',
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Budi Santoso',
    assignmentId: '1',
    assignmentTitle: 'Persamaan Linear',
    subject: 'Matematika',
    submittedAt: '2024-12-16T14:20:00Z',
    status: 'LATE',
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Citra Dewi',
    assignmentId: '2',
    assignmentTitle: 'Reading Exercise',
    subject: 'Bahasa Inggris',
    submittedAt: '2024-12-14T09:15:00Z',
    status: 'GRADED',
    score: 85,
    feedback: 'Bagus, tapi perlu perbaiki grammar di paragraf 2',
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Diana Putri',
    assignmentId: '1',
    assignmentTitle: 'Persamaan Linear',
    subject: 'Matematika',
    submittedAt: '2024-12-15T16:45:00Z',
    status: 'SUBMITTED',
  },
]

export default function Submissions() {
  const [submissions] = useState<Submission[]>(dummySubmissions)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [gradeData, setGradeData] = useState({ score: '', feedback: '' })

  const handleGrade = (submission: Submission) => {
    setSelectedSubmission(submission)
    setGradeData({
      score: submission.score?.toString() || '',
      feedback: submission.feedback || '',
    })
    setShowGradeModal(true)
  }

  const handleSaveGrade = () => {
    // TODO: Implement save grade logic
    setShowGradeModal(false)
    setSelectedSubmission(null)
  }

  const columns = [
    {
      key: 'studentName',
      header: 'Siswa',
      render: (row: Submission) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {row.studentName.charAt(0)}
            </span>
          </div>
          <span className="font-medium text-text">{row.studentName}</span>
        </div>
      ),
    },
    {
      key: 'assignmentTitle',
      header: 'Tugas',
      render: (row: Submission) => (
        <div>
          <p className="font-medium text-text">{row.assignmentTitle}</p>
          <p className="text-xs text-text-secondary">{row.subject}</p>
        </div>
      ),
    },
    {
      key: 'submittedAt',
      header: 'Waktu Submit',
      render: (row: Submission) => (
        <span className="text-sm text-text">{formatDate(row.submittedAt)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: Submission) => {
        const variants = {
          SUBMITTED: 'warning' as const,
          LATE: 'danger' as const,
          GRADED: 'success' as const,
        }
        const labels = {
          SUBMITTED: 'Sudah Submit',
          LATE: 'Terlambat',
          GRADED: 'Sudah Dinilai',
        }
        return <Badge variant={variants[row.status]}>{labels[row.status]}</Badge>
      },
    },
    {
      key: 'score',
      header: 'Nilai',
      render: (row: Submission) => (
        <span className={`font-semibold ${row.score ? 'text-success' : 'text-text-secondary'}`}>
          {row.score || '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row: Submission) => (
        <Button size="sm" variant="outline" onClick={() => handleGrade(row)}>
          {row.status === 'GRADED' ? 'Edit Nilai' : 'Beri Nilai'}
        </Button>
      ),
    },
  ]

  const stats = {
    total: submissions.length,
    submitted: submissions.filter((s) => s.status === 'SUBMITTED').length,
    late: submissions.filter((s) => s.status === 'LATE').length,
    graded: submissions.filter((s) => s.status === 'GRADED').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Submission</h1>
        <p className="text-text-secondary mt-1">
          Lihat dan nilai tugas yang dikumpulkan siswa
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Submission</p>
            <p className="text-3xl font-bold text-primary mt-1">{stats.total}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Sudah Submit</p>
            <p className="text-3xl font-bold text-warning mt-1">{stats.submitted}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Terlambat</p>
            <p className="text-3xl font-bold text-danger mt-1">{stats.late}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Sudah Dinilai</p>
            <p className="text-3xl font-bold text-success mt-1">{stats.graded}</p>
          </div>
        </Card>
      </div>

      {/* Submissions Table */}
      <Card padding={false}>
        <Table
          columns={columns}
          data={submissions}
          emptyMessage="Tidak ada submission ditemukan"
        />
      </Card>

      {/* Grade Modal */}
      <Modal
        isOpen={showGradeModal}
        onClose={() => setShowGradeModal(false)}
        title="Beri Nilai"
      >
        {selectedSubmission && (
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-text-secondary">Siswa</p>
              <p className="font-medium text-text">{selectedSubmission.studentName}</p>
              <p className="text-sm text-text-secondary mt-2">Tugas</p>
              <p className="font-medium text-text">{selectedSubmission.assignmentTitle}</p>
            </div>

            {selectedSubmission.status !== 'GRADED' && (
              <div>
                <p className="text-sm text-text-secondary mb-2">File yang dikumpulkan</p>
                <div className="p-3 border border-border rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-primary">Tugas_Andi.pdf</span>
                </div>
              </div>
            )}

            <Input
              label="Nilai"
              type="number"
              placeholder="0-100"
              value={gradeData.score}
              onChange={(e) => setGradeData({ ...gradeData, score: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Feedback
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[80px]"
                placeholder="Berikan feedback untuk siswa..."
                value={gradeData.feedback}
                onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowGradeModal(false)}>
                Batal
              </Button>
              <Button onClick={handleSaveGrade}>Simpan Nilai</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
