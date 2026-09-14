# PROJECT CONTEXT
# PLATFORM MONITORING PEMBELAJARAN

---

## 1. STATUS DOKUMEN

Dokumen ini adalah **source of truth utama** untuk AI Coding Assistant dalam project ini.

AI WAJIB membaca dan memahami dokumen ini sebelum melakukan perubahan pada project.

Dokumen ini menentukan:

- tujuan aplikasi
- target pengguna
- scope MVP
- role pengguna
- fitur
- user flow
- arsitektur
- struktur folder
- database
- aturan coding
- batasan project
- roadmap pengembangan

Jika instruksi user bertentangan dengan dokumen ini, AI harus:

1. Mengidentifikasi konflik.
2. Menjelaskan konflik secara singkat.
3. Tidak mengambil keputusan sendiri untuk perubahan arsitektur besar.
4. Meminta konfirmasi user jika perubahan tersebut berdampak pada scope atau architecture.

---

# 2. NAMA PROJECT

Nama sementara:

**EduConnect**

Nama dapat berubah di masa depan.

Nama ini hanya placeholder dan jangan menganggapnya sebagai nama produk final.

---

# 3. KONSEP PRODUK

EduConnect adalah platform web untuk **menghubungkan Pengajar, Siswa, dan Orang Tua/Wali dalam proses pembelajaran**.

Platform tidak hanya ditujukan untuk sekolah formal.

Platform harus dapat digunakan untuk:

- sekolah
- private lesson
- tutor pribadi
- bimbingan belajar
- lembaga pendidikan
- kelompok belajar
- pengajar independen

Fokus utama platform:

> Membantu pengajar memberikan tugas dan assessment, mengelola hasil belajar, serta membantu orang tua/wali memantau perkembangan belajar siswa.

---

# 4. MASALAH YANG INGIN DISELESAIKAN

Masalah utama:

### Pengajar

- Pengumpulan tugas masih menggunakan Google Form atau media lain.
- Sulit mengetahui siswa yang sudah/belum mengumpulkan.
- Data tugas dan nilai tidak terintegrasi.
- Membutuhkan cara sederhana untuk membuat assessment.
- Membutuhkan report perkembangan siswa.

### Siswa

- Tugas tersebar di berbagai platform.
- Tidak selalu mengetahui tugas yang belum selesai.
- Pengumpulan tugas tidak terorganisir.

### Orang Tua/Wali

- Sulit mengetahui tugas anak.
- Sulit mengetahui tugas yang belum dikumpulkan.
- Sulit mengetahui hasil assessment.
- Sulit mengetahui perkembangan pembelajaran anak.

---

# 5. SOLUSI PRODUK

EduConnect menyediakan satu platform untuk:

```text
Pengajar
   ↓
Membuat tugas
   ↓
Siswa mengerjakan
   ↓
Siswa mengumpulkan
   ↓
Pengajar memeriksa
   ↓
Nilai
   ↓
Report
   ↓
Orang Tua/Wali memantau
```

Tujuan utama:

**Mengurangi proses manual dan memusatkan informasi pembelajaran dalam satu platform.**

---

# 6. TARGET USER

Platform memiliki target pengguna:

## 6.1 Pengajar

Contoh:

- Guru sekolah
- Guru les
- Private tutor
- Pengajar bimbel
- Mentor
- Pengajar independen

Dalam sistem, gunakan istilah:

**Teacher / Instructor / Tutor / Pengajar**

Untuk MVP gunakan istilah umum:

**Pengajar**

---

## 6.2 Siswa

Siswa adalah peserta pembelajaran.

Siswa dapat:

- melihat tugas
- mengerjakan tugas
- mengumpulkan tugas
- mengikuti assessment
- melihat hasil yang diperbolehkan

---

## 6.3 Orang Tua / Wali

Orang tua/wali dapat:

- melihat anak
- melihat tugas anak
- melihat status tugas
- melihat nilai
- melihat hasil assessment
- melihat report perkembangan

