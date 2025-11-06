import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Spinner, VStack, Text, Flex } from '@chakra-ui/react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text color="gray.600">Loading...</Text>
        </VStack>
      </Flex>
    )
  }

  if (!user) {
    return <Navigate to="/role-selector" replace />
  }

  return <>{children}</>
}

