import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import { getScoreGrade, getScoreColor } from '../../utils/formatScore'

interface GradeData {
  studentId: string
  studentName: string
  subject: string
  assignmentTitle: string
  assignmentType: 'assignment' | 'assessment'
  score: number
  gradedAt: string
}

const dummyGrades: GradeData[] = [
  {
    studentId: '1',
    studentName: 'Andi Pratama',
    subject: 'Matematika',
    assignmentTitle: 'Persamaan Linear',
    assignmentType: 'assignment',
    score: 85,
    gradedAt: '2024-12-16T10:00:00Z',
  },
  {
    studentId: '1',
    studentName: 'Andi Pratama',
    subject: 'Matematika',
    assignmentTitle: 'Ulangan Harian Bab 3',
    assignmentType: 'assessment',
    score: 82,
    gradedAt: '2024-12-18T10:00:00Z',
  },
  {
    studentId: '2',
    studentName: 'Budi Santoso',
    subject: 'Matematika',
    assignmentTitle: 'Persamaan Linear',
    assignmentType: 'assignment',
    score: 78,
    gradedAt: '2024-12-16T10:00:00Z',
  },
  {
    studentId: '3',
    studentName: 'Citra Dewi',
    subject: 'Bahasa Inggris',
    assignmentTitle: 'Reading Exercise',
    assignmentType: 'assignment',
    score: 92,
    gradedAt: '2024-12-15T10:00:00Z',
  },
  {
    studentId: '3',
    studentName: 'Citra Dewi',
    subject: 'Bahasa Inggris',
    assignmentTitle: 'Quiz Grammar',
    assignmentType: 'assessment',
    score: 88,
    gradedAt: '2024-12-17T10:00:00Z',
  },
  {
    studentId: '4',
    studentName: 'Diana Putri',
    subject: 'Matematika',
    assignmentTitle: 'Persamaan Linear',
    assignmentType: 'assignment',
    score: 90,
    gradedAt: '2024-12-16T10:00:00Z',
  },
  {
    studentId: '5',
    studentName: 'Eko Wijaya',
    subject: 'Fisika',
    assignmentTitle: 'Laporan Praktikum',
    assignmentType: 'assignment',
    score: 75,
    gradedAt: '2024-12-16T10:00:00Z',
  },
]

export default function Grades() {
  const [grades] = useState<GradeData[]>(dummyGrades)
  const [filterSubject, setFilterSubject] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  const filteredGrades = grades.filter((grade) => {
    if (filterSubject !== 'all' && grade.subject !== filterSubject) return false
    if (filterType !== 'all' && grade.assignmentType !== filterType) return false
    return true
  })

  const subjects = [...new Set(grades.map((g) => g.subject))]

  const columns = [
    {
      key: 'studentName',
      header: 'Siswa',
      render: (row: GradeData) => (
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
      key: 'subject',
      header: 'Mata Pelajaran',
      render: (row: GradeData) => (
        <span className="text-sm text-primary">{row.subject}</span>
      ),
    },
    {
      key: 'assignmentTitle',
      header: 'Tugas/Ujian',
      render: (row: GradeData) => (
        <div>
          <p className="font-medium text-text">{row.assignmentTitle}</p>
          <Badge variant={row.assignmentType === 'assignment' ? 'default' : 'info'}>
            {row.assignmentType === 'assignment' ? 'Tugas' : 'Assessment'}
          </Badge>
        </div>
      ),
    },
    {
      key: 'score',
      header: 'Nilai',
      render: (row: GradeData) => (
        <div className="text-center">
          <p className={`text-2xl font-bold ${getScoreColor(row.score)}`}>
            {row.score}
          </p>
          <p className="text-xs text-text-secondary">Grade: {getScoreGrade(row.score)}</p>
        </div>
      ),
    },
  ]

  const averageScore = grades.length > 0
    ? Math.round(grades.reduce((sum, g) => sum + g.score, 0) / grades.length)
    : 0

  const highestScore = grades.length > 0
    ? Math.max(...grades.map((g) => g.score))
    : 0

  const lowestScore = grades.length > 0
    ? Math.min(...grades.map((g) => g.score))
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Nilai</h1>
        <p className="text-text-secondary mt-1">
          Lihat semua nilai tugas dan assessment siswa
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Nilai</p>
            <p className="text-3xl font-bold text-primary mt-1">{averageScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Nilai Tertinggi</p>
            <p className="text-3xl font-bold text-success mt-1">{highestScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Nilai Terendah</p>
            <p className="text-3xl font-bold text-warning mt-1">{lowestScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Penilaian</p>
            <p className="text-3xl font-bold text-info mt-1">{grades.length}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-2">
          <select
            className="px-3 py-2 border border-border rounded-lg text-sm"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="all">Semua Mata Pelajaran</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border border-border rounded-lg text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Semua Tipe</option>
            <option value="assignment">Tugas</option>
            <option value="assessment">Assessment</option>
          </select>
        </div>
      </Card>

      {/* Grades Table */}
      <Card padding={false}>
        <Table
          columns={columns}
          data={filteredGrades}
          emptyMessage="Tidak ada nilai ditemukan"
        />
      </Card>
    </div>
  )
}
