// Comprehensive Test Data for BrightPath Frontend
// This file contains realistic mock data for testing the application

import { Database } from '../types/database.types'

type Child = Database['public']['Tables']['children']['Row']
type School = Database['public']['Tables']['schools']['Row']
type Enrollment = Database['public']['Tables']['enrollments']['Row']
type Attendance = Database['public']['Tables']['attendance']['Row']
type Assessment = Database['public']['Tables']['assessments']['Row']
type FieldWorker = Database['public']['Tables']['field_workers']['Row']

// Test Schools
export const testSchools: School[] = [
  {
    id: 'school-001',
    name: 'Accra Primary School',
    location: {
      region: 'Greater Accra',
      district: 'Accra Metropolitan',
      community: 'Accra Central',
      coordinates: { lat: 5.6037, lng: -0.1870 }
    },
    school_type: 'primary',
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2023-01-15T10:00:00Z'
  },
  {
    id: 'school-002',
    name: 'Kumasi Lower Secondary School',
    location: {
      region: 'Ashanti',
      district: 'Kumasi Metropolitan',
      community: 'Kumasi',
      coordinates: { lat: 6.6885, lng: -1.6244 }
    },
    school_type: 'lower_secondary',
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2023-01-15T10:00:00Z'
  },
  {
    id: 'school-003',
    name: 'Tamale Community School',
    location: {
      region: 'Northern',
      district: 'Tamale Metropolitan',
      community: 'Tamale',
      coordinates: { lat: 9.4000, lng: -0.8399 }
    },
    school_type: 'mixed',
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2023-01-15T10:00:00Z'
  },
  {
    id: 'school-004',
    name: 'Cape Coast Primary School',
    location: {
      region: 'Central',
      district: 'Cape Coast Metropolitan',
      community: 'Cape Coast',
      coordinates: { lat: 5.1053, lng: -1.2466 }
    },
    school_type: 'primary',
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2023-01-15T10:00:00Z'
  },
  {
    id: 'school-005',
    name: 'Takoradi Secondary School',
    location: {
      region: 'Western',
      district: 'Sekondi-Takoradi Metropolitan',
      community: 'Takoradi',
      coordinates: { lat: 4.9016, lng: -1.7831 }
    },
    school_type: 'upper_secondary',
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2023-01-15T10:00:00Z'
  }
]

// Test Field Workers
export const testFieldWorkers: FieldWorker[] = [
  {
    id: 'worker-001',
    user_id: 'user-001',
    name: 'John Mensah',
    phone: '+233 24 123 4567',
    email: 'john.mensah@brightpath.org',
    role: 'field_worker',
    assigned_region: 'Greater Accra',
    assigned_district: 'Accra Metropolitan',
    is_active: true,
    created_at: '2023-01-10T08:00:00Z',
    updated_at: '2023-01-10T08:00:00Z'
  },
  {
    id: 'worker-002',
    user_id: 'user-002',
    name: 'Ama Asante',
    phone: '+233 24 234 5678',
    email: 'ama.asante@brightpath.org',
    role: 'education_officer',
    assigned_region: 'Ashanti',
    assigned_district: null,
    is_active: true,
    created_at: '2023-01-10T08:00:00Z',
    updated_at: '2023-01-10T08:00:00Z'
  },
  {
    id: 'worker-003',
    user_id: 'user-003',
    name: 'Kwame Osei',
    phone: '+233 24 345 6789',
    email: 'kwame.osei@brightpath.org',
    role: 'school_admin',
    assigned_region: 'Greater Accra',
    assigned_district: 'Accra Metropolitan',
    is_active: true,
    created_at: '2023-01-10T08:00:00Z',
    updated_at: '2023-01-10T08:00:00Z'
  }
]

