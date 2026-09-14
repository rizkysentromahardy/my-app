import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const stats = [
  { label: 'Sekolah & lembaga', value: '500+' },
  { label: 'Pengajar aktif', value: '2.4k' },
  { label: 'Tugas dikerjakan', value: '18k' },
  { label: 'Peningkatan rata-rata', value: '32%' },
]

const features = [
  {
    title: 'Manajemen tugas terpadu',
    description:
      'Buat, distribusikan, dan pantau tugas dari satu dashboard agar proses belajar lebih rapi dan efisien.',
  },
  {
    title: 'Assessment yang terukur',
    description:
      'Pantau pemahaman siswa dengan evaluasi yang cepat, jelas, dan mudah dipahami oleh semua pihak.',
  },
  {
    title: 'Pantauan orang tua real-time',
    description:
      'Ciptakan komunikasi yang lebih transparan dengan laporan progres dan perkembangan siswa yang akurat.',
  },
]

const pillars = [
  'Dashboard terintegrasi untuk pengajar, siswa, dan orang tua',
  'Progress report yang mudah dibaca dan dibagikan',
  'Workflow pembelajaran yang lebih terstruktur dan konsisten',
  'Solusi yang fleksibel untuk sekolah, bimbel, dan tutor',
]

const industries = ['Sekolah', 'Bimbel', 'Private Tutor', 'Lembaga Pendidikan', 'Learning Center']

const roadmap = [
  {
    step: '01',
    title: 'Atur pembelajaran',
    text: 'Kelola kelas, tugas, dan assessment dalam satu dashboard yang konsisten untuk semua pengguna.',
  },
  {
    step: '02',
    title: 'Monitor progres',
    text: 'Lihat status pengerjaan, pengumpulan, dan evaluasi hasil belajar siswa secara real-time.',
  },
  {
    step: '03',
    title: 'Berikan insight',
    text: 'Bagikan laporan yang jelas kepada orang tua dan tim pengajar agar keputusan lebih cepat dan tepat.',
  },
]

const testimonials = [
  {
    quote:
      'EduConnect membantu kami mengurangi proses manual dan membuat komunikasi antara guru dan orang tua menjadi lebih cepat dan terarah.',
    name: 'Rina Hartono',
    role: 'Kepala Program, BrightLeap Academy',
  },
  {
    quote:
      'Kami bisa memantau tugas dan perkembangan siswa dengan lebih jelas dalam hitungan menit, bukan hari.',
    name: 'Dimas Pratama',
    role: 'Tutor Matematika',
  },
]

