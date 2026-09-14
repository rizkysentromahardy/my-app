import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-3 sm:p-5">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden min-h-[560px] overflow-hidden bg-slate-950 lg:block">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Students learning together"
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-sky-950/60 to-primary/50" />

            <div className="absolute inset-0 flex items-end p-8">
              <div className="max-w-sm text-white">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  Learning
                </div>
                <h2 className="text-2xl font-bold leading-snug">
                  Platform untuk proses belajar yang lebih terarah.
                </h2>
                <p className="mt-3 text-xs leading-5 text-slate-200">
                  Menghubungkan pengajar, siswa, dan orang tua dalam satu ekosistem yang lebih transparan.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
              <div className="mb-6 text-center lg:text-left">
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white shadow-sm">
                  E
                </div>
                <h1 className="text-2xl font-bold text-text">EduConnect</h1>
                <p className="mt-1 text-xs text-text-secondary">
                  Platform Monitoring Pembelajaran
                </p>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
