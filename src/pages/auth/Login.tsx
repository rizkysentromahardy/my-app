import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'
import { supabase } from '../../services/supabase'
import type { UserRole } from '../../types/user'

interface LoginProps {
  onLogin: (role: UserRole) => void
}

const ssoProviders = [
  {
    name: 'Google',
    role: 'TEACHER' as UserRole,
    accent: 'bg-white text-slate-800 border-border hover:bg-slate-50 hover:text-slate-900',
    logo: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.8-2.7-5.8-6s2.6-6 5.8-6c1.8 0 3.1.8 3.8 1.4l2.6-2.5C16.8 3.2 14.7 2.4 12 2.4 6.9 2.4 2.7 6.5 2.7 11.6S6.9 20.8 12 20.8c6.9 0 11.3-4.9 11.3-11.8 0-.8-.1-1.5-.2-2.2H12Z"
        />
        <path fill="#34A853" d="M3.6 7.2 6.7 8.8A5.8 5.8 0 0 1 12 5.8c1.8 0 3.1.8 3.8 1.4l2.6-2.5C16.8 3.2 14.7 2.4 12 2.4A9.6 9.6 0 0 0 3.6 7.2Z" />
        <path fill="#FBBC05" d="M3.7 16.2A9.6 9.6 0 0 0 12 20.8c2.7 0 5-.9 6.7-2.5l-3.1-2.6c-.9.6-2 1-3.6 1-2.8 0-4.9-1.8-5.4-4.2L3.7 16.2Z" />
        <path fill="#4285F4" d="M12 15.8c1.6 0 2.9-.5 3.8-1.1l3.1 2.6c-1.8 1.8-4.8 3-6.9 3-5.1 0-9.3-4.1-9.3-9.2 0-1.5.4-3 .9-4.3L6.6 8.9A5.8 5.8 0 0 1 6.1 11.6c0 2.4 1.8 4.2 5.4 4.2Z" />
      </svg>
    ),
  },
  {
    name: 'Microsoft',
    role: 'STUDENT' as UserRole,
    accent: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 hover:text-sky-800',
    logo: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="2" y="2" width="9" height="9" rx="1.6" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" rx="1.6" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" rx="1.6" fill="#00A4EF" />
        <rect x="13" y="13" width="9" height="9" rx="1.6" fill="#FFB900" />
      </svg>
    ),
  },
  {
    name: 'Apple',
    role: 'PARENT' as UserRole,
    accent: 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 hover:text-white',
    logo: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
        <path d="M15.7 12.6c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9 1-3.7 2.4-1.6 2.8-.4 6.8 1.1 9 .7 1.1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.2.8-1.3 1.2-2.6 1.2-2.7-.1 0-2.3-.9-3.8-2.4ZM14.6 5.4c.6-.7 1-1.7.9-2.7-.9.1-2 .6-2.7 1.3-.6.7-1.1 1.7-1 2.7.9.1 2-.5 2.8-1.3Z" />
      </svg>
    ),
  },
]

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSupabaseConfigured] = useState(
    !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY
  )
  const navigate = useNavigate()

  const handleDemoLogin = async (role: UserRole) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onLogin(role)
    navigate(`/${role.toLowerCase()}`)
    setLoading(false)
  }

  const handleSSOLogin = async (role: UserRole) => {
    setError('')
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onLogin(role)
    navigate(`/${role.toLowerCase()}`)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSupabaseConfigured) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (authError) throw authError

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profileError) throw profileError

        const role = profile.role as UserRole
        onLogin(role)
        navigate(`/${role.toLowerCase()}`)
      } else {
        if (email.includes('teacher')) {
          await handleDemoLogin('TEACHER')
        } else if (email.includes('student')) {
          await handleDemoLogin('STUDENT')
        } else if (email.includes('parent')) {
          await handleDemoLogin('PARENT')
        } else {
          await handleDemoLogin('TEACHER')
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat login'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-[22px] border border-border/80 bg-white shadow-none">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center lg:text-left">
          <p className="text-sm font-medium text-primary">Selamat datang</p>
          <h2 className="mt-1 text-2xl font-bold text-text">Masuk</h2>
        </div>

        {error && (
          <div className="rounded-xl border border-danger/20 bg-danger/5 p-2.5">
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}

        <div className="space-y-2.5">
          {ssoProviders.map((provider) => (
            <Button
              key={provider.name}
              type="button"
              variant="outline"
              fullWidth
              className={`${provider.accent} justify-between border px-3 py-2.5 font-medium`}
              onClick={() => handleSSOLogin(provider.role)}
              disabled={loading}
            >
              <span className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-current/10 text-[10px] font-bold">
                  {provider.logo}
                </span>
                {provider.name}
              </span>
              <span className="text-[10px] uppercase tracking-wide opacity-80">SSO</span>
            </Button>
          ))}
        </div>

        <div className="relative flex items-center justify-center pt-1">
          <div className="h-px w-full bg-border" />
          <span className="absolute bg-white px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
            atau
          </span>
        </div>

        <div className="space-y-3">
          <Input
            label="Email"
            type="email"
            placeholder="teacher@educonnect.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Masuk dengan email
        </Button>

        {!isSupabaseConfigured && (
          <div className="space-y-2.5 rounded-2xl bg-background p-3">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
              Demo mode
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setEmail('teacher@demo.com')
                  setPassword('demo123')
                }}
              >
                Teacher
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setEmail('student@demo.com')
                  setPassword('demo123')
                }}
              >
                Student
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setEmail('parent@demo.com')
                  setPassword('demo123')
                }}
              >
                Parent
              </Button>
            </div>
          </div>
        )}

        {isSupabaseConfigured && (
          <p className="text-center text-xs text-text-secondary">Terhubung ke Supabase</p>
        )}
      </form>
    </Card>
  )
}
