interface NavbarProps {
  onLogout: () => void
  onToggleSidebar: () => void
}

export default function Navbar({ onLogout, onToggleSidebar }: NavbarProps) {

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur-sm lg:px-6">
      <button
        onClick={onToggleSidebar}
        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold text-slate-900">EduConnect</h1>
      </div>

      <div className="relative ml-auto flex items-center gap-2">
        <button
          onClick={onLogout}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Keluar
        </button>
      </div>
    </header>
  )
}
