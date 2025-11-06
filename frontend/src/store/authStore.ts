import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface FieldWorker {
  id: string
  user_id: string
  name: string
  phone: string
  email: string | null
  role: 'field_worker' | 'school_admin' | 'education_officer' | 'coordinator'
  assigned_region: string | null
  assigned_district: string | null
}

interface AuthState {
  user: User | null
  fieldWorker: FieldWorker | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setFieldWorker: (fieldWorker: FieldWorker | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  fieldWorker: null,
  isLoading: false, // Start as false, will be set to true during initial check
  setUser: (user) => set({ user }),
  setFieldWorker: (fieldWorker) => set({ fieldWorker }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    set({ user: null, fieldWorker: null })
    sessionStorage.removeItem('selectedRole')
  },
}))

