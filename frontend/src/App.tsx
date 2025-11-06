import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ProtectedRoute from './components/common/ProtectedRoute'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ChildrenList from './pages/Children/ChildrenList'
import RegisterChild from './pages/Children/RegisterChild'
import ChildDetails from './pages/Children/ChildDetails'
import SchoolsList from './pages/Schools/SchoolsList'
import AssessmentsList from './pages/Assessments/AssessmentsList'
import NewAssessment from './pages/Assessments/NewAssessment'
import Reports from './pages/Reports/Reports'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import RecordAttendance from './pages/Attendance/RecordAttendance'
import AttendanceHistory from './pages/Attendance/AttendanceHistory'
import EditChild from './pages/Children/EditChild'

// Custom theme for mobile-first design
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      },
      '*': {
        WebkitTapHighlightColor: 'transparent',
      },
    },
  },
  breakpoints: {
    base: '0em',      // 0px - Mobile
    sm: '30em',       // 480px - Large mobile
    md: '48em',       // 768px - Tablet
    lg: '62em',       // 992px - Desktop
    xl: '80em',       // 1280px - Large desktop
    '2xl': '96em',    // 1536px - Extra large
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
        minH: '44px', // Minimum touch target
        _active: {
          transform: 'scale(0.98)',
        },
      },
      sizes: {
        sm: {
          minH: '36px',
          fontSize: 'sm',
        },
        md: {
          minH: '44px',
          fontSize: 'md',
        },
        lg: {
          minH: '48px',
          fontSize: 'lg',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          minH: '44px', // Minimum touch target
          fontSize: '16px', // Prevents zoom on iOS
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'sm',
          transition: 'all 0.2s',
        },
      },
    },
  },
  shadows: {
    'mobile': '0 2px 8px rgba(0, 0, 0, 0.1)',
    'mobile-lg': '0 4px 16px rgba(0, 0, 0, 0.15)',
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/children"
            element={
              <ProtectedRoute>
                <ChildrenList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/children/register"
            element={
              <ProtectedRoute>
                <RegisterChild />
              </ProtectedRoute>
            }
          />
          <Route
            path="/children/:id"
            element={
              <ProtectedRoute>
                <ChildDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/children/:id/edit"
            element={
              <ProtectedRoute>
                <EditChild />
              </ProtectedRoute>
            }
          />
          <Route
            path="/children/:id/attendance"
            element={
              <ProtectedRoute>
                <AttendanceHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schools"
            element={
              <ProtectedRoute>
                <SchoolsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessments"
            element={
              <ProtectedRoute>
                <AssessmentsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessments/new"
            element={
              <ProtectedRoute>
                <NewAssessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <RecordAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance/record"
            element={
              <ProtectedRoute>
                <RecordAttendance />
              </ProtectedRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
