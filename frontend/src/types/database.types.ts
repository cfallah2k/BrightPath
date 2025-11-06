export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      children: {
        Row: {
          id: string
          created_at: string
          first_name: string
          last_name: string
          date_of_birth: string | null
          gender: 'male' | 'female' | 'other'
          location: {
            region: string
            district: string
            community: string
            coordinates?: { lat: number; lng: number }
          }
          disability_status: boolean
          disability_details: string | null
          household_poverty_indicator: 'poorest' | 'poor' | 'middle' | 'rich' | 'richest' | null
          barriers_to_education: string[]
          enrollment_status: 'not_enrolled' | 'enrolled' | 'at_risk' | 'dropped_out'
          enrolled_school_id: string | null
          enrollment_date: string | null
          photo_url: string | null
          created_by: string
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          first_name: string
          last_name: string
          date_of_birth?: string | null
          gender: 'male' | 'female' | 'other'
          location: {
            region: string
            district: string
            community: string
            coordinates?: { lat: number; lng: number }
          }
          disability_status: boolean
          disability_details?: string | null
          household_poverty_indicator?: 'poorest' | 'poor' | 'middle' | 'rich' | 'richest' | null
          barriers_to_education?: string[]
          enrollment_status?: 'not_enrolled' | 'enrolled' | 'at_risk' | 'dropped_out'
          enrolled_school_id?: string | null
          enrollment_date?: string | null
          photo_url?: string | null
          created_by: string
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string | null
          gender?: 'male' | 'female' | 'other'
          location?: {
            region: string
            district: string
            community: string
            coordinates?: { lat: number; lng: number }
          }
          disability_status?: boolean
          disability_details?: string | null
          household_poverty_indicator?: 'poorest' | 'poor' | 'middle' | 'rich' | 'richest' | null
          barriers_to_education?: string[]
          enrollment_status?: 'not_enrolled' | 'enrolled' | 'at_risk' | 'dropped_out'
          enrolled_school_id?: string | null
          enrollment_date?: string | null
          photo_url?: string | null
          created_by?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          child_id: string
          school_id: string
          enrollment_date: string
          status: 'active' | 'completed' | 'withdrawn'
          withdrawal_date: string | null
          withdrawal_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          school_id: string
          enrollment_date: string
          status?: 'active' | 'completed' | 'withdrawn'
          withdrawal_date?: string | null
          withdrawal_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          school_id?: string
          enrollment_date?: string
          status?: 'active' | 'completed' | 'withdrawn'
          withdrawal_date?: string | null
          withdrawal_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          child_id: string
          school_id: string
          date: string
          present: boolean
          reason_for_absence: string | null
          recorded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          school_id: string
          date: string
          present: boolean
          reason_for_absence?: string | null
          recorded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          school_id?: string
          date?: string
          present?: boolean
          reason_for_absence?: string | null
          recorded_by?: string
          created_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          child_id: string
          assessment_type: 'literacy' | 'numeracy' | 'baseline' | 'quarterly'
          assessment_date: string
          literacy_score: number | null
          numeracy_score: number | null
          details: Json | null
          assessed_by: string
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          assessment_type: 'literacy' | 'numeracy' | 'baseline' | 'quarterly'
          assessment_date: string
          literacy_score?: number | null
          numeracy_score?: number | null
          details?: Json | null
          assessed_by: string
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          assessment_type?: 'literacy' | 'numeracy' | 'baseline' | 'quarterly'
          assessment_date?: string
          literacy_score?: number | null
          numeracy_score?: number | null
          details?: Json | null
          assessed_by?: string
          created_at?: string
        }
      }
      schools: {
        Row: {
          id: string
          name: string
          location: {
            region: string
            district: string
            community: string
            coordinates?: { lat: number; lng: number }
          }
          school_type: 'primary' | 'lower_secondary' | 'upper_secondary' | 'mixed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: {
            region: string
            district: string
            community: string
            coordinates?: { lat: number; lng: number }
          }
          school_type: 'primary' | 'lower_secondary' | 'upper_secondary' | 'mixed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: {
            region: string
            district: string
            community: string
            coordinates?: { lat: number; lng: number }
          }
          school_type?: 'primary' | 'lower_secondary' | 'upper_secondary' | 'mixed'
          created_at?: string
          updated_at?: string
        }
      }
      field_workers: {
        Row: {
          id: string
          user_id: string
          name: string
          phone: string
          email: string | null
          role: 'field_worker' | 'school_admin' | 'education_officer' | 'coordinator'
          assigned_region: string | null
          assigned_district: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          phone: string
          email?: string | null
          role?: 'field_worker' | 'school_admin' | 'education_officer' | 'coordinator'
          assigned_region?: string | null
          assigned_district?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          phone?: string
          email?: string | null
          role?: 'field_worker' | 'school_admin' | 'education_officer' | 'coordinator'
          assigned_region?: string | null
          assigned_district?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender: 'male' | 'female' | 'other'
      enrollment_status: 'not_enrolled' | 'enrolled' | 'at_risk' | 'dropped_out'
      poverty_quintile: 'poorest' | 'poor' | 'middle' | 'rich' | 'richest'
      user_role: 'field_worker' | 'school_admin' | 'education_officer' | 'coordinator'
    }
  }
}