Gunakan istilah:

**Parent / Guardian**

---

# 7. KONSEP ORGANISASI

Platform harus dirancang agar dapat digunakan dalam berbagai konteks.

Contoh organisasi:

```text
Organization
│
├── Sekolah ABC
├── Bimbel XYZ
├── Private Tutor
└── Learning Center
```

Namun organisasi bukan fokus utama MVP.

Konsep ini disiapkan agar aplikasi dapat dikembangkan menjadi SaaS di masa depan.

---

# 8. KONSEP LEARNING GROUP

Gunakan istilah:

**Learning Group**

bukan hanya `Class`.

Learning Group dapat berupa:

```text
X IPA 1
```

atau:

```text
Les Matematika Andi
```

atau:

```text
Kelompok Belajar Bahasa Inggris
```

atau:

```text
Private Physics - Andi & Budi
```

Dengan konsep ini, satu sistem dapat digunakan sekolah maupun private lesson.

---

# 9. ROLE MVP

MVP memiliki tiga role utama:

```text
TEACHER
STUDENT
PARENT
```

## Teacher

Memiliki akses untuk:

- Dashboard
- Learning Group
- Student
- Assignment
- Submission
- Assessment
- Question
- Result
- Grade
- Report

## Student

Memiliki akses untuk:

- Dashboard
- Assignment
- Submission
- Assessment
- Result

## Parent

Memiliki akses untuk:

- Dashboard
- Child
- Assignment
- Assessment
- Grade
- Report

---

# 10. DASHBOARD PENGAJAR

Dashboard pengajar berfokus pada monitoring aktivitas pembelajaran.

Informasi utama:

- jumlah learning group
- jumlah siswa
- tugas aktif
- tugas yang belum dikumpulkan
- assessment aktif
- hasil assessment
- siswa yang perlu diperhatikan

Contoh:

```text
Dashboard

Selamat pagi, Sinta 👋

Learning Group
3

Students
42

Active Assignments
5

Active Assessments
2

Recent Assignments
----------------------------

Matematika
Persamaan Linear

28 / 32 submitted

Bahasa Inggris
Reading Exercise

30 / 32 submitted

Attention Needed
----------------------------

4 students have not submitted
their assignments.
```

---

# 11. DASHBOARD ORANG TUA / WALI

Dashboard orang tua harus sederhana.

Fokus utama:

> Bagaimana kondisi pembelajaran anak saya?

Informasi:

- nama anak
- learning group
- tugas selesai
- tugas belum selesai
- tugas terlambat
- nilai
- perkembangan
- perhatian khusus

Contoh:

```text
Dashboard

Selamat pagi 👋

Anak:
Andi

Learning Group:
Matematika Private

Assignment

Completed
8

Pending
2

Late
1

Latest Results

Matematika
82

Bahasa Inggris
88

Learning Progress
↑ Improving
```

---

# 12. DASHBOARD SISWA

Dashboard siswa pada MVP dibuat sederhana.

Informasi:

- tugas aktif
- deadline
- assessment aktif
- tugas yang sudah dikumpulkan
- hasil assessment jika sudah tersedia

Contoh:

```text
Dashboard

Halo Andi 👋

Today's Tasks

Matematika
Persamaan Linear
Deadline: Tomorrow

Status:
Not Submitted

[Open Assignment]
```

---

# 13. FITUR MVP

MVP hanya mencakup:

1. Authentication
2. Role-based access
3. Dashboard Pengajar
4. Dashboard Siswa
5. Dashboard Orang Tua/Wali
6. Learning Group
7. Student Management
8. Assignment
9. Submission
10. Assessment
11. Question
12. Result / Grade
13. Learning Report

Fitur lain belum menjadi bagian MVP.

---

# 14. AUTHENTICATION

Authentication menggunakan:

**Supabase Auth**

Minimal:

- Login
- Logout
- Session
- Role-based access

