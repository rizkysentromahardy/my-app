import { NavLink } from 'react-router-dom'
import type { UserRole } from '../../types/user'

interface SidebarProps {
  role: UserRole
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  label: string
  path: string
  icon: string
}

const teacherNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/teacher', icon: 'dashboard' },
  { label: 'Learning Group', path: '/teacher/groups', icon: 'group' },
  { label: 'Siswa', path: '/teacher/students', icon: 'people' },
  { label: 'Tugas', path: '/teacher/assignments', icon: 'assignment' },
  { label: 'Assessment', path: '/teacher/assessments', icon: 'quiz' },
  { label: 'Nilai', path: '/teacher/grades', icon: 'grade' },
  { label: 'Report', path: '/teacher/reports', icon: 'report' },
]

const studentNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/student', icon: 'dashboard' },
  { label: 'Tugas', path: '/student/assignments', icon: 'assignment' },
  { label: 'Assessment', path: '/student/assessments', icon: 'quiz' },
  { label: 'Hasil', path: '/student/results', icon: 'grade' },
]

const parentNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/parent', icon: 'dashboard' },
  { label: 'Anak', path: '/parent/child', icon: 'child' },
  { label: 'Tugas', path: '/parent/assignments', icon: 'assignment' },
  { label: 'Assessment', path: '/parent/assessments', icon: 'quiz' },
  { label: 'Nilai', path: '/parent/grades', icon: 'grade' },
  { label: 'Report', path: '/parent/reports', icon: 'report' },
]

const getNavItems = (role: UserRole): NavItem[] => {
  switch (role) {
    case 'TEACHER':
      return teacherNavItems
    case 'STUDENT':
      return studentNavItems
    case 'PARENT':
      return parentNavItems
    default:
      return []
  }
}

const getIcon = (icon: string) => {
  const icons: Record<string, React.ReactNode> = {
    dashboard: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    group: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    people: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    assignment: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    quiz: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    grade: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    report: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    child: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
  return icons[icon] || icons.dashboard
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const navItems = getNavItems(role)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/45 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40 h-full w-72 bg-slate-950 text-white shadow-2xl ring-1 ring-white/10
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:z-auto lg:h-screen lg:w-72
        `}
      >
        <div className="flex h-full flex-col overflow-hidden">
          <div className="border-b border-white/10 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-400 text-sm font-bold text-white shadow-lg shadow-primary/30">
                E
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Platform
                </p>
                <h1 className="text-xl font-bold text-white">EduConnect</h1>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-5">
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Menu
            </p>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/teacher' || item.path === '/student' || item.path === '/parent'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-sky-500 text-white shadow-lg shadow-primary/20'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-colors group-hover:bg-white/10 group-hover:text-white">
                    {getIcon(item.icon)}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-sky-500/10 p-3 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Summary
              </p>
              <p className="mt-2 text-sm text-slate-100">Kegiatan hari ini</p>
              <p className="mt-1 text-xl font-bold text-white">8 updates</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
