import { useMemo, useState } from 'react'
import Card from '../../components/ui/Card'

export default function ParentDashboard() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d')

  const stats = [
    { label: 'Selesai', value: '8', tone: 'success' },
    { label: 'Pending', value: '2', tone: 'warning' },
    { label: 'Terlambat', value: '1', tone: 'danger' },
  ]

  const performanceMap = {
    '7d': {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      values: [72, 76, 80, 86, 82, 89, 94],
      summary: 'Naik 6 poin dari minggu lalu',
    },
    '30d': {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
      values: [68, 72, 76, 81, 87],
      summary: 'Rata-rata kelas meningkat 8% bulan ini',
    },
    '90d': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'],
      values: [63, 68, 72, 79, 86],
      summary: 'Tren belajar konsisten sejak awal semester',
    },
  }

  const scores = useMemo(
    () => [
      { subject: 'Matematika', title: 'Ulangan Harian Bab 3', score: 82, change: '+8', status: 'Meningkat' },
      { subject: 'Bahasa Inggris', title: 'Quiz Reading', score: 88, change: '+5', status: 'Baik' },
      { subject: 'Fisika', title: 'Test Bab 1', score: 76, change: '-2', status: 'Perlu fokus' },
    ],
    [],
  )

  const currentTrend = performanceMap[range]

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-gradient-to-r from-emerald-50 via-white to-primary/5 p-5 shadow-sm ring-1 ring-emerald-100 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-success">Update orang tua</p>
            <h1 className="mt-1 text-2xl font-bold text-text sm:text-3xl">Perkembangan Andi cenderung positif dan stabil 👋</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 p-1">
            {(['7d', '30d', '90d'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  range === item ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item === '7d' ? '7 hari' : item === '30d' ? '30 hari' : '90 hari'}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">
          Ada 2 tugas yang masih menunggu, tetapi tren belajar anak Anda secara umum terus meningkat dan konsisten.
        </p>
      </div>

      <Card className="border border-border/80 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            A
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text">Andi Pratama</h2>
            <p className="text-text-secondary">Matematika Private</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-border/80 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            <div className="text-center">
              <p className="text-sm text-text-secondary">{stat.label}</p>
              <p
                className={`mt-2 text-3xl font-bold ${
                  stat.tone === 'success'
                    ? 'text-success'
                    : stat.tone === 'warning'
                      ? 'text-warning'
                      : 'text-danger'
                }`}
              >
                {stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-border/80 bg-white shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text">Performa belajar</h2>
              <p className="text-sm text-text-secondary">{currentTrend.summary}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              +8.5%
            </span>
          </div>

          <div className="flex h-40 items-end gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            {currentTrend.values.map((value, index) => (
              <div key={`${range}-${index}`} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[10px] font-medium text-slate-500">{value}%</span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 via-emerald-400 to-sky-400 shadow-sm"
                  style={{ height: `${value}%` }}
                />
                <span className="text-[10px] text-slate-400">{currentTrend.labels[index]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-border/80 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-text">Perkembangan belajar</h2>
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-success/20 bg-success/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-text">Meningkat</p>
              <p className="mt-1 text-sm text-text-secondary">Nilai rata-rata naik 5 poin dari bulan lalu.</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              'Meningkatkan disiplin pengerjaan tugas',
              'Porsi belajar Matematika paling kuat bulan ini',
              '1 tugas butuh perhatian khusus di Fisika',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-sm text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="border border-border/80 bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-text">Nilai terbaru</h2>
        <div className="mt-4 space-y-3">
          {scores.map((item) => (
            <div key={item.subject} className="rounded-2xl bg-background p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-text">{item.subject}</p>
                  <p className="text-sm text-text-secondary">{item.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-success">{item.score}</p>
                  <p className="text-xs font-medium text-slate-500">{item.change} {item.status}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{item.status}</span>
                  <span>{item.score}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${
                      item.score >= 85 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : item.score >= 75 ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-rose-500 to-red-400'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