Register tidak harus langsung tersedia jika belum diperlukan.

Jangan membuat sistem authentication custom jika Supabase Auth sudah mencukupi.

---

# 15. ASSIGNMENT

Assignment adalah fitur inti.

Pengajar dapat membuat assignment.

Data assignment:

```text
title
description
subject
learning_group_id
teacher_id
deadline
attachment
submission_type
created_at
updated_at
```

Submission type MVP:

```text
file
text
link
```

---

# 16. ASSIGNMENT STATUS

Status assignment:

```text
Pending
Submitted
Late
```

Status harus dihitung berdasarkan:

- deadline
- waktu submission

Contoh:

```text
Submitted
submitted_at <= deadline
```

```text
Late
submitted_at > deadline
```

```text
Pending
belum ada submission
```

Jangan membuat status tambahan tanpa kebutuhan yang jelas.

---

# 17. SUBMISSION

Submission menyimpan:

```text
assignment_id
student_id
content
file_url
submitted_at
status
score
feedback
```

Pengajar dapat:

- melihat submission
- melihat jawaban
- melihat file
- memberikan nilai
- memberikan feedback

Student dapat:

- membuat submission
- mengubah submission jika masih diperbolehkan

Parent hanya dapat melihat status dan hasil yang relevan.

---

# 18. ASSESSMENT

Assessment merupakan sistem ujian atau evaluasi pembelajaran.

Contoh:

- Ulangan Harian
- Quiz
- Test
- Evaluasi materi

Jangan mengunci istilah menjadi hanya "Ulangan Sekolah".

Karena platform juga digunakan untuk private lesson.

Contoh:

```text
Assessment

Matematika
Persamaan Linear

Duration:
45 minutes

Questions:
20
```

---

# 19. QUESTION

MVP mendukung:

```text
Multiple Choice
Essay
```

Question memiliki:

```text
assessment_id
question
type
options
correct_answer
score
order
```

Untuk Multiple Choice:

```text
A
B
C
D
```

Untuk Essay:

Jawaban dapat diperiksa oleh pengajar.

---

# 20. RESULT / GRADE

Setelah assessment selesai, sistem menyimpan hasil.

Data minimal:

```text
assessment_id
student_id
score
correct_answers
wrong_answers
completed_at
```

Contoh:

```text
Student:
Andi

Assessment:
Matematika Bab 3

Score:
82

Correct:
16

Wrong:
4
```

---

# 21. REPORT

Report MVP harus sederhana.

Report menampilkan:

```text
Total Assignment
Completed Assignment
Pending Assignment
Late Assignment

Average Score

Score by Subject

Learning Progress
```

Contoh:

```text
Learning Report

Student:
Andi

Assignment Completion
85%

Average Score
82

Subject Performance

Mathematics
82

English
88

Science
76

Progress
↑ Improving
```

Jangan membuat AI analysis atau predictive analytics pada MVP.

---

# 22. DATA MODEL

Database menggunakan:

**Supabase PostgreSQL**

Entity utama:

```text
users
organizations
learning_groups
students
student_guardians
subjects
assignments
submissions
assessments
questions
assessment_answers
assessment_results
```

---

# 23. RELATIONSHIP DATABASE

Konsep hubungan:

```text
users
 │
 ├── teacher
 │
 ├── student
 │
 └── parent
```

```text
teacher
   │
   ↓
learning_groups
   │
   ↓
students
```

```text
student
   │
   ├── assignments
   │       │
   │       └── submissions
   │
   ├── assessments
   │       │
   │       ├── answers
   │       └── results
   │
   └── reports
```

```text
parent
   │
   ↓
student
```

Parent tidak memiliki data pembelajaran sendiri.

Parent hanya memiliki relasi dengan student yang menjadi tanggung jawabnya.

---

# 24. TEKNOLOGI

Frontend:

```text
Vite
React
TypeScript
Tailwind CSS
```

Routing:

```text
React Router
```

Backend / BaaS:

