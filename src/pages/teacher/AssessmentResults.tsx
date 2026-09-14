import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'
import Modal from '../../components/ui/Modal'
import { getScoreColor, getScoreGrade } from '../../utils/formatScore'

interface AssessmentResult {
  id: string
  studentId: string
  studentName: string
  assessmentTitle: string
  subject: string
  score: number
  correctAnswers: number
  wrongAnswers: number
  totalQuestions: number
  completedAt: string
  status: 'GRADED' | 'PENDING'
  feedback?: string
}

const dummyResults: AssessmentResult[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Andi Pratama',
    assessmentTitle: 'Ulangan Harian Matematika Bab 3',
    subject: 'Matematika',
    score: 82,
    correctAnswers: 16,
    wrongAnswers: 4,
    totalQuestions: 20,
    completedAt: '2024-12-18T10:00:00Z',
    status: 'GRADED',
    feedback: 'Bagus, perlu perhatikan materi pertidaksamaan',
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Budi Santoso',
    assessmentTitle: 'Ulangan Harian Matematika Bab 3',
    subject: 'Matematika',
    score: 75,
    correctAnswers: 15,
    wrongAnswers: 5,
    totalQuestions: 20,
    completedAt: '2024-12-18T10:30:00Z',
    status: 'GRADED',
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Citra Dewi',
    assessmentTitle: 'Ulangan Harian Matematika Bab 3',
    subject: 'Matematika',
    score: 95,
    correctAnswers: 19,
    wrongAnswers: 1,
    totalQuestions: 20,
    completedAt: '2024-12-18T09:45:00Z',
    status: 'GRADED',
    feedback: 'Excellent! Pertahankan!',
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Diana Putri',
    assessmentTitle: 'Ulangan Harian Matematika Bab 3',
    subject: 'Matematika',
    score: 68,
    correctAnswers: 13,
    wrongAnswers: 7,
    totalQuestions: 20,
    completedAt: '2024-12-18T10:15:00Z',
    status: 'GRADED',
    feedback: 'Perlu belajar lagi tentang persamaan linear',
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'Eko Wijaya',
    assessmentTitle: 'Ulangan Harian Matematika Bab 3',
    subject: 'Matematika',
    score: 88,
    correctAnswers: 17,
    wrongAnswers: 3,
    totalQuestions: 20,
    completedAt: '2024-12-18T10:00:00Z',
    status: 'GRADED',
  },
]