// Test Children
export const testChildren: Child[] = [
  {
    id: 'child-001',
    created_at: '2023-09-01T10:00:00Z',
    first_name: 'Ama',
    last_name: 'Mensah',
    date_of_birth: '2015-05-15',
    gender: 'female',
    location: {
      region: 'Greater Accra',
      district: 'Accra Metropolitan',
      community: 'Accra Central',
      coordinates: { lat: 5.6037, lng: -0.1870 }
    },
    disability_status: false,
    disability_details: null,
    household_poverty_indicator: 'poor',
    barriers_to_education: ['Poverty', 'Distance to school'],
    enrollment_status: 'enrolled',
    enrolled_school_id: 'school-001',
    enrollment_date: '2023-09-01',
    photo_url: null,
    created_by: 'worker-001',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'child-002',
    created_at: '2023-08-15T10:00:00Z',
    first_name: 'Kwame',
    last_name: 'Asante',
    date_of_birth: '2011-03-20',
    gender: 'male',
    location: {
      region: 'Ashanti',
      district: 'Kumasi Metropolitan',
      community: 'Kumasi',
      coordinates: { lat: 6.6885, lng: -1.6244 }
    },
    disability_status: false,
    disability_details: null,
    household_poverty_indicator: 'middle',
    barriers_to_education: ['Rural isolation'],
    enrollment_status: 'at_risk',
    enrolled_school_id: 'school-002',
    enrollment_date: '2023-09-01',
    photo_url: null,
    created_by: 'worker-001',
    updated_at: '2024-01-14T10:00:00Z'
  },
  {
    id: 'child-003',
    created_at: '2023-07-20T10:00:00Z',
    first_name: 'Efua',
    last_name: 'Boateng',
    date_of_birth: '2014-11-10',
    gender: 'female',
    location: {
      region: 'Northern',
      district: 'Tamale Metropolitan',
      community: 'Tamale',
      coordinates: { lat: 9.4000, lng: -0.8399 }
    },
    disability_status: true,
    disability_details: 'Visual impairment',
    household_poverty_indicator: 'poorest',
    barriers_to_education: ['Disability', 'Poverty', 'Gender inequality'],
    enrollment_status: 'not_enrolled',
    enrolled_school_id: null,
    enrollment_date: null,
    photo_url: null,
    created_by: 'worker-002',
    updated_at: '2024-01-13T10:00:00Z'
  },
  {
    id: 'child-004',
    created_at: '2023-09-05T10:00:00Z',
    first_name: 'Kofi',
    last_name: 'Osei',
    date_of_birth: '2016-02-18',
    gender: 'male',
    location: {
      region: 'Greater Accra',
      district: 'Accra Metropolitan',
      community: 'Accra Central',
      coordinates: { lat: 5.6037, lng: -0.1870 }
    },
    disability_status: false,
    disability_details: null,
    household_poverty_indicator: 'poor',
    barriers_to_education: ['Poverty'],
    enrollment_status: 'enrolled',
    enrolled_school_id: 'school-001',
    enrollment_date: '2023-09-05',
    photo_url: null,
    created_by: 'worker-001',
    updated_at: '2024-01-12T10:00:00Z'
  },
  {
    id: 'child-005',
    created_at: '2023-08-10T10:00:00Z',
    first_name: 'Akosua',
    last_name: 'Darko',
    date_of_birth: '2013-07-25',
    gender: 'female',
    location: {
      region: 'Central',
      district: 'Cape Coast Metropolitan',
      community: 'Cape Coast',
      coordinates: { lat: 5.1053, lng: -1.2466 }
    },
    disability_status: false,
    disability_details: null,
    household_poverty_indicator: 'middle',
    barriers_to_education: ['Family issues'],
    enrollment_status: 'enrolled',
    enrolled_school_id: 'school-004',
    enrollment_date: '2023-09-01',
    photo_url: null,
    created_by: 'worker-001',
    updated_at: '2024-01-11T10:00:00Z'
  },
  {
    id: 'child-006',
    created_at: '2023-07-05T10:00:00Z',
    first_name: 'Yaw',
    last_name: 'Agyeman',
    date_of_birth: '2010-12-05',
    gender: 'male',
    location: {
      region: 'Western',
      district: 'Sekondi-Takoradi Metropolitan',
      community: 'Takoradi',
      coordinates: { lat: 4.9016, lng: -1.7831 }
    },
    disability_status: false,
    disability_details: null,
    household_poverty_indicator: 'poor',
    barriers_to_education: ['Poverty', 'Distance to school'],
    enrollment_status: 'dropped_out',
    enrolled_school_id: null,
    enrollment_date: null,
    photo_url: null,
    created_by: 'worker-002',
    updated_at: '2023-12-15T10:00:00Z'
  },
  {
    id: 'child-007',
    created_at: '2023-09-10T10:00:00Z',
    first_name: 'Adjoa',
    last_name: 'Frimpong',
    date_of_birth: '2015-09-30',
    gender: 'female',
    location: {
      region: 'Greater Accra',
      district: 'Accra Metropolitan',
      community: 'Accra Central',
      coordinates: { lat: 5.6037, lng: -0.1870 }
    },
    disability_status: true,
    disability_details: 'Hearing impairment',
    household_poverty_indicator: 'poor',
    barriers_to_education: ['Disability', 'Poverty'],
    enrollment_status: 'enrolled',
    enrolled_school_id: 'school-001',
    enrollment_date: '2023-09-10',
    photo_url: null,
    created_by: 'worker-001',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 'child-008',
    created_at: '2023-08-20T10:00:00Z',
    first_name: 'Kojo',
    last_name: 'Appiah',
    date_of_birth: '2012-04-12',
    gender: 'male',
    location: {
      region: 'Ashanti',
      district: 'Kumasi Metropolitan',
      community: 'Kumasi',
      coordinates: { lat: 6.6885, lng: -1.6244 }
    },
    disability_status: false,
    disability_details: null,
    household_poverty_indicator: 'middle',
    barriers_to_education: [],
    enrollment_status: 'enrolled',
    enrolled_school_id: 'school-002',
    enrollment_date: '2023-09-01',
    photo_url: null,
    created_by: 'worker-001',
    updated_at: '2024-01-09T10:00:00Z'
  }
]

