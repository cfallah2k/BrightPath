import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useToast,
  Flex,
  Link,
  Select,
  SimpleGrid
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdEmail, MdLock, MdArrowBack } from 'react-icons/md'
import { useAuthStore } from '../store/authStore'
import { testFieldWorkers } from '../data/testData'

const roleOptions = [
  { value: 'field_worker', label: 'Field Worker', color: 'teal', description: 'Community data collector' },
  { value: 'school_admin', label: 'School Administrator', color: 'green', description: 'School management' },
  { value: 'education_officer', label: 'Education Officer', color: 'blue', description: 'District/Regional oversight' },
  { value: 'coordinator', label: 'Coordinator', color: 'purple', description: 'System coordinator' },
]

export default function Login() {
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'field_worker' | 'school_admin' | 'education_officer' | 'coordinator'>('field_worker')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const { setUser, setFieldWorker } = useAuthStore()

  // Get role from route state or sessionStorage
  useEffect(() => {
    const roleFromState = (location.state as any)?.role
    const roleFromStorage = sessionStorage.getItem('selectedRole')
    const initialRole = roleFromState || roleFromStorage || 'field_worker'
    
    if (initialRole && ['field_worker', 'school_admin', 'education_officer', 'coordinator'].includes(initialRole)) {
      setSelectedRole(initialRole as any)
    }
  }, [location])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Replace with actual Supabase auth when backend is connected
      // For now, mock authentication with role selection
      if (email && password) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Find test field worker with matching role, or create mock one
        const testWorker = testFieldWorkers.find(fw => fw.role === selectedRole) || testFieldWorkers[0]
        
        // Mock user data
        const mockUser = {
          id: testWorker.user_id,
          email: email || testWorker.email,
        } as any

        const mockFieldWorker = {
          id: testWorker.id,
          user_id: testWorker.user_id,
          name: email ? email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : testWorker.name,
          phone: testWorker.phone,
          email: email || testWorker.email,
          role: selectedRole,
          assigned_region: testWorker.assigned_region,
          assigned_district: testWorker.assigned_district,
        }

        setUser(mockUser)
        setFieldWorker(mockFieldWorker)
        
        toast({
          title: 'Login successful',
          description: `Logged in as ${mockFieldWorker.name} (${roleOptions.find(r => r.value === selectedRole)?.label})`,
          status: 'success',
          duration: 3000,
        })
        
        // In production, redirect to OTP verification
        // For demo, go directly to dashboard
        const requiresOTP = false // Set to true to enable OTP verification
        
        if (requiresOTP) {
          navigate('/otp-verification', {
            state: {
              purpose: 'login',
              contactInfo: email,
              onVerify: async (otp: string) => {
                // Verify OTP with backend
                await new Promise(resolve => setTimeout(resolve, 1000))
                if (otp !== '123456') {
                  throw new Error('Invalid OTP')
                }
              }
            }
          })
        } else {
          navigate('/dashboard')
        }
      } else {
        throw new Error('Please fill in all fields')
      }
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid credentials',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = (role: typeof selectedRole) => {
    setSelectedRole(role)
    setEmail(`demo-${role}@brightpath.com`)
    setPassword('demo123')
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
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<MdArrowBack />}
                onClick={() => navigate('/role-selector')}
                mb={2}
                color="gray.600"
              >
                Change Role
              </Button>
              <Heading size="xl" color="teal.600" mb={2}>
                Sign In
              </Heading>
              <Text color="gray.600">
                {roleOptions.find(r => r.value === selectedRole)?.label}
              </Text>
            </Box>

            <form onSubmit={handleLogin}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as any)}
                    mb={2}
                  >
                    {roleOptions.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </Select>
                  <Text fontSize="xs" color="gray.500" mb={3}>
                    {roleOptions.find(r => r.value === selectedRole)?.description}
                  </Text>
                  
                  {/* Quick Login Buttons */}
                  <Box>
                    <Text fontSize="xs" color="gray.600" mb={2}>Quick Login (for testing):</Text>
                    <SimpleGrid columns={2} spacing={2}>
                      {roleOptions.map((role) => (
                        <Button
                          key={role.value}
                          size="xs"
                          colorScheme={role.color}
                          variant={selectedRole === role.value ? 'solid' : 'outline'}
                          onClick={() => handleQuickLogin(role.value as any)}
                        >
                          {role.label}
                        </Button>
                      ))}
                    </SimpleGrid>
                  </Box>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email or Phone</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdEmail color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Enter email or phone"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdLock color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  w="full"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <Flex justify="space-between" fontSize="sm">
              <Link color="teal.600" onClick={() => navigate('/forgot-password')}>
                Forgot password?
              </Link>
              <Text>
                New user?{' '}
                <Link color="teal.600" fontWeight="semibold" onClick={() => navigate('/signup')}>
                  Sign up
                </Link>
              </Text>
            </Flex>

            <Box pt={4} borderTop="1px" borderColor="gray.200">
              <VStack spacing={2}>
                <Text fontSize="xs" color="gray.600" fontWeight="semibold" textAlign="center">
                  Demo Mode - Testing Instructions
                </Text>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  1. Select a role above
                </Text>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  2. Click a quick login button or enter any email/password
                </Text>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  3. All credentials are accepted in demo mode
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Flex>
  )
}

