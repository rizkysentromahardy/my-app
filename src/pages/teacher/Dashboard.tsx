import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { dummyAssignments } from '../../data/assignments'
import { dummyStudents } from '../../data/students'

export default function TeacherDashboard() {
  const [range, setRange] = useState<'week' | 'month'>('week')
  const activeAssignments = dummyAssignments.slice(0, 3)
  const totalStudents = dummyStudents.length
  const totalGroups = 3

  const stats = [
    { label: 'Learning Group', value: totalGroups, tone: 'primary', detail: 'Aktif' },
    { label: 'Siswa', value: totalStudents, tone: 'info', detail: 'Terdaftar' },
    { label: 'Tugas Aktif', value: activeAssignments.length, tone: 'warning', detail: 'Butuh review' },
    { label: 'Assessment', value: '2', tone: 'success', detail: 'Sedang berjalan' },
  ]

  const performanceMap = {
    week: {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
      values: [68, 72, 74, 81, 86, 91],
      summary: 'Kehadiran kelas naik 7% pada minggu ini',
    },
    month: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
      values: [62, 70, 76, 83, 89],
      summary: 'Rata-rata capaian kelas meningkat cukup stabil',
    },
  }

  const performance = [
    { label: 'Matematika', value: 82, tone: 'from-blue-500 to-cyan-400', tag: 'Naik 6%' },
    { label: 'IPA', value: 76, tone: 'from-emerald-500 to-teal-400', tag: 'Stabil' },
    { label: 'Bahasa', value: 89, tone: 'from-violet-500 to-purple-400', tag: 'Tertinggi' },
    { label: 'Seni', value: 91, tone: 'from-amber-500 to-orange-400', tag: 'Kreatif' },
  ]

  const insightCards = [
    { label: 'Kehadiran', value: '96%', trend: '+4%' },
    { label: 'Tugas terkumpul', value: '87%', trend: '+9%' },
    { label: 'Nilai rata-rata', value: '84', trend: '+3' },
  ]

  const currentTrend = performanceMap[range]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-[28px] bg-gradient-to-r from-primary/8 via-sky-50 to-white p-5 shadow-sm ring-1 ring-primary/10 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Selamat pagi</p>
            <h1 className="mt-1 text-2xl font-bold text-text sm:text-3xl">
              Sinta, aktivitas hari ini terlihat bagus 👋
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-success/20 bg-success/10 p-1 text-xs font-medium text-success">
            <span className="rounded-full bg-white px-2 py-1">92% engagement</span>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-text-secondary">
          Ada 4 tugas yang perlu ditinjau dan 2 assessment sedang berlangsung. Fokus hari ini tetap pada progres siswa dan review tugas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-border/80 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-text-secondary">{stat.label}</p>
                <p className="mt-3 text-3xl font-bold text-text">{stat.value}</p>
              </div>
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  stat.tone === 'primary'
                    ? 'bg-primary/10 text-primary'
                    : stat.tone === 'info'
                      ? 'bg-info/10 text-info'
                      : stat.tone === 'warning'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-success/10 text-success'
                }`}
              >
                {stat.detail}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="border border-border/80 bg-white shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text">Tugas terbaru</h2>
              <p className="text-sm text-text-secondary">Monitoring progres pengumpulan siswa</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
              Lihat semua
            </Button>
          </div>

          <div className="space-y-4">
            {activeAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{assignment.subject}</p>
                    <p className="mt-1 font-semibold text-text">{assignment.title}</p>
                  </div>
                  <Badge variant="warning">28 / 32 dikumpulkan</Badge>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-text-secondary">
                    <span>Progress</span>
                    <span>87%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-primary to-sky-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-border/80 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text">Performa kelas</h2>
              <p className="text-sm text-text-secondary">{currentTrend.summary}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
              {(['week', 'month'] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                    range === item ? 'bg-primary text-white' : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  {item === 'week' ? 'Minggu' : 'Bulan'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {insightCards.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <span className="text-2xl font-bold text-slate-900">{item.value}</span>
                  <span className="text-xs font-semibold text-success">{item.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex h-36 items-end gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            {currentTrend.values.map((value, index) => (
              <div key={`${range}-${index}`} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[10px] font-medium text-slate-500">{value}%</span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-primary via-blue-500 to-sky-400 shadow-sm"
                  style={{ height: `${value}%` }}
                />
                <span className="text-[10px] text-slate-400">{currentTrend.labels[index]}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            {performance.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text">{item.label}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      {item.tag}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900">{item.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-border/80 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-text">Perlu perhatian</h2>
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-warning/25 bg-warning/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10 text-warning">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-text">4 siswa belum mengumpulkan tugas</p>
              <p className="mt-1 text-sm text-text-secondary">Persamaan Linear — deadline besok</p>
            </div>
          </div>
        </Card>

        <Card className="border border-border/80 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-text">Agenda hari ini</h2>
          <div className="mt-4 space-y-3">
            {[
              '09.30 — Review tugas Matematika',
              '11.00 — Feedback assessment IPA',
              '14.00 — Konsultasi orang tua',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-background p-3 text-sm text-text-secondary">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
