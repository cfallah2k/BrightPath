import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  Link,
  Select,
  Flex
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'field_worker' as 'field_worker' | 'school_admin' | 'education_officer' | 'coordinator',
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const { setUser, setFieldWorker } = useAuthStore()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      // TODO: Replace with actual Supabase auth when backend is connected
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: '1',
        email: formData.email,
      } as any

      const mockFieldWorker = {
        id: '1',
        user_id: '1',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        role: formData.role,
        assigned_region: null,
        assigned_district: null,
      }

      setUser(mockUser)
      setFieldWorker(mockFieldWorker)
      
      toast({
        title: 'Account created',
        status: 'success',
        duration: 3000,
      })
      
      navigate('/dashboard')
    } catch (error: any) {
      toast({
        title: 'Signup failed',
        description: error.message || 'Unable to create account',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex minH="100vh" bgGradient="linear(to-br, teal.400, teal.600)" align="center" justify="center">
      <Container maxW="container.sm" py={8} px={4}>
        <Box
          bg="white"
          borderRadius="2xl"
          shadow="2xl"
          p={{ base: 6, md: 8 }}
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading size="xl" color="teal.600" mb={2}>
                Create Account
              </Heading>
              <Text color="gray.600">
                Join BrightPath to track out-of-school children
              </Text>
            </Box>

            <form onSubmit={handleSignup}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  >
                    <option value="field_worker">Field Worker - Community data collector</option>
                    <option value="school_admin">School Administrator - School management</option>
                    <option value="education_officer">Education Officer - District/Regional oversight</option>
                    <option value="coordinator">Coordinator - System coordinator</option>
                  </Select>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {formData.role === 'field_worker' && 'Collects data on out-of-school children in communities'}
                    {formData.role === 'school_admin' && 'Manages school enrollment and attendance records'}
                    {formData.role === 'education_officer' && 'Oversees multiple schools and districts'}
                    {formData.role === 'coordinator' && 'System-wide coordination and reporting'}
                  </Text>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  w="full"
                  isLoading={isLoading}
                  loadingText="Creating account..."
                >
                  Sign Up
                </Button>
              </VStack>
            </form>

            <Text textAlign="center" fontSize="sm">
              Already have an account?{' '}
              <Link color="teal.600" fontWeight="semibold" onClick={() => navigate('/login')}>
                Sign in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Flex>
  )
}