// Test Enrollments
export const testEnrollments: Enrollment[] = [
  {
    id: 'enroll-001',
    child_id: 'child-001',
    school_id: 'school-001',
    enrollment_date: '2023-09-01',
    status: 'active',
    withdrawal_date: null,
    withdrawal_reason: null,
    created_at: '2023-09-01T10:00:00Z',
    updated_at: '2023-09-01T10:00:00Z'
  },
  {
    id: 'enroll-002',
    child_id: 'child-002',
    school_id: 'school-002',
    enrollment_date: '2023-09-01',
    status: 'active',
    withdrawal_date: null,
    withdrawal_reason: null,
    created_at: '2023-09-01T10:00:00Z',
    updated_at: '2023-09-01T10:00:00Z'
  },
  {
    id: 'enroll-003',
    child_id: 'child-004',
    school_id: 'school-001',
    enrollment_date: '2023-09-05',
    status: 'active',
    withdrawal_date: null,
    withdrawal_reason: null,
    created_at: '2023-09-05T10:00:00Z',
    updated_at: '2023-09-05T10:00:00Z'
  },
  {
    id: 'enroll-004',
    child_id: 'child-005',
    school_id: 'school-004',
    enrollment_date: '2023-09-01',
    status: 'active',
    withdrawal_date: null,
    withdrawal_reason: null,
    created_at: '2023-09-01T10:00:00Z',
    updated_at: '2023-09-01T10:00:00Z'
  },
  {
    id: 'enroll-005',
    child_id: 'child-007',
    school_id: 'school-001',
    enrollment_date: '2023-09-10',
    status: 'active',
    withdrawal_date: null,
    withdrawal_reason: null,
    created_at: '2023-09-10T10:00:00Z',
    updated_at: '2023-09-10T10:00:00Z'
  },
  {
    id: 'enroll-006',
    child_id: 'child-008',
    school_id: 'school-002',
    enrollment_date: '2023-09-01',
    status: 'active',
    withdrawal_date: null,
    withdrawal_reason: null,
    created_at: '2023-09-01T10:00:00Z',
    updated_at: '2023-09-01T10:00:00Z'
  },
  {
    id: 'enroll-007',
    child_id: 'child-006',
    school_id: 'school-005',
    enrollment_date: '2023-09-01',
    status: 'withdrawn',
    withdrawal_date: '2023-12-15',
    withdrawal_reason: 'Family relocation',
    created_at: '2023-09-01T10:00:00Z',
    updated_at: '2023-12-15T10:00:00Z'
  }
]

