import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from '../components/common/ProtectedRoute'
import PageLoader from '../components/common/PageLoader'
import type { UserRole } from '../types/user'

// Lazy load pages for code splitting
const CompanyHome = lazy(() => import('../pages/company/Home'))
const Login = lazy(() => import('../pages/auth/Login'))

// Teacher pages
const TeacherDashboard = lazy(() => import('../pages/teacher/Dashboard'))
const LearningGroups = lazy(() => import('../pages/teacher/LearningGroups'))
const Students = lazy(() => import('../pages/teacher/Students'))
const Assignments = lazy(() => import('../pages/teacher/Assignments'))
const CreateAssignment = lazy(() => import('../pages/teacher/CreateAssignment'))
const Submissions = lazy(() => import('../pages/teacher/Submissions'))
const Assessments = lazy(() => import('../pages/teacher/Assessments'))
const CreateAssessment = lazy(() => import('../pages/teacher/CreateAssessment'))
const AssessmentResults = lazy(() => import('../pages/teacher/AssessmentResults'))
const Grades = lazy(() => import('../pages/teacher/Grades'))
const Reports = lazy(() => import('../pages/teacher/Reports'))

// Student pages
const StudentDashboard = lazy(() => import('../pages/student/Dashboard'))
const StudentAssignments = lazy(() => import('../pages/student/Assignments'))
const AssignmentDetail = lazy(() => import('../pages/student/AssignmentDetail'))
const StudentAssessments = lazy(() => import('../pages/student/Assessments'))
const StudentResults = lazy(() => import('../pages/student/Results'))

// Parent pages
const ParentDashboard = lazy(() => import('../pages/parent/Dashboard'))
const ChildProfile = lazy(() => import('../pages/parent/ChildProfile'))
const ParentAssignments = lazy(() => import('../pages/parent/Assignments'))
const ParentAssessments = lazy(() => import('../pages/parent/Assessments'))
const ParentGrades = lazy(() => import('../pages/parent/Grades'))
const ParentReports = lazy(() => import('../pages/parent/Reports'))

interface AppRoutesProps {
  isAuthenticated?: boolean
  userRole?: UserRole | null
  onLogin?: (role: UserRole) => void
  onLogout?: () => void
  user?: {
    id: string
    name: string
    email: string
    role: UserRole
    createdAt: string
    updatedAt: string
  } | null
}

export default function AppRoutes({
  isAuthenticated = false,
  userRole = null,
  onLogin = () => {},
  onLogout = () => {},
  user = null,
}: AppRoutesProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<CompanyHome />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={`/${userRole?.toLowerCase() || 'teacher'}`} replace />
              ) : (
                <Login onLogin={onLogin} />
              )
            }
          />
        </Route>

        {/* Teacher Routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              allowedRoles={['TEACHER']}
            >
              <DashboardLayout role="TEACHER" user={user} onLogout={onLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="groups" element={<LearningGroups />} />
          <Route path="students" element={<Students />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="assignments/create" element={<CreateAssignment />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="assessments/create" element={<CreateAssessment />} />
          <Route path="results" element={<AssessmentResults />} />
          <Route path="grades" element={<Grades />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              allowedRoles={['STUDENT']}
            >
              <DashboardLayout role="STUDENT" user={user} onLogout={onLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="assignments/:id" element={<AssignmentDetail />} />
          <Route path="assessments" element={<StudentAssessments />} />
          <Route path="results" element={<StudentResults />} />
        </Route>

        {/* Parent Routes */}
        <Route
          path="/parent"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              allowedRoles={['PARENT']}
            >
              <DashboardLayout role="PARENT" user={user} onLogout={onLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<ParentDashboard />} />
          <Route path="child" element={<ChildProfile />} />
          <Route path="assignments" element={<ParentAssignments />} />
          <Route path="assessments" element={<ParentAssessments />} />
          <Route path="grades" element={<ParentGrades />} />
          <Route path="reports" element={<ParentReports />} />
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
