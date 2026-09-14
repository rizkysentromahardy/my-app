import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { getScoreColor } from '../../utils/formatScore'

interface GradeItem {
  id: string
  subject: string
  title: string
  type: 'assignment' | 'assessment'
  score: number
  date: string
}

const dummyGrades: GradeItem[] = [
  {
    id: '1',
    subject: 'Matematika',
    title: 'Persamaan Linear',
    type: 'assignment',
    score: 85,
    date: '2024-12-16',
  },
  {
    id: '2',
    subject: 'Matematika',
    title: 'Ulangan Harian Bab 3',
    type: 'assessment',
    score: 82,
    date: '2024-12-18',
  },
  {
    id: '3',
    subject: 'Bahasa Inggris',
    title: 'Reading Exercise',
    type: 'assignment',
    score: 88,
    date: '2024-12-15',
  },
  {
    id: '4',
    subject: 'Bahasa Inggris',
    title: 'Quiz Grammar',
    type: 'assessment',
    score: 92,
    date: '2024-12-17',
  },
  {
    id: '5',
    subject: 'Fisika',
    title: 'Laporan Praktikum',
    type: 'assignment',
    score: 76,
    date: '2024-12-14',
  },
  {
    id: '6',
    subject: 'Fisika',
    title: 'Test Bab 1',
    type: 'assessment',
    score: 72,
    date: '2024-12-13',
  },
]

export default function ParentGrades() {
  const grades = dummyGrades

  const averageScore = Math.round(
    grades.reduce((sum, g) => sum + g.score, 0) / grades.length
  )

  const subjects = [...new Set(grades.map((g) => g.subject))]
  const subjectScores = subjects.map((subject) => {
    const subjectGrades = grades.filter((g) => g.subject === subject)
    const avg = Math.round(
      subjectGrades.reduce((sum, g) => sum + g.score, 0) / subjectGrades.length
    )
    return { subject, score: avg }
  })

  const getGrade = (score: number) => {
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'E'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Nilai Anak</h1>
        <p className="text-text-secondary mt-1">
          Lihat semua nilai tugas dan assessment anak Anda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Nilai</p>
            <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Nilai Tertinggi</p>
            <p className="text-3xl font-bold text-success">
              {Math.max(...grades.map((g) => g.score))}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Penilaian</p>
            <p className="text-3xl font-bold text-primary">{grades.length}</p>
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

      {/* Grades List */}
      <Card>
        <h2 className="text-lg font-semibold text-text mb-4">Riwayat Nilai</h2>
        <div className="space-y-3">
          {grades.map((grade) => (
            <div
              key={grade.id}
              className="flex items-center justify-between p-3 bg-background rounded-lg"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">{grade.subject}</span>
                  <Badge variant={grade.type === 'assignment' ? 'default' : 'info'}>
                    {grade.type === 'assignment' ? 'Tugas' : 'Assessment'}
                  </Badge>
                </div>
                <p className="font-medium text-text">{grade.title}</p>
                <p className="text-xs text-text-secondary">{grade.date}</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${getScoreColor(grade.score)}`}>
                  {grade.score}
                </p>
                <p className="text-xs text-text-secondary">Grade: {getGrade(grade.score)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