```text
Supabase
```

Database:

```text
PostgreSQL
```

Authentication:

```text
Supabase Auth
```

File storage:

```text
Supabase Storage
```

---

# 25. STRUKTUR FOLDER

Struktur awal:

```text
src/
├── assets/
│   ├── images/
│   └── icons/
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── Table.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── DashboardLayout.tsx
│   │
│   └── common/
│       ├── Loading.tsx
│       ├── EmptyState.tsx
│       └── ErrorState.tsx
│
├── pages/
│   ├── auth/
│   │   └── Login.tsx
│   │
│   ├── teacher/
│   │   ├── Dashboard.tsx
│   │   ├── LearningGroups.tsx
│   │   ├── Students.tsx
│   │   ├── Assignments.tsx
│   │   ├── CreateAssignment.tsx
│   │   ├── Submissions.tsx
│   │   ├── Assessments.tsx
│   │   ├── CreateAssessment.tsx
│   │   ├── AssessmentResults.tsx
│   │   ├── Grades.tsx
│   │   └── Reports.tsx
│   │
│   ├── student/
│   │   ├── Dashboard.tsx
│   │   ├── Assignments.tsx
│   │   ├── AssignmentDetail.tsx
│   │   ├── Assessments.tsx
│   │   └── Results.tsx
│   │
│   └── parent/
│       ├── Dashboard.tsx
│       ├── ChildProfile.tsx
│       ├── Assignments.tsx
│       ├── Assessments.tsx
│       ├── Grades.tsx
│       └── Reports.tsx
│
├── layouts/
│   ├── AuthLayout.tsx
│   └── DashboardLayout.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── services/
│   ├── supabase.ts
│   ├── authService.ts
│   ├── assignmentService.ts
│   ├── submissionService.ts
│   ├── assessmentService.ts
│   ├── studentService.ts
│   └── reportService.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useAssignments.ts
│   ├── useStudents.ts
│   └── useAssessments.ts
│
├── types/
│   ├── auth.ts
│   ├── user.ts
│   ├── student.ts
│   ├── learningGroup.ts
│   ├── assignment.ts
│   ├── submission.ts
│   ├── assessment.ts
│   └── report.ts
│
├── data/
│   ├── students.ts
│   ├── assignments.ts
│   └── assessments.ts
│
├── utils/
│   ├── formatDate.ts
│   ├── formatScore.ts
│   └── constants.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

Jangan mengubah struktur folder utama tanpa alasan yang jelas.

---

# 26. ROUTING

Route utama:

```text
/login
```

Teacher:

```text
/teacher
/teacher/groups
/teacher/students
/teacher/assignments
/teacher/assignments/create
/teacher/submissions
/teacher/assessments
/teacher/assessments/create
/teacher/results
/teacher/grades
/teacher/reports
```

Student:

```text
/student
/student/assignments
/student/assignments/:id
/student/assessments
/student/results
```

Parent:

```text
/parent
/parent/child
/parent/assignments
/parent/assessments
/parent/grades
/parent/reports
```

Route harus dilindungi berdasarkan authentication dan role.

---

# 27. UI/UX PRINCIPLE

UI harus:

- clean
- modern
- simple
- responsive
- accessible
- mudah dipahami
- tidak terlalu ramai

Pengajar:

Prioritas pada produktivitas dan data.

Parent:

Prioritas pada informasi yang mudah dipahami.

Student:

Prioritas pada tugas dan assessment.

---

# 28. DESIGN PRINCIPLE

Jangan membuat setiap halaman dengan desain yang berbeda.

Gunakan design system sederhana.

Reusable component:

```text
Button
Input
Select
Textarea
Card
Badge
Modal
Table
Dropdown
Tabs
```

Gunakan konsistensi:

- spacing
- typography
- border radius
- button style
- form style
- table style
- card style

---

# 29. DUMMY DATA

Sebelum Supabase terhubung, dummy data boleh digunakan.

Dummy data harus relevan dengan aplikasi.

Contoh:

```text
students.ts
assignments.ts
assessments.ts
```

Jangan membuat dummy data yang tidak berhubungan dengan sistem pendidikan.

Ketika Supabase sudah aktif, dummy data secara bertahap diganti dengan data asli.

---

# 30. DEVELOPMENT STRATEGY

Development dilakukan bertahap.

## Phase 1 — Foundation

```text
Vite
React
TypeScript
Tailwind
React Router
```

Buat:

- project setup
- layout
- routing
- reusable components

---

## Phase 2 — Authentication

Buat:

- login
- logout
- session
- role

---

## Phase 3 — Teacher Dashboard

Buat:

- dashboard
- learning groups
- students

---

## Phase 4 — Assignment

Buat:

- assignment list
- create assignment
- assignment detail
- submission
- submission status
- grading

---

## Phase 5 — Assessment

Buat:

- assessment list
- create assessment
- question
- assessment submission
- result

---

## Phase 6 — Parent

Buat:

- parent dashboard
- child
- assignments
- grades
- report

---

## Phase 7 — Student

Buat:

- student dashboard
- assignments
- submission
- assessment
- result

---

## Phase 8 — Supabase Integration

Hubungkan:

```text
Authentication
Database
Storage
Row Level Security
```

---

## Phase 9 — Testing

Periksa:

- authentication
- authorization
- routing
- assignment
- submission
- assessment
- result
- report
- responsive UI

---

# 31. MVP BOUNDARY

Fitur berikut **TIDAK BOLEH dibuat pada MVP** kecuali user meminta secara eksplisit:

- Chat
- Video call
- WhatsApp integration
- Google Form integration
- Google Classroom integration
- Attendance
- Payment
- Tuition billing
- Academic calendar kompleks
- School administration
- Payroll
- Teacher management kompleks
- Parent communication center
- AI chatbot
- AI tutor
- AI question generator
- AI grading
- AI recommendation
- Gamification
- Leaderboard
- Social media
- Forum
- Mobile application
- Marketplace

Fitur tersebut masuk kategori:

**Future Development**

---

# 32. FUTURE ROADMAP

## Version 2

Communication:

- Notification
- Reminder deadline
- Announcement
- Parent ↔ Teacher messaging

---

## Version 3

Learning Analytics:

- Score graph
- Assignment completion trend
- Subject performance
- Learning progress
- Student attention indicator

---

## Version 4

AI:

- AI question generator
- AI question variation
- AI explanation generator
- AI learning analysis
- AI recommendation

AI harus menjadi alat bantu pengajar.

AI tidak boleh langsung mempublikasikan hasil tanpa review pengajar.

---

## Version 5

SaaS:

- Multi-organization
- Organization dashboard
- Subscription
- Billing
- Admin organization
- Custom branding
- Organization settings

---

# 33. SECURITY PRINCIPLE

Security harus diperhatikan sejak awal.

Supabase Row Level Security (RLS) digunakan untuk membatasi akses data.

Contoh:

Parent hanya dapat melihat:

```text
student yang memiliki relasi dengan parent tersebut
```

Teacher hanya dapat mengelola:

```text
learning group yang menjadi tanggung jawab teacher
```

Student hanya dapat melihat:

```text
data dirinya sendiri
```

Jangan hanya mengandalkan hiding UI.

Authorization harus tetap dilakukan di backend/database melalui policy yang sesuai.

---

# 34. DATA PRIVACY

Data siswa merupakan data yang harus diperlakukan dengan hati-hati.

Jangan:

- menampilkan data siswa ke user yang tidak berhak
- menggunakan data siswa sebagai dummy data publik
- menaruh credential di frontend
- menyimpan password secara manual
- membocorkan data melalui API yang tidak memiliki authorization

Gunakan Supabase Auth untuk authentication.

Gunakan environment variables untuk configuration.

---

# 35. ENVIRONMENT VARIABLES

Contoh:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Jangan memasukkan:

```text
service_role_key
```

ke dalam frontend.

Jangan commit secret key ke Git.

Gunakan:

```text
.env
```

dan masukkan `.env` ke `.gitignore`.

---

# 36. AI CODING RULES

Bagian ini WAJIB dipatuhi AI.

---

## RULE 01 — READ BEFORE CODE

Sebelum coding:

1. Baca `PROJECT_CONTEXT.md`.
2. Periksa struktur project.
3. Periksa file yang berkaitan.
4. Pahami implementasi yang sudah ada.
5. Baru melakukan perubahan.

Jangan langsung membuat kode berdasarkan asumsi.

---

## RULE 02 — DO NOT HALLUCINATE

Jangan mengarang:

- API
- database table
- field
- component
- service
- library
- function
- requirement
- business logic

Jika sesuatu belum didefinisikan, jangan menganggapnya sudah tersedia.

---

## RULE 03 — EXISTING CODE FIRST

Sebelum membuat file baru, periksa apakah functionality tersebut sudah tersedia.

Jangan membuat:

```text
Button2.tsx
ButtonNew.tsx
NewButton.tsx
```

jika `Button.tsx` sudah dapat digunakan.

Gunakan kembali component yang tersedia.

---

## RULE 04 — MINIMAL CHANGE

Jika user meminta perubahan kecil:

Jangan melakukan refactor besar.

Ubah hanya bagian yang diperlukan.

---

## RULE 05 — NO UNREQUESTED FEATURES

Jangan menambahkan fitur hanya karena menurut AI fitur tersebut menarik.

Contoh:

User meminta:

> Buat halaman tugas.

Jangan otomatis membuat:

- chat
- notification
- AI
- calendar
- payment
- analytics kompleks

Implementasikan hanya yang diperlukan.

---

## RULE 06 — MVP FIRST

Selalu prioritaskan MVP.

Jika ada dua solusi:

```text
Simple Solution
Complex Solution
```

gunakan:

**Simple Solution**

selama kebutuhan tetap terpenuhi.

---

## RULE 07 — NO PREMATURE OPTIMIZATION

Jangan membuat:

- abstraction berlebihan
- architecture kompleks
- state management kompleks
- caching kompleks
- microservices

jika belum diperlukan.

---

## RULE 08 — DEPENDENCY CONTROL

Jangan menambahkan package baru tanpa alasan.

Sebelum menambahkan dependency:

1. Periksa apakah functionality dapat dibuat dengan dependency yang sudah ada.
2. Jika tidak bisa, jelaskan dependency yang diperlukan.
3. Jangan menambahkan package besar untuk kebutuhan kecil.

---

## RULE 09 — TYPE SAFETY

Gunakan TypeScript dengan type yang jelas.

Hindari:

```ts
any
```

kecuali benar-benar diperlukan.

Jangan menggunakan `any` untuk menghilangkan error TypeScript tanpa memahami masalahnya.

---

## RULE 10 — ERROR FIRST

Jika terdapat error:

1. Baca error.
2. Identifikasi root cause.
3. Perbaiki root cause.
4. Jangan menutup error dengan workaround yang tidak jelas.

Jangan:

```ts
// @ts-ignore
```

hanya untuk menghilangkan error.

---

## RULE 11 — CHECK IMPORT / EXPORT

Pastikan:

```text
default export
```

dan

```text
named export
```

digunakan secara konsisten.

Jangan mengubah pola export hanya untuk menyelesaikan error tanpa memahami dependency file tersebut.

---

## RULE 12 — ROUTING SAFETY

Sebelum membuat route:

- periksa route yang sudah ada
- periksa layout
- periksa authentication
- periksa role

Jangan membuat duplicate route.

---

## RULE 13 — DATABASE SAFETY

Sebelum membuat tabel baru:

1. Periksa apakah tabel sudah ada.
2. Periksa apakah tabel yang sudah ada dapat digunakan.
3. Pastikan tabel baru benar-benar diperlukan.

Jangan membuat database schema yang tidak digunakan.

---

## RULE 14 — SECURITY FIRST

Jangan pernah memperbaiki authorization hanya melalui frontend.

Contoh buruk:

```text
if user.role === "parent"
```

lalu menganggap data sudah aman.

Database/API juga harus memiliki authorization.

---

## RULE 15 — ASK WHEN AMBIGUOUS

Jika requirement benar-benar tidak jelas dan keputusan tersebut dapat mengubah:

- database
- architecture
- user flow
- authentication
- role
- security

AI harus meminta klarifikasi.

Jika ambiguity kecil dan tidak berdampak besar, pilih solusi paling sederhana dan jelaskan asumsi tersebut.

---

# 37. CARA AI MENJAWAB PERMINTAAN CODING

Sebelum implementasi, AI harus memahami:

```text
WHAT
Apa yang diminta?

