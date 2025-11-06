import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Box, Spinner, VStack, Text } from '@chakra-ui/react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" align="center" justify="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text color="gray.600">Loading...</Text>
        </VStack>
      </Box>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