// Generate attendance records for the last 30 days
const generateAttendanceRecords = (): Attendance[] => {
  const records: Attendance[] = []
  const today = new Date()
  
  testChildren.forEach(child => {
    if (child.enrollment_status === 'enrolled' && child.enrolled_school_id) {
      // Generate 30 days of attendance
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        
        // Skip weekends (Saturday = 6, Sunday = 0)
        const dayOfWeek = date.getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) continue
        
        // Calculate attendance rate based on enrollment status
        let present = true
        if (child.enrollment_status === 'at_risk' || child.enrollment_status === 'not_enrolled') {
          present = Math.random() > 0.3 // 70% attendance for at-risk
        } else if (child.enrollment_status === 'enrolled') {
          present = Math.random() > 0.15 // 85% attendance for enrolled
        } else {
          present = false // Dropped out children don't attend
        }
        
        records.push({
          id: `attendance-${child.id}-${dateStr}`,
          child_id: child.id,
          school_id: child.enrolled_school_id!,
          date: dateStr,
          present,
          reason_for_absence: present ? null : (Math.random() > 0.5 ? 'Sick' : 'Family Issue'),
          recorded_by: child.created_by,
          created_at: `${dateStr}T08:00:00Z`
        })
      }
    }
  })
  
  return records
}

export const testAttendance: Attendance[] = generateAttendanceRecords()

// Test Assessments
export const testAssessments: Assessment[] = [
  {
    id: 'assess-001',
    child_id: 'child-001',
    assessment_type: 'baseline',
    assessment_date: '2023-09-01',
    literacy_score: 45.5,
    numeracy_score: 50.0,
    details: {
      reading_level: 'Beginner',
      math_level: 'Beginner',
      notes: 'Initial assessment completed'
    },
    assessed_by: 'worker-001',
    created_at: '2023-09-01T10:00:00Z'
  },
  {
    id: 'assess-002',
    child_id: 'child-001',
    assessment_type: 'quarterly',
    assessment_date: '2023-12-15',
    literacy_score: 65.0,
    numeracy_score: 70.0,
    details: {
      reading_level: 'Intermediate',
      math_level: 'Intermediate',
      notes: 'Good progress observed'
    },
    assessed_by: 'worker-001',
    created_at: '2023-12-15T10:00:00Z'
  },
  {
    id: 'assess-003',
    child_id: 'child-002',
    assessment_type: 'baseline',
    assessment_date: '2023-09-01',
    literacy_score: 40.0,
    numeracy_score: 45.0,
    details: {
      reading_level: 'Beginner',
      math_level: 'Beginner',
      notes: 'Needs additional support'
    },
    assessed_by: 'worker-001',
    created_at: '2023-09-01T10:00:00Z'
  },
  {
    id: 'assess-004',
    child_id: 'child-004',
    assessment_type: 'baseline',
    assessment_date: '2023-09-05',
    literacy_score: 50.0,
    numeracy_score: 55.0,
    details: {
      reading_level: 'Beginner',
      math_level: 'Beginner',
      notes: 'Baseline assessment'
    },
    assessed_by: 'worker-001',
    created_at: '2023-09-05T10:00:00Z'
  },
  {
    id: 'assess-005',
    child_id: 'child-005',
    assessment_type: 'quarterly',
    assessment_date: '2023-12-15',
    literacy_score: 60.0,
    numeracy_score: 65.0,
    details: {
      reading_level: 'Intermediate',
      math_level: 'Intermediate',
      notes: 'Steady improvement'
    },
    assessed_by: 'worker-001',
    created_at: '2023-12-15T10:00:00Z'
  }
]

// Helper functions to get related data
export const getChildById = (id: string) => testChildren.find(c => c.id === id)
export const getSchoolById = (id: string) => testSchools.find(s => s.id === id)
export const getFieldWorkerById = (id: string) => testFieldWorkers.find(f => f.id === id)
export const getEnrollmentsByChildId = (childId: string) => 
  testEnrollments.filter(e => e.child_id === childId)
export const getAttendanceByChildId = (childId: string) => 
  testAttendance.filter(a => a.child_id === childId)
export const getAssessmentsByChildId = (childId: string) => 
  testAssessments.filter(a => a.child_id === childId)

// Calculate statistics
export const calculateStats = () => {
  const total = testChildren.length
  const enrolled = testChildren.filter(c => c.enrollment_status === 'enrolled').length
  const notEnrolled = testChildren.filter(c => c.enrollment_status === 'not_enrolled').length
  const atRisk = testChildren.filter(c => c.enrollment_status === 'at_risk').length
  const droppedOut = testChildren.filter(c => c.enrollment_status === 'dropped_out').length
  
  return {
    total,
    enrolled,
    notEnrolled,
    atRisk,
    droppedOut,
    enrollmentRate: ((enrolled / total) * 100).toFixed(1),
    retentionRate: ((enrolled / (enrolled + droppedOut)) * 100).toFixed(1)
  }
}