export default function AssessmentResults() {
  const [results] = useState<AssessmentResult[]>(dummyResults)
  const [selectedResult, setSelectedResult] = useState<AssessmentResult | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleViewDetail = (result: AssessmentResult) => {
    setSelectedResult(result)
    setShowDetailModal(true)
  }

  const handleGiveFeedback = (result: AssessmentResult) => {
    setSelectedResult(result)
    setFeedback(result.feedback || '')
    setShowFeedbackModal(true)
  }

  const handleSaveFeedback = () => {
    // TODO: Save feedback
    setShowFeedbackModal(false)
  }

  const columns = [
    {
      key: 'studentName',
      header: 'Siswa',
      render: (row: AssessmentResult) => (
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
      key: 'score',
      header: 'Nilai',
      render: (row: AssessmentResult) => (
        <div className="text-center">
          <p className={`text-2xl font-bold ${getScoreColor(row.score)}`}>{row.score}</p>
          <p className="text-xs text-text-secondary">Grade: {getScoreGrade(row.score)}</p>
        </div>
      ),
    },
    {
      key: 'correctAnswers',
      header: 'Benar',
      render: (row: AssessmentResult) => (
        <span className="text-success font-medium">{row.correctAnswers}</span>
      ),
    },
    {
      key: 'wrongAnswers',
      header: 'Salah',
      render: (row: AssessmentResult) => (
        <span className="text-danger font-medium">{row.wrongAnswers}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: AssessmentResult) => (
        <Badge variant={row.status === 'GRADED' ? 'success' : 'warning'}>
          {row.status === 'GRADED' ? 'Sudah Dinilai' : 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row: AssessmentResult) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleViewDetail(row)}>
            Detail
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleGiveFeedback(row)}>
            Feedback
          </Button>
        </div>
      ),
    },
  ]

  const averageScore = Math.round(
    results.reduce((sum, r) => sum + r.score, 0) / results.length
  )
  const highestScore = Math.max(...results.map((r) => r.score))
  const lowestScore = Math.min(...results.map((r) => r.score))
  const passedCount = results.filter((r) => r.score >= 70).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Hasil Assessment</h1>
        <p className="text-text-secondary mt-1">
          Ulangan Harian Matematika Bab 3
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata</p>
            <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Tertinggi</p>
            <p className="text-3xl font-bold text-success">{highestScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Terendah</p>
            <p className={`text-3xl font-bold ${getScoreColor(lowestScore)}`}>{lowestScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Lulus (≥70)</p>
            <p className="text-3xl font-bold text-primary">{passedCount}/{results.length}</p>
          </div>
        </Card>
      </div>

      {/* Score Distribution */}
      <Card>
        <h2 className="text-lg font-semibold text-text mb-4">Distribusi Nilai</h2>
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: 'A (≥90)', count: results.filter((r) => r.score >= 90).length, color: 'bg-success' },
            { label: 'B (≥80)', count: results.filter((r) => r.score >= 80 && r.score < 90).length, color: 'bg-success/70' },
            { label: 'C (≥70)', count: results.filter((r) => r.score >= 70 && r.score < 80).length, color: 'bg-warning' },
            { label: 'D (≥60)', count: results.filter((r) => r.score >= 60 && r.score < 70).length, color: 'bg-warning/70' },
            { label: 'E (<60)', count: results.filter((r) => r.score < 60).length, color: 'bg-danger' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className={`${item.color} rounded-lg p-4 mb-2`}>
                <p className="text-2xl font-bold text-white">{item.count}</p>
              </div>
              <p className="text-xs text-text-secondary">{item.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Results Table */}
      <Card padding={false}>
        <Table
          columns={columns}
          data={results}
          emptyMessage="Tidak ada hasil ditemukan"
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Detail Hasil"
      >
        {selectedResult && (
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-text-secondary">Siswa</p>
              <p className="font-medium text-text">{selectedResult.studentName}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-lg text-center">
                <p className={`text-3xl font-bold ${getScoreColor(selectedResult.score)}`}>
                  {selectedResult.score}
                </p>
                <p className="text-sm text-text-secondary">Nilai</p>
              </div>
              <div className="p-4 bg-background rounded-lg text-center">
                <p className="text-3xl font-bold text-text-secondary">
                  {getScoreGrade(selectedResult.score)}
                </p>
                <p className="text-sm text-text-secondary">Grade</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-success/5 rounded-lg text-center">
                <p className="text-xl font-bold text-success">{selectedResult.correctAnswers}</p>
                <p className="text-xs text-text-secondary">Benar</p>
              </div>
              <div className="p-3 bg-danger/5 rounded-lg text-center">
                <p className="text-xl font-bold text-danger">{selectedResult.wrongAnswers}</p>
                <p className="text-xs text-text-secondary">Salah</p>
              </div>
              <div className="p-3 bg-background rounded-lg text-center">
                <p className="text-xl font-bold text-text">{selectedResult.totalQuestions}</p>
                <p className="text-xs text-text-secondary">Total Soal</p>
              </div>
            </div>

            {selectedResult.feedback && (
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-text-secondary mb-1">Feedback</p>
                <p className="text-text">{selectedResult.feedback}</p>
              </div>
            )}

            <Button fullWidth onClick={() => setShowDetailModal(false)}>
              Tutup
            </Button>
          </div>
        )}
      </Modal>

      {/* Feedback Modal */}
      <Modal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        title="Beri Feedback"
      >
        {selectedResult && (
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-text-secondary">Siswa</p>
              <p className="font-medium text-text">{selectedResult.studentName}</p>
              <p className="text-sm text-text-secondary mt-2">Nilai</p>
              <p className={`font-medium ${getScoreColor(selectedResult.score)}`}>
                {selectedResult.score}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Feedback
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[120px]"
                placeholder="Berikan feedback untuk siswa..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowFeedbackModal(false)}>
                Batal
              </Button>
              <Button onClick={handleSaveFeedback}>Simpan Feedback</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
