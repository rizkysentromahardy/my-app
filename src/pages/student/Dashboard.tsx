import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { dummyAssignments } from '../../data/assignments'
import { formatRelativeDate } from '../../utils/formatDate'

export default function StudentDashboard() {
  const [range, setRange] = useState<'week' | 'month'>('week')
  const activeAssignments = dummyAssignments.slice(0, 2)

  const stats = [
    { label: 'Tugas aktif', value: '3', tone: 'warning', detail: 'Perlu dikerjakan' },
    { label: 'Nilai rata-rata', value: '88', tone: 'success', detail: 'Tinggi' },
    { label: 'Assessment', value: '2', tone: 'primary', detail: 'Bulan ini' },
  ]

  const trendData = {
    week: {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'],
      values: [68, 70, 78, 82, 89],
      summary: 'Konsisten naik 6 poin dari Senin',
    },
    month: {
      labels: ['W1', 'W2', 'W3', 'W4'],
      values: [62, 73, 81, 88],
      summary: 'Performa anda naik 26% dibanding bulan lalu',
    },
  }

  const results = [
    { subject: 'Matematika', title: 'Ulangan Harian Bab 2', score: 85 },
    { subject: 'Bahasa Inggris', title: 'Quiz Grammar', score: 92 },
    { subject: 'IPA', title: 'Praktikum Lab', score: 80 },
  ]

  const currentTrend = trendData[range]

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-gradient-to-r from-sky-50 via-white to-primary/5 p-5 shadow-sm ring-1 ring-sky-100 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Hai Andi</p>
            <h1 className="mt-1 text-2xl font-bold text-text sm:text-3xl">Hari ini kamu punya beberapa tugas yang siap dikerjakan ✨</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 p-1">
            {(['week', 'month'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  range === item ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item === 'week' ? 'Minggu ini' : 'Bulan ini'}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
          Tetap konsisten dan fokus. Kamu sudah melewati banyak progres, dan beberapa tugas hari ini tinggal diselesaikan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-border/80 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-text">{stat.value}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  stat.tone === 'warning'
                    ? 'bg-warning/10 text-warning'
                    : stat.tone === 'success'
                      ? 'bg-success/10 text-success'
                      : 'bg-primary/10 text-primary'
                }`}
              >
                {stat.detail}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Tugas hari ini</h2>
            <span className="text-sm font-medium text-sky-600">{currentTrend.summary}</span>
          </div>

          <div className="space-y-4">
            {activeAssignments.map((assignment) => (
              <Card key={assignment.id} className="border border-border/80 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{assignment.subject}</p>
                    <h3 className="mt-1 font-semibold text-text">{assignment.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary">Deadline: {formatRelativeDate(assignment.deadline)}</p>
                  </div>
                  <Badge variant="warning">Belum dikumpulkan</Badge>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="w-full max-w-xs">
                    <div className="mb-2 flex justify-between text-[11px] text-text-secondary">
                      <span>Progress</span>
                      <span>68%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-primary to-sky-400" />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="ml-3 shrink-0">
                    Buka tugas
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border border-border/80 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-text">Perkembangan</h2>
          <div className="mt-5 flex h-36 items-end gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            {currentTrend.values.map((value, index) => (
              <div key={`${range}-${index}`} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[10px] font-medium text-slate-500">{value}%</span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-sky-500 via-blue-400 to-cyan-300"
                  style={{ height: `${value}%` }}
                />
                <span className="text-[10px] text-slate-400">{currentTrend.labels[index]}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {results.map((item) => (
              <div key={item.subject} className="rounded-2xl bg-background p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-text">{item.subject}</p>
                    <p className="text-sm text-text-secondary">{item.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">{item.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
