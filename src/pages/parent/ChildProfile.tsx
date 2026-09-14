import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function ChildProfile() {
  const child = {
    name: 'Andi Pratama',
    studentId: 'STU001',
    learningGroups: ['Matematika Private', 'X IPA 1'],
    email: 'andi@educonnect.com',
  }

  const stats = {
    totalAssignments: 11,
    completedAssignments: 8,
    pendingAssignments: 2,
    lateAssignments: 1,
    averageScore: 82,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Profil Anak</h1>
        <p className="text-text-secondary mt-1">
          Informasi detail tentang anak Anda
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">A</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-text">{child.name}</h2>
            <p className="text-text-secondary">NIS: {child.studentId}</p>
            <p className="text-text-secondary">Email: {child.email}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {child.learningGroups.map((group) => (
                <Badge key={group} variant="info">{group}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Total Tugas</p>
            <p className="text-3xl font-bold text-primary">{stats.totalAssignments}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Selesai</p>
            <p className="text-3xl font-bold text-success">{stats.completedAssignments}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Pending</p>
            <p className="text-3xl font-bold text-warning">{stats.pendingAssignments}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-text-secondary">Rata-rata Nilai</p>
            <p className="text-3xl font-bold text-success">{stats.averageScore}</p>
          </div>
        </Card>
      </div>

      {/* Assignment Completion */}
      <Card>
        <h2 className="text-lg font-semibold text-text mb-4">Completion Rate</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Tugas Selesai</span>
            <span className="font-medium text-text">
              {stats.completedAssignments} / {stats.totalAssignments}
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-4">
            <div
              className="bg-primary rounded-full h-4"
              style={{ width: `${(stats.completedAssignments / stats.totalAssignments) * 100}%` }}
            />
          </div>
          <p className="text-right text-sm text-text-secondary">
            {Math.round((stats.completedAssignments / stats.totalAssignments) * 100)}%
          </p>
        </div>
      </Card>

      {/* Subject Performance */}
      <Card>
        <h2 className="text-lg font-semibold text-text mb-4">Nilai per Mata Pelajaran</h2>
        <div className="space-y-3">
          {[
            { subject: 'Matematika', score: 85 },
            { subject: 'Bahasa Inggris', score: 80 },
            { subject: 'Fisika', score: 78 },
          ].map((item) => (
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
              <span className="w-12 text-right font-semibold text-text">{item.score}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
