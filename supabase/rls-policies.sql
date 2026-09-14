-- ============================================
-- Row Level Security (RLS) Policies
-- EduConnect
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_learning_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Get current user's role
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS user_role AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if user is teacher of a learning group
CREATE OR REPLACE FUNCTION auth.is_teacher_of_group(group_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.learning_groups
    WHERE id = group_id AND teacher_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if user is student in a learning group
CREATE OR REPLACE FUNCTION auth.is_student_in_group(group_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.student_learning_groups slg
    JOIN public.students s ON s.id = slg.student_id
    WHERE slg.learning_group_id = group_id AND s.user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if user is parent of a student
CREATE OR REPLACE FUNCTION auth.is_parent_of_student(student_user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.student_guardians sg
    JOIN public.students s ON s.id = sg.student_id
    WHERE sg.parent_id = auth.uid() AND s.user_id = student_user_id
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================
-- USERS POLICIES
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.users FOR SELECT
  USING (id = auth.uid());

-- Teachers can read all users (for student management)
CREATE POLICY "Teachers can read all users"
  ON public.users FOR SELECT
  USING (auth.user_role() = 'TEACHER');

-- Parents can read their children's profiles
CREATE POLICY "Parents can read children profiles"
  ON public.users FOR SELECT
  USING (auth.is_parent_of_student(id));

-- ============================================
-- LEARNING GROUPS POLICIES
-- ============================================

-- Teachers can manage their own learning groups
CREATE POLICY "Teachers can manage own groups"
  ON public.learning_groups FOR ALL
  USING (teacher_id = auth.uid());

-- Students can read groups they belong to
CREATE POLICY "Students can read own groups"
  ON public.learning_groups FOR SELECT
  USING (auth.is_student_in_group(id));

-- Parents can read groups of their children
CREATE POLICY "Parents can read children groups"
  ON public.learning_groups FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.student_learning_groups slg
      JOIN public.students s ON s.id = slg.student_id
      JOIN public.student_guardians sg ON sg.student_id = s.id
      WHERE slg.learning_group_id = id AND sg.parent_id = auth.uid()
    )
  );

-- ============================================
-- STUDENTS POLICIES
-- ============================================

-- Teachers can read all students
CREATE POLICY "Teachers can read all students"
  ON public.students FOR SELECT
  USING (auth.user_role() = 'TEACHER');

-- Students can read their own profile
CREATE POLICY "Students can read own profile"
  ON public.students FOR SELECT
  USING (user_id = auth.uid());

-- Parents can read their children
CREATE POLICY "Parents can read children"
  ON public.students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.student_guardians
      WHERE student_id = id AND parent_id = auth.uid()
    )
  );

-- ============================================
-- STUDENT LEARNING GROUPS POLICIES
-- ============================================

-- Teachers can manage students in their groups
CREATE POLICY "Teachers can manage group students"
  ON public.student_learning_groups FOR ALL
  USING (auth.is_teacher_of_group(learning_group_id));

-- Students can read their own group memberships
CREATE POLICY "Students can read own memberships"
  ON public.student_learning_groups FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE id = student_id AND user_id = auth.uid()
    )
  );

-- ============================================
-- ASSIGNMENTS POLICIES
-- ============================================

-- Teachers can manage assignments in their groups
CREATE POLICY "Teachers can manage assignments"
  ON public.assignments FOR ALL
  USING (
    teacher_id = auth.uid()
    OR auth.is_teacher_of_group(learning_group_id)
  );

-- Students can read assignments in their groups
CREATE POLICY "Students can read group assignments"
  ON public.assignments FOR SELECT
  USING (auth.is_student_in_group(learning_group_id));

-- Parents can read assignments of their children's groups
CREATE POLICY "Parents can read children assignments"
  ON public.assignments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.student_learning_groups slg
      JOIN public.students s ON s.id = slg.student_id
      JOIN public.student_guardians sg ON sg.student_id = s.id
      WHERE slg.learning_group_id = learning_group_id
        AND sg.parent_id = auth.uid()
    )
  );

