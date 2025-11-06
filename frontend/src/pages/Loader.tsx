import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, VStack, Spinner, Text, Box } from '@chakra-ui/react'
import { useAuthStore } from '../store/authStore'

export default function Loader() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      if (user) {
        // User is authenticated, go to dashboard
        navigate('/dashboard', { replace: true })
      } else {
        // User is not authenticated, go to role selector
        navigate('/role-selector', { replace: true })
      }
    }, 1500) // Show loader for 1.5 seconds

    return () => clearTimeout(timer)
  }, [user, navigate])

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, teal.400, teal.600)"
      direction="column"
    >
      <VStack spacing={6}>
        <Box
          w="120px"
          h="120px"
          borderRadius="2xl"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          shadow="2xl"
          animation="pulse 2s infinite"
        >
          <Text fontSize="4xl" fontWeight="bold" color="teal.600">
            BP
          </Text>
        </Box>
        <VStack spacing={2}>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            BrightPath
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800">
            Out of School Children Tracker
          </Text>
        </VStack>
        <Spinner
          size="lg"
          color="white"
          thickness="3px"
          speed="0.8s"
          mt={4}
        />
      </VStack>
    </Flex>
  )
}

