import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { getScoreGrade, getScoreColor } from '../../utils/formatScore'

interface ResultData {
  id: string
  assessmentTitle: string
  subject: string
  type: 'assignment' | 'assessment'
  score: number
  maxScore: number
  correctAnswers?: number
  wrongAnswers?: number
  completedAt: string
  feedback?: string
}

const dummyResults: ResultData[] = [
  {
    id: '1',
    assessmentTitle: 'Ulangan Harian Matematika Bab 3',
    subject: 'Matematika',
    type: 'assessment',
    score: 82,
    maxScore: 100,
    correctAnswers: 16,
    wrongAnswers: 4,
    completedAt: '2024-12-18T10:00:00Z',
  },
  {
    id: '2',
    assessmentTitle: 'Quiz Bahasa Inggris',
    subject: 'Bahasa Inggris',
    type: 'assessment',
    score: 92,
    maxScore: 100,
    correctAnswers: 14,
    wrongAnswers: 1,
    completedAt: '2024-12-17T10:00:00Z',
  },
  {
    id: '3',
    assessmentTitle: 'Persamaan Linear',
    subject: 'Matematika',
    type: 'assignment',
    score: 85,
    maxScore: 100,
    completedAt: '2024-12-16T10:00:00Z',
    feedback: 'Bagus, tapi perlu perhatikan langkah penyelesaian di soal nomor 3',
  },
  {
    id: '4',
    assessmentTitle: 'Reading Exercise',
    subject: 'Bahasa Inggris',
    type: 'assignment',
    score: 88,
    maxScore: 100,
    completedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '5',
    assessmentTitle: 'Test Fisika Bab 1',
    subject: 'Fisika',
    type: 'assessment',
    score: 76,
    maxScore: 100,
    correctAnswers: 15,
    wrongAnswers: 5,
    completedAt: '2024-12-14T10:00:00Z',
  },
]

export default function Results() {
  const [results] = useState<ResultData[]>(dummyResults)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredResults = filterType === 'all'
    ? results
    : results.filter((r) => r.type === filterType)

  const averageScore = Math.round(
    results.reduce((sum, r) => sum + r.score, 0) / results.length
  )

  const highestScore = Math.max(...results.map((r) => r.score))
  const lowestScore = Math.min(...results.map((r) => r.score))

  const subjects = [...new Set(results.map((r) => r.subject))]
  const subjectScores = subjects.map((subject) => {
    const subjectResults = results.filter((r) => r.subject === subject)
    const avg = Math.round(
      subjectResults.reduce((sum, r) => sum + r.score, 0) / subjectResults.length
    )
    return { subject, score: avg }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Hasil</h1>
        <p className="text-text-secondary mt-1">
          Lihat hasil tugas dan assessment Anda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Nilai</p>
            <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Nilai Tertinggi</p>
            <p className="text-3xl font-bold text-success">{highestScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Nilai Terendah</p>
            <p className={`text-3xl font-bold ${getScoreColor(lowestScore)}`}>{lowestScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Penilaian</p>
            <p className="text-3xl font-bold text-primary">{results.length}</p>
          </div>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card>
        <h2 className="text-lg font-semibold text-text mb-4">Nilai per Mata Pelajaran</h2>
        <div className="space-y-3">
          {subjectScores.map((item) => (
            <div key={item.subject} className="flex items-center gap-4">
              <span className="w-32 text-sm font-medium text-text">{item.subject}</span>
              <div className="flex-1">
                <div className="w-full bg-background rounded-full h-3">
                  <div
                    className={`rounded-full h-3 ${
                      item.score >= 80 ? 'bg-success' :
                      item.score >= 60 ? 'bg-warning' : 'bg-danger'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
              <span className={`w-12 text-right font-semibold ${getScoreColor(item.score)}`}>
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Filter */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Semua' },
            { value: 'assignment', label: 'Tugas' },
            { value: 'assessment', label: 'Assessment' },
          ].map((filter) => (
            <button
              key={filter.value}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filterType === filter.value
                  ? 'bg-primary text-white'
                  : 'border border-border text-text-secondary hover:text-text'
              }`}
              onClick={() => setFilterType(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <Card key={result.id}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-primary">{result.subject}</span>
                  <Badge variant={result.type === 'assignment' ? 'default' : 'info'}>
                    {result.type === 'assignment' ? 'Tugas' : 'Assessment'}
                  </Badge>
                </div>
                <h3 className="font-semibold text-text">{result.assessmentTitle}</h3>
                {result.correctAnswers !== undefined && result.wrongAnswers !== undefined && (
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-success">Benar: {result.correctAnswers}</span>
                    <span className="text-sm text-danger">Salah: {result.wrongAnswers}</span>
                  </div>
                )}
                {result.feedback && (
                  <div className="mt-2 p-2 bg-background rounded text-sm text-text-secondary">
                    <span className="font-medium">Feedback: </span>{result.feedback}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center">
                <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}
                </div>
                <div className="text-sm text-text-secondary">
                  Grade: {getScoreGrade(result.score)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
