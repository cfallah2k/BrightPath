import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'

// Mock API functions - replace with actual Supabase calls
const fetchChildren = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return []
}

const createChild = async (data: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { id: Date.now().toString(), ...data }
}

const updateChild = async ({ id, data }: { id: string; data: any }) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { id, ...data }
}

export function useChildren(filters?: { status?: string; search?: string }) {
  return useQuery({
    queryKey: ['children', filters],
    queryFn: fetchChildren,
    staleTime: 30000, // 30 seconds
  })
}

export function useCreateChild() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: createChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] })
      toast({
        title: 'Child registered',
        status: 'success',
        duration: 3000,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Registration failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      })
    },
  })
}

export function useUpdateChild() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: updateChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] })
      toast({
        title: 'Child updated',
        status: 'success',
        duration: 3000,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Update failed',
        description: error.message,
        status: 'error',
        duration: 5000,
      })
    },
  })
}

