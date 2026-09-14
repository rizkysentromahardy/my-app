# EduConnect

Platform Monitoring Pembelajaran untuk menghubungkan Pengajar, Siswa, dan Orang Tua/Wali.

## 📋 Tentang

EduConnect adalah platform web untuk mengelola proses pembelajaran:
- **Pengajar** dapat membuat tugas, assessment, dan memantau perkembangan siswa
- **Siswa** dapat mengerjakan tugas, mengikuti assessment, dan melihat hasil
- **Orang Tua** dapat memantau perkembangan belajar anak

## 🚀 Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| Vite | Build tool |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| React Router v7 | Routing |
| Supabase | Backend (Auth, Database, Storage) |

## 📁 Struktur Folder

```
src/
├── assets/          # Gambar, icon
├── components/
│   ├── ui/          # Button, Input, Card, Badge, Modal, Table
│   ├── layout/      # Navbar, Sidebar
│   └── common/      # Loading, EmptyState, ErrorState, ProtectedRoute
├── pages/
│   ├── auth/        # Login
│   ├── teacher/     # Dashboard, Groups, Students, Assignments, dll
│   ├── student/     # Dashboard, Assignments, Assessments, Results
│   └── parent/      # Dashboard, Child, Assignments, Grades, Reports
├── layouts/         # AuthLayout, DashboardLayout
├── routes/          # AppRoutes
├── services/        # Supabase client & services
├── hooks/           # useAuth, useAssignments, useStudents, useAssessments
├── types/           # TypeScript types
├── data/            # Dummy data (development)
└── utils/           # formatDate, formatScore, constants
```

## 🛠️ Instalasi

### 1. Clone repository

```bash
git clone <repository-url>
cd my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` dengan credentials Supabase Anda:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> **Catatan**: Jika tidak menggunakan Supabase, aplikasi akan berjalan dalam mode demo.

### 4. Setup Database (Opsional - untuk Supabase)

Jalankan SQL di Supabase SQL Editor (urutkan):

1. `supabase/schema.sql` - Buat tabel
2. `supabase/rls-policies.sql` - Aktifkan security
3. `supabase/seed.sql` - Data awal

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka http://localhost:5173

## 👤 Demo Login

Tanpa Supabase, gunakan mode demo:

| Role | Email | Password |
|------|-------|----------|
| Teacher | `teacher@demo.com` | `demo123` |
| Student | `student@demo.com` | `demo123` |
| Parent | `parent@demo.com` | `demo123` |

Atau gunakan tombol quick login di halaman login.

## 📄 Routes

### Teacher
| Path | Halaman |
|------|---------|
| `/teacher` | Dashboard |
| `/teacher/groups` | Learning Groups |
| `/teacher/students` | Siswa |
| `/teacher/assignments` | Tugas |
| `/teacher/assignments/create` | Buat Tugas |
| `/teacher/submissions` | Submission |
| `/teacher/assessments` | Assessment |
| `/teacher/assessments/create` | Buat Assessment |
| `/teacher/results` | Hasil Assessment |
| `/teacher/grades` | Nilai |
| `/teacher/reports` | Report |

### Student
| Path | Halaman |
|------|---------|
| `/student` | Dashboard |
| `/student/assignments` | Tugas |
| `/student/assignments/:id` | Detail Tugas |
| `/student/assessments` | Assessment |
| `/student/results` | Hasil |

### Parent
| Path | Halaman |
|------|---------|
| `/parent` | Dashboard |
| `/parent/child` | Profil Anak |
| `/parent/assignments` | Tugas Anak |
| `/parent/assessments` | Assessment Anak |
| `/parent/grades` | Nilai Anak |
| `/parent/reports` | Report |

## 🧪 Commands

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Preview build
npm run preview
```

## 🎨 Design System

### Colors
- Primary: Blue (`#2563eb`)
- Success: Green (`#16a34a`)
- Warning: Orange (`#d97706`)
- Danger: Red (`#dc2626`)
- Info: Cyan (`#0891b2`)

### Components
- `Button` - 5 variants (primary, secondary, outline, danger, ghost)
- `Input` - Dengan label, error, helper text
- `Card` - Container dengan shadow
- `Badge` - Status indicator
- `Modal` - Dialog overlay
- `Table` - Data table dengan columns

## 📌 Catatan Pengembangan

### MVP Boundary
Fitur yang **TIDAK** termasuk MVP:
- Chat/messaging
- Video call
- AI features
- Mobile app
- Payment/billing
- Gamifikasi

### Roadmap
- **v2**: Notification, messaging
- **v3**: Learning analytics
- **v4**: AI features
- **v5**: Multi-organization, SaaS

## 📝 License

Private - Portfolio Project
