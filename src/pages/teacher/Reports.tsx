import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

interface StudentReport {
  studentId: string
  studentName: string
  totalAssignments: number
  completedAssignments: number
  pendingAssignments: number
  lateAssignments: number
  averageScore: number
  progress: 'IMPROVING' | 'STABLE' | 'DECLINING'
  subjects: {
    name: string
    score: number
  }[]
}

const dummyReports: StudentReport[] = [
  {
    studentId: '1',
    studentName: 'Andi Pratama',
    totalAssignments: 11,
    completedAssignments: 8,
    pendingAssignments: 2,
    lateAssignments: 1,
    averageScore: 82,
    progress: 'IMPROVING',
    subjects: [
      { name: 'Matematika', score: 85 },
      { name: 'Bahasa Inggris', score: 80 },
      { name: 'Fisika', score: 78 },
    ],
  },
  {
    studentId: '2',
    studentName: 'Budi Santoso',
    totalAssignments: 11,
    completedAssignments: 9,
    pendingAssignments: 1,
    lateAssignments: 1,
    averageScore: 75,
    progress: 'STABLE',
    subjects: [
      { name: 'Matematika', score: 78 },
      { name: 'Bahasa Inggris', score: 72 },
      { name: 'Fisika', score: 75 },
    ],
  },
  {
    studentId: '3',
    studentName: 'Citra Dewi',
    totalAssignments: 11,
    completedAssignments: 10,
    pendingAssignments: 1,
    lateAssignments: 0,
    averageScore: 90,
    progress: 'IMPROVING',
    subjects: [
      { name: 'Matematika', score: 88 },
      { name: 'Bahasa Inggris', score: 92 },
      { name: 'Fisika', score: 85 },
    ],
  },
  {
    studentId: '4',
    studentName: 'Diana Putri',
    totalAssignments: 11,
    completedAssignments: 7,
    pendingAssignments: 3,
    lateAssignments: 1,
    averageScore: 78,
    progress: 'DECLINING',
    subjects: [
      { name: 'Matematika', score: 75 },
      { name: 'Bahasa Inggris', score: 80 },
      { name: 'Fisika', score: 72 },
    ],
  },
  {
    studentId: '5',
    studentName: 'Eko Wijaya',
    totalAssignments: 11,
    completedAssignments: 9,
    pendingAssignments: 2,
    lateAssignments: 0,
    averageScore: 80,
    progress: 'STABLE',
    subjects: [
      { name: 'Matematika', score: 82 },
      { name: 'Bahasa Inggris', score: 78 },
      { name: 'Fisika', score: 80 },
    ],
  },
]

export default function Reports() {
  const getProgressBadge = (progress: StudentReport['progress']) => {
    const variants = {
      IMPROVING: 'success' as const,
      STABLE: 'default' as const,
      DECLINING: 'danger' as const,
    }
    const labels = {
      IMPROVING: 'Meningkat',
      STABLE: 'Stabil',
      DECLINING: 'Menurun',
    }
    return <Badge variant={variants[progress]}>{labels[progress]}</Badge>
  }

  const completionRate = (report: StudentReport) => {
    return Math.round((report.completedAssignments / report.totalAssignments) * 100)
  }

  const overallStats = {
    totalStudents: dummyReports.length,
    averageScore: Math.round(
      dummyReports.reduce((sum, r) => sum + r.averageScore, 0) / dummyReports.length
    ),
    improving: dummyReports.filter((r) => r.progress === 'IMPROVING').length,
    declining: dummyReports.filter((r) => r.progress === 'DECLINING').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Report</h1>
        <p className="text-text-secondary mt-1">
          Laporan perkembangan belajar siswa
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Siswa</p>
            <p className="text-3xl font-bold text-primary mt-1">{overallStats.totalStudents}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Nilai</p>
            <p className="text-3xl font-bold text-success mt-1">{overallStats.averageScore}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Meningkat</p>
            <p className="text-3xl font-bold text-success mt-1">{overallStats.improving}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Perlu Perhatian</p>
            <p className="text-3xl font-bold text-danger mt-1">{overallStats.declining}</p>
          </div>
        </Card>
      </div>

      {/* Student Reports */}
      <div className="space-y-4">
        {dummyReports.map((report) => (
          <Card key={report.studentId}>
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Student Info */}
              <div className="flex items-center gap-4 lg:w-64">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {report.studentName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-text">{report.studentName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getProgressBadge(report.progress)}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-text-secondary">Completion</p>
                  <p className="text-xl font-bold text-text">{completionRate(report)}%</p>
                  <div className="w-full bg-background rounded-full h-2 mt-1">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${completionRate(report)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Rata-rata</p>
                  <p className="text-xl font-bold text-text">{report.averageScore}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Selesai</p>
                  <p className="text-xl font-bold text-success">{report.completedAssignments}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Pending</p>
                  <p className="text-xl font-bold text-warning">{report.pendingAssignments}</p>
                </div>
              </div>

              {/* Subject Scores */}
              <div className="lg:w-64">
                <p className="text-sm text-text-secondary mb-2">Nilai per Mata Pelajaran</p>
                <div className="space-y-2">
                  {report.subjects.map((subject) => (
                    <div key={subject.name} className="flex items-center justify-between">
                      <span className="text-sm text-text">{subject.name}</span>
                      <span className={`text-sm font-semibold ${
                        subject.score >= 80 ? 'text-success' :
                        subject.score >= 60 ? 'text-warning' : 'text-danger'
                      }`}>
                        {subject.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
