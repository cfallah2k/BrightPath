// Test Data Service - Simulates API calls with test data
// This service will be replaced with actual Supabase calls when backend is connected

import { testChildren, testSchools, testAttendance, testAssessments, testEnrollments, calculateStats } from '../data/testData'
import { filterChildrenBySearch, filterChildrenByStatus, getChildWithDetails } from '../utils/testDataHelpers'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const testDataService = {
  // Children
  async getChildren(filters?: { search?: string; status?: string; region?: string }) {
    await delay(300) // Simulate network delay
    
    let filtered = [...testChildren]
    
    if (filters?.search) {
      filtered = filterChildrenBySearch(filters.search)
    }
    
    if (filters?.status) {
      filtered = filterChildrenByStatus(filters.status)
    }
    
    if (filters?.region && filters.region !== 'all') {
      filtered = filtered.filter(c => c.location.region === filters.region)
    }
    
    return filtered
  },
  
  async getChildById(id: string) {
    await delay(200)
    return getChildWithDetails(id)
  },
  
  async createChild(data: any) {
    await delay(500)
    const newChild = {
      id: `child-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    // In real app, this would be added to testChildren array
    return newChild
  },
  
  async updateChild(id: string, data: any) {
    await delay(500)
    return {
      id,
      ...data,
      updated_at: new Date().toISOString()
    }
  },
  
  // Schools
  async getSchools() {
    await delay(200)
    return testSchools
  },
  
  async getSchoolById(id: string) {
    await delay(200)
    return testSchools.find(s => s.id === id)
  },
  
  // Attendance
  async getAttendance(childId: string, days: number = 30) {
    await delay(200)
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
  },
  
  async recordAttendance(data: any) {
    await delay(500)
    return {
      id: `attendance-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString()
    }
  },
  
  // Assessments
  async getAssessments(childId?: string) {
    await delay(200)
    if (childId) {
      return testAssessments.filter(a => a.child_id === childId)
    }
    return testAssessments
  },
  
  async createAssessment(data: any) {
    await delay(500)
    return {
      id: `assess-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString()
    }
  },
  
  // Statistics
  async getStatistics(filters?: { region?: string; district?: string }) {
    await delay(300)
    const stats = calculateStats()
    
    // Apply filters if needed
    let filteredChildren = testChildren
    if (filters?.region && filters.region !== 'all') {
      filteredChildren = filteredChildren.filter(c => c.location.region === filters.region)
    }
    if (filters?.district && filters.district !== 'all') {
      filteredChildren = filteredChildren.filter(c => c.location.district === filters.district)
    }
    
    const filteredStats = {
      total: filteredChildren.length,
      enrolled: filteredChildren.filter(c => c.enrollment_status === 'enrolled').length,
      notEnrolled: filteredChildren.filter(c => c.enrollment_status === 'not_enrolled').length,
      atRisk: filteredChildren.filter(c => c.enrollment_status === 'at_risk').length,
      droppedOut: filteredChildren.filter(c => c.enrollment_status === 'dropped_out').length,
    }
    
    return {
      ...stats,
      ...filteredStats,
      enrollmentRate: filteredStats.total > 0 
        ? ((filteredStats.enrolled / filteredStats.total) * 100).toFixed(1)
        : '0'
    }
  },
  
  // Enrollments
  async getEnrollments(childId?: string) {
    await delay(200)
    if (childId) {
      return testEnrollments.filter(e => e.child_id === childId)
    }
    return testEnrollments
  }
}




