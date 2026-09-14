-- ============================================
-- Seed Data untuk Development
-- EduConnect
-- ============================================

-- Catatan: Untuk membuat user, gunakan Supabase Auth Dashboard
-- atau API. Seed ini asumsikan user sudah ada di auth.users.

-- ============================================
-- USERS (contoh - sesuaikan dengan auth.users)
-- ============================================

-- INSERT INTO public.users (id, email, name, role) VALUES
--   ('uuid-teacher-1', 'teacher@educonnect.com', 'Sinta Permata', 'TEACHER'),
--   ('uuid-student-1', 'andi@educonnect.com', 'Andi Pratama', 'STUDENT'),
--   ('uuid-student-2', 'budi@educonnect.com', 'Budi Santoso', 'STUDENT'),
--   ('uuid-student-3', 'citra@educonnect.com', 'Citra Dewi', 'STUDENT'),
--   ('uuid-parent-1', 'parent1@educonnect.com', 'Budi Ayah', 'PARENT');

-- ============================================
-- LEARNING GROUPS
-- ============================================

-- INSERT INTO public.learning_groups (id, name, subject, teacher_id, description) VALUES
--   ('uuid-lg-1', 'X IPA 1', 'Matematika', 'uuid-teacher-1', 'Kelas Matematika untuk siswa X IPA 1'),
--   ('uuid-lg-2', 'Les Matematika Andi', 'Matematika', 'uuid-teacher-1', 'Les privat Matematika untuk Andi'),
--   ('uuid-lg-3', 'Kelompok Belajar Bahasa Inggris', 'Bahasa Inggris', 'uuid-teacher-1', 'Kelompok belajar Bahasa Inggris');

-- ============================================
-- STUDENTS
-- ============================================

-- INSERT INTO public.students (id, user_id, student_id) VALUES
--   ('uuid-s-1', 'uuid-student-1', 'STU001'),
--   ('uuid-s-2', 'uuid-student-2', 'STU002'),
--   ('uuid-s-3', 'uuid-student-3', 'STU003');

-- ============================================
-- STUDENT LEARNING GROUPS
-- ============================================

-- INSERT INTO public.student_learning_groups (student_id, learning_group_id) VALUES
--   ('uuid-s-1', 'uuid-lg-1'),
--   ('uuid-s-1', 'uuid-lg-2'),
--   ('uuid-s-2', 'uuid-lg-1'),
--   ('uuid-s-2', 'uuid-lg-3'),
--   ('uuid-s-3', 'uuid-lg-2'),
--   ('uuid-s-3', 'uuid-lg-3');

-- ============================================
-- STUDENT GUARDIANS
-- ============================================

-- INSERT INTO public.student_guardians (student_id, parent_id) VALUES
--   ('uuid-s-1', 'uuid-parent-1');

-- ============================================
-- SUBJECTS
-- ============================================

INSERT INTO public.subjects (name) VALUES
  ('Matematika'),
  ('Bahasa Inggris'),
  ('Bahasa Indonesia'),
  ('Fisika'),
  ('Kimia'),
  ('Biologi'),
  ('Sejarah'),
  ('Geografi');

-- ============================================
-- ASSIGNMENTS
-- ============================================

-- INSERT INTO public.assignments (id, title, description, subject, learning_group_id, teacher_id, deadline, submission_type) VALUES
--   ('uuid-a-1', 'Persamaan Linear', 'Kerjakan soal persamaan linear pada buku halaman 45-50', 'Matematika', 'uuid-lg-1', 'uuid-teacher-1', '2024-12-20T23:59:00Z', 'file'),
--   ('uuid-a-2', 'Reading Exercise', 'Baca artikel dan jawab pertanyaan di bawah ini', 'Bahasa Inggris', 'uuid-lg-3', 'uuid-teacher-1', '2024-12-22T23:59:00Z', 'text'),
--   ('uuid-a-3', 'Laporan Praktikum Fisika', 'Buat laporan praktikum tentang percobaan gaya', 'Fisika', 'uuid-lg-1', 'uuid-teacher-1', '2024-12-25T23:59:00Z', 'file');

-- ============================================
-- ASSESSMENTS
-- ============================================

-- INSERT INTO public.assessments (id, title, description, subject, learning_group_id, teacher_id, duration, question_count) VALUES
--   ('uuid-as-1', 'Ulangan Harian Matematika Bab 3', 'Ulangan tentang persamaan dan pertidaksamaan linear', 'Matematika', 'uuid-lg-1', 'uuid-teacher-1', 45, 20),
--   ('uuid-as-2', 'Quiz Bahasa Inggris', 'Quiz tentang grammar dan vocabulary', 'Bahasa Inggris', 'uuid-lg-3', 'uuid-teacher-1', 30, 15);

-- ============================================
-- QUESTIONS
-- ============================================

-- INSERT INTO public.questions (assessment_id, question, type, options, correct_answer, score, "order") VALUES
--   ('uuid-as-1', 'Hasil dari 2x + 5 = 15 adalah...', 'MULTIPLE_CHOICE', '["x = 3", "x = 5", "x = 7", "x = 10"]', 'x = 5', 5, 1),
--   ('uuid-as-1', 'Jelaskan langkah-langkah menyelesaikan persamaan linear dua variabel!', 'ESSAY', NULL, NULL, 10, 2),
--   ('uuid-as-1', 'Nilai x dari 3x - 7 = 2x + 1 adalah...', 'MULTIPLE_CHOICE', '["x = 4", "x = 6", "x = 8", "x = 10"]', 'x = 8', 5, 3);