export default function CompanyHome() {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-sm">
              E
            </div>
            <div>
              <p className="text-lg font-semibold text-text">EduConnect</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-text-secondary md:flex">
            <a href="#about" className="transition hover:text-text">Tentang</a>
            <a href="#feature" className="transition hover:text-text">Fitur</a>
            <a href="#process" className="transition hover:text-text">Proses</a>
            <a href="#testimoni" className="transition hover:text-text">Testimoni</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_26%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                Platform pembelajaran modern
              </span>
              <h1 className="max-w-xl text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
                Menghubungkan pembelajaran dalam satu ekosistem yang lebih rapi dan transparan.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
                EduConnect membantu sekolah, lembaga pendidikan, dan pengajar independen mengelola tugas, assessment, serta perkembangan belajar siswa dengan lebih efisien.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/login">
                  <Button size="lg">Mulai sekarang</Button>
                </Link>
                <a href="#about">
                  <Button variant="outline" size="lg">
                    Pelajari lebih lanjut
                  </Button>
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-surface/80 p-4 shadow-sm">
                    <p className="text-2xl font-bold text-text">{item.value}</p>
                    <p className="mt-2 text-xs leading-5 text-text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Card
                className="w-full max-w-xl border-primary/10 bg-gradient-to-br from-white to-sky-50 p-6 shadow-xl shadow-primary/5"
                padding={false}
              >
                <div className="rounded-[28px] border border-border bg-white p-5 shadow-inner">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <p className="text-sm text-text-secondary">Overview aktivitas</p>
                      <h2 className="mt-1 text-xl font-semibold text-text">Progress learning</h2>
                    </div>
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      Aktif hari ini
                    </span>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Pengumpulan tugas</span>
                        <span className="font-semibold text-text">86%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[86%] rounded-full bg-primary" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Nilai assessment</span>
                        <span className="font-semibold text-text">92/100</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[92%] rounded-full bg-success" />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl bg-background p-3">
                        <p className="text-xs text-text-secondary">Tugas baru</p>
                        <p className="mt-2 text-xl font-bold text-text">14</p>
                      </div>
                      <div className="rounded-xl bg-background p-3">
                        <p className="text-xs text-text-secondary">Siswa hadir</p>
                        <p className="mt-2 text-xl font-bold text-text">97%</p>
                      </div>
                      <div className="rounded-xl bg-background p-3">
                        <p className="text-xs text-text-secondary">Report</p>
                        <p className="mt-2 text-xl font-bold text-text">8</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-white/60">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-text-secondary">
              Dipercaya oleh berbagai ekosistem pendidikan
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-text-secondary sm:gap-8">
              {industries.map((item) => (
                <span key={item} className="rounded-full border border-border bg-background px-4 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Tentang kami</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
                Platform untuk membuat proses belajar lebih terorganisir, lebih cepat, dan lebih transparan.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-text-secondary">
              <p>
                EduConnect hadir untuk menjembatani kebutuhan pengajar, siswa, dan wali murid dalam satu sistem yang mudah digunakan.
              </p>
              <p>
                Dari pembuatan tugas dan assessment hingga pelaporan perkembangan belajar, semua bisa diurus dalam satu tempat tanpa mengorbankan kualitas pembelajaran.
              </p>
            </div>
          </div>
        </section>

        <section id="feature" className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Fitur utama</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Semua yang dibutuhkan untuk membangun ekosistem belajar yang terarah.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-white/10 bg-white/5 text-white shadow-none" padding={true}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-lg font-bold text-sky-200">
                    ✓
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Kenapa EduConnect</p>
              <h3 className="mt-4 text-3xl font-bold text-text">Dirancang untuk kebutuhan lingkungan belajar yang dinamis.</h3>

              <div className="mt-8 space-y-4">
                {pillars.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-background p-4">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      •
                    </div>
                    <p className="text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-primary to-sky-600 p-8 text-white shadow-xl shadow-primary/20">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100">Keunggulan</p>
              <h3 className="mt-4 text-3xl font-bold">Lebih cepat, lebih jelas, dan lebih terukur.</h3>
              <ul className="mt-8 space-y-5 text-sky-50">
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                    1
                  </span>
                  Penyusunan tugas dan assessment yang lebih praktis
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                    2
                  </span>
                  Status pengerjaan siswa bisa dipantau secara real-time
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                    3
                  </span>
                  Laporan perkembangan yang siap dibagikan ke orang tua
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="process" className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Proses</p>
              <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl">
                Alur kerja yang sederhana, cepat, dan mudah diikuti.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {roadmap.map((item) => (
                <div key={item.step} className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
                  <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {item.step}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-text">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-text-secondary">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimoni" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Testimoni</p>
            <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl">
              Dipercaya oleh tim pendidikan yang bergerak cepat.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-border bg-surface shadow-sm">
                <p className="text-lg leading-8 text-text-secondary">“{testimonial.quote}”</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold text-text">{testimonial.name}</p>
                  <p className="text-sm text-text-secondary">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-[30px] bg-slate-950 px-6 py-12 text-center text-white shadow-xl shadow-slate-900/20 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Siap memulai?</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Bangun proses belajar yang lebih transparan, terukur, dan efektif.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/login">
                <Button size="lg">Masuk ke dashboard</Button>
              </Link>
              <a href="#feature">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5">
                  Lihat fitur
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