-- ============================================
-- SUBMISSIONS POLICIES
-- ============================================

-- Teachers can read submissions for their assignments
CREATE POLICY "Teachers can read submissions"
  ON public.submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments
      WHERE id = assignment_id AND teacher_id = auth.uid()
    )
  );

-- Teachers can grade submissions
CREATE POLICY "Teachers can grade submissions"
  ON public.submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments
      WHERE id = assignment_id AND teacher_id = auth.uid()
    )
  );

-- Students can manage their own submissions
CREATE POLICY "Students can manage own submissions"
  ON public.submissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE id = student_id AND user_id = auth.uid()
    )
  );

-- Parents can read their children's submissions
CREATE POLICY "Parents can read children submissions"
  ON public.submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.student_guardians
      WHERE student_id = submissions.student_id AND parent_id = auth.uid()
    )
  );

-- ============================================
-- ASSESSMENTS POLICIES
-- ============================================

-- Teachers can manage assessments in their groups
CREATE POLICY "Teachers can manage assessments"
  ON public.assessments FOR ALL
  USING (
    teacher_id = auth.uid()
    OR auth.is_teacher_of_group(learning_group_id)
  );

-- Students can read assessments in their groups
CREATE POLICY "Students can read group assessments"
  ON public.assessments FOR SELECT
  USING (auth.is_student_in_group(learning_group_id));

-- Parents can read assessments of their children's groups
CREATE POLICY "Parents can read children assessments"
  ON public.assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.student_learning_groups slg
      JOIN public.students s ON s.id = slg.student_id
      JOIN public.student_guardians sg ON sg.student_id = s.id
      WHERE slg.learning_group_id = learning_group_id
        AND sg.parent_id = auth.uid()
    )
  );

-- ============================================
-- QUESTIONS POLICIES
-- ============================================

-- Teachers can manage questions for their assessments
CREATE POLICY "Teachers can manage questions"
  ON public.questions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.assessments
      WHERE id = assessment_id AND teacher_id = auth.uid()
    )
  );

-- Students can read questions (without correct_answer)
CREATE POLICY "Students can read questions"
  ON public.questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.assessments a
      JOIN public.student_learning_groups slg ON slg.learning_group_id = a.learning_group_id
      JOIN public.students s ON s.id = slg.student_id
      WHERE a.id = assessment_id AND s.user_id = auth.uid()
    )
  );

-- ============================================
-- ASSESSMENT ANSWERS POLICIES
-- ============================================

-- Teachers can read answers for their assessments
CREATE POLICY "Teachers can read answers"
  ON public.assessment_answers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.assessments
      WHERE id = assessment_id AND teacher_id = auth.uid()
    )
  );

-- Students can manage their own answers
CREATE POLICY "Students can manage own answers"
  ON public.assessment_answers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE id = student_id AND user_id = auth.uid()
    )
  );

-- ============================================
-- ASSESSMENT RESULTS POLICIES
-- ============================================

-- Teachers can read results for their assessments
CREATE POLICY "Teachers can read results"
  ON public.assessment_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.assessments
      WHERE id = assessment_id AND teacher_id = auth.uid()
    )
  );

-- Teachers can create results
CREATE POLICY "Teachers can create results"
  ON public.assessment_results FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.assessments
      WHERE id = assessment_id AND teacher_id = auth.uid()
    )
  );

-- Students can read their own results
CREATE POLICY "Students can read own results"
  ON public.assessment_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE id = student_id AND user_id = auth.uid()
    )
  );

-- Parents can read their children's results
CREATE POLICY "Parents can read children results"
  ON public.assessment_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.student_guardians
      WHERE student_id = assessment_results.student_id AND parent_id = auth.uid()
    )
  );
