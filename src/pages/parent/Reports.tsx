import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function ParentReports() {
  const child = {
    name: 'Andi Pratama',
    averageScore: 82,
    completionRate: 73,
    progress: 'IMPROVING' as const,
  }

  const subjects = [
    { name: 'Matematika', score: 85, trend: 'up' },
    { name: 'Bahasa Inggris', score: 88, trend: 'up' },
    { name: 'Fisika', score: 76, trend: 'stable' },
  ]

  const recentActivity = [
    {
      id: '1',
      type: 'assignment',
      title: 'Persamaan Linear',
      subject: 'Matematika',
      status: 'completed',
      score: 85,
    },
    {
      id: '2',
      type: 'assessment',
      title: 'Ulangan Harian Bab 3',
      subject: 'Matematika',
      status: 'completed',
      score: 82,
    },
    {
      id: '3',
      type: 'assignment',
      title: 'Reading Exercise',
      subject: 'Bahasa Inggris',
      status: 'completed',
      score: 88,
    },
  ]

  const getProgressBadge = (progress: 'IMPROVING' | 'STABLE' | 'DECLINING') => {
    const variants = {
      IMPROVING: 'success' as const,
      STABLE: 'default' as const,
      DECLINING: 'danger' as const,
    }
    const labels = {
      IMPROVING: '↑ Meningkat',
      STABLE: '→ Stabil',
      DECLINING: '↓ Menurun',
    }
    return <Badge variant={variants[progress]}>{labels[progress]}</Badge>
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <span className="text-success">↑</span>
    if (trend === 'down') return <span className="text-danger">↓</span>
    return <span className="text-text-secondary">→</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Report Pembelajaran</h1>
        <p className="text-text-secondary mt-1">
          Laporan perkembangan belajar anak Anda
        </p>
      </div>

      {/* Child Overview */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {child.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-text">{child.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              {getProgressBadge(child.progress)}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{child.averageScore}</p>
              <p className="text-sm text-text-secondary">Rata-rata</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success">{child.completionRate}%</p>
              <p className="text-sm text-text-secondary">Completion</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Subject Performance */}
      <Card>
        <h2 className="text-lg font-semibold text-text mb-4">Performa per Mata Pelajaran</h2>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.name} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-40">
                {getTrendIcon(subject.trend)}
                <span className="font-medium text-text">{subject.name}</span>
              </div>
              <div className="flex-1">
                <div className="w-full bg-background rounded-full h-4">
                  <div
                    className={`rounded-full h-4 ${
                      subject.score >= 80 ? 'bg-success' :
                      subject.score >= 60 ? 'bg-warning' : 'bg-danger'
                    }`}
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
              <span className="w-12 text-right font-semibold text-text">{subject.score}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-lg font-semibold text-text mb-4">Assignment Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Tugas</span>
              <span className="font-medium text-text">11</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Selesai</span>
              <span className="font-medium text-success">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Pending</span>
              <span className="font-medium text-warning">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Terlambat</span>
              <span className="font-medium text-danger">1</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-text mb-4">Assessment Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Assessment</span>
              <span className="font-medium text-text">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Selesai</span>
              <span className="font-medium text-success">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Rata-rata Nilai</span>
              <span className="font-medium text-primary">79</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h2 className="text-lg font-semibold text-text mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 bg-background rounded-lg"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">{activity.subject}</span>
                  <Badge variant={activity.type === 'assignment' ? 'default' : 'info'}>
                    {activity.type === 'assignment' ? 'Tugas' : 'Assessment'}
                  </Badge>
                </div>
                <p className="font-medium text-text">{activity.title}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{activity.score}</p>
                <p className="text-xs text-text-secondary">Nilai</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