WHY
Kenapa fitur diperlukan?

WHERE
File mana yang perlu diubah?

SCOPE
Apakah termasuk MVP?

IMPACT
Apakah mempengaruhi database / routing / authentication?
```

Untuk perubahan kecil, tidak perlu memberikan penjelasan panjang.

---

# 38. FORMAT IMPLEMENTATION RESPONSE

Jika user meminta coding, gunakan format:

```text
1. Analisis singkat
2. File yang akan diubah
3. Implementasi
4. Validasi
5. Catatan jika ada
```

Jangan memberikan penjelasan yang tidak berhubungan dengan task.

---

# 39. DEFINITION OF DONE

Sebuah fitur dianggap selesai jika:

- functionality berjalan
- TypeScript tidak memiliki error terkait perubahan
- import/export benar
- routing benar
- responsive
- tidak merusak fitur existing
- mengikuti struktur project
- mengikuti scope MVP
- security tidak diabaikan

---

# 40. CURRENT PROJECT STATUS

Saat ini project berada pada:

**Planning / Early Development**

Stack:

```text
Vite
React
TypeScript
Tailwind CSS
React Router
Supabase
PostgreSQL
```

Target pertama:

**MVP**

Fokus:

```text
Pengajar
    ↓
Assignment
    ↓
Submission
    ↓
