// Helper functions for working with test data
import { testChildren, testAttendance, testAssessments, getChildById, getSchoolById } from '../data/testData'

// Re-export helper functions from testData
export { getChildById, getSchoolById }

// Format child name
export const formatChildName = (child: { first_name: string; last_name: string }) => {
  return `${child.first_name} ${child.last_name}`
}

// Calculate age from date of birth
export const calculateAge = (dateOfBirth: string | null): number => {
  if (!dateOfBirth) return 0
  const today = new Date()
  const birth = new Date(dateOfBirth)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

// Get enrollment status color
export const getEnrollmentStatusColor = (status: string): string => {
  switch (status) {
    case 'enrolled':
      return 'green'
    case 'at_risk':
      return 'orange'
    case 'not_enrolled':
      return 'red'
    case 'dropped_out':
      return 'gray'
    default:
      return 'gray'
  }
}

// Get enrollment status label
export const getEnrollmentStatusLabel = (status: string): string => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Filter children by search query
export const filterChildrenBySearch = (query: string) => {
  if (!query) return testChildren
  
  const lowerQuery = query.toLowerCase()
  return testChildren.filter(child => 
    child.first_name.toLowerCase().includes(lowerQuery) ||
    child.last_name.toLowerCase().includes(lowerQuery) ||
    `${child.first_name} ${child.last_name}`.toLowerCase().includes(lowerQuery)
  )
}

// Filter children by status
export const filterChildrenByStatus = (status: string) => {
  if (status === 'all') return testChildren
  return testChildren.filter(child => child.enrollment_status === status)
}

// Get child with related data
export const getChildWithDetails = (childId: string) => {
  const child = getChildById(childId)
  if (!child) return null
  
  const school = child.enrolled_school_id ? getSchoolById(child.enrolled_school_id) : null
  const attendance = testAttendance.filter(a => a.child_id === childId)
  const assessments = testAssessments.filter(a => a.child_id === childId)
  
  // Calculate attendance stats
  const attendanceStats = {
    total: attendance.length,
    present: attendance.filter(a => a.present).length,
    absent: attendance.filter(a => !a.present).length,
    rate: attendance.length > 0 
      ? (attendance.filter(a => a.present).length / attendance.length * 100).toFixed(1)
      : '0'
  }
  
  return {
    child,
    school,
    attendance,
    assessments,
    attendanceStats
  }
}

// Get recent children (sorted by updated_at)
export const getRecentChildren = (limit: number = 5) => {
  return [...testChildren]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, limit)
}

// Get children by region
export const getChildrenByRegion = (region: string) => {
  if (!region || region === 'all') return testChildren
  return testChildren.filter(child => child.location.region === region)
}

// Get children by district
export const getChildrenByDistrict = (district: string) => {
  if (!district || district === 'all') return testChildren
  return testChildren.filter(child => child.location.district === district)
}

// Format date for display
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Format date for input
export const formatDateForInput = (dateString: string | null): string => {
  if (!dateString) return ''
  return dateString.split('T')[0]
}

// Get attendance for date range
export const getAttendanceForDateRange = (childId: string, days: number = 30) => {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - days)
  
  return testAttendance
    .filter(a => a.child_id === childId)
    .filter(a => {
      const attDate = new Date(a.date)
      return attDate >= startDate && attDate <= today
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Calculate average assessment scores
export const calculateAverageScores = (childId: string) => {
  const assessments = testAssessments.filter(a => a.child_id === childId)
  
  if (assessments.length === 0) {
    return { literacy: 0, numeracy: 0 }
  }
  
  const literacyAvg = assessments.reduce((sum, a) => sum + (a.literacy_score || 0), 0) / assessments.length
  const numeracyAvg = assessments.reduce((sum, a) => sum + (a.numeracy_score || 0), 0) / assessments.length
  
  return {
    literacy: literacyAvg.toFixed(1),
    numeracy: numeracyAvg.toFixed(1)
  }
}