Assessment
    ↓
Grade
    ↓
Report
    ↓
Parent Monitoring
```

---

# 41. PRIORITAS UTAMA SAAT INI

Prioritas development:

### P0 — Wajib

```text
Project Setup
Authentication
Role
Layout
Teacher Dashboard
Parent Dashboard
Student Dashboard
Learning Group
Assignment
Submission
Assessment
Result
Report
```

### P1 — Setelah P0 stabil

```text
File upload
Feedback
Better analytics
Improved report
```

### P2 — Future

```text
Notification
Messaging
AI
Advanced analytics
Multi-organization
SaaS
```

---

# 42. FINAL INSTRUCTION TO AI

Selalu ingat:

> **Jangan membuat aplikasi menjadi lebih besar dari requirement yang diberikan.**

Tujuan project saat ini adalah membuat MVP yang:

- sederhana
- stabil
- mudah digunakan
- mudah dipahami
- memiliki user flow jelas
- memiliki architecture yang rapi
- mudah dikembangkan di masa depan

Platform harus tetap relevan untuk:

```text
Sekolah
Private Lesson
Tutor
Bimbel
Learning Center
```

Jangan mengunci architecture hanya untuk sekolah formal.

Gunakan konsep:

```text
Pengajar
Siswa
Orang Tua/Wali
Learning Group
Assignment
Submission
Assessment
Result
Report
```

Jika user meminta fitur baru, evaluasi terlebih dahulu:

```text
Apakah fitur ini diperlukan untuk MVP?
        │
       YES
        ↓
Implementasikan

        │
       NO
        ↓
Tandai sebagai Future Feature
dan jangan implementasikan tanpa persetujuan.
```

**PROJECT CONTEXT END**