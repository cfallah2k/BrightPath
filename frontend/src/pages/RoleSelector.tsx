import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button,
  Flex,
  Badge
} from '@chakra-ui/react'
import { MdPerson, MdSchool, MdAdminPanelSettings, MdSupervisorAccount } from 'react-icons/md'

interface RoleOption {
  value: 'field_worker' | 'school_admin' | 'education_officer' | 'coordinator'
  label: string
  description: string
  icon: any
  color: string
}

const roles: RoleOption[] = [
  {
    value: 'field_worker',
    label: 'Field Worker',
    description: 'Community data collector and child registration',
    icon: MdPerson,
    color: 'teal'
  },
  {
    value: 'school_admin',
    label: 'School Administrator',
    description: 'School management and enrollment verification',
    icon: MdSchool,
    color: 'green'
  },
  {
    value: 'education_officer',
    label: 'Education Officer',
    description: 'District/Regional oversight and reporting',
    icon: MdAdminPanelSettings,
    color: 'blue'
  },
  {
    value: 'coordinator',
    label: 'Coordinator',
    description: 'System-wide coordination and analytics',
    icon: MdSupervisorAccount,
    color: 'purple'
  }
]

export default function RoleSelectorPage() {
  const [selectedRole, setSelectedRole] = useState<'field_worker' | 'school_admin' | 'education_officer' | 'coordinator'>('field_worker')
  const navigate = useNavigate()

  const handleContinue = () => {
    // Store selected role in sessionStorage for use in login/signup
    sessionStorage.setItem('selectedRole', selectedRole)
    navigate('/login', { state: { role: selectedRole } })
  }

  const handleSignup = () => {
    sessionStorage.setItem('selectedRole', selectedRole)
    navigate('/signup', { state: { role: selectedRole } })
  }

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, teal.400, teal.600)"
      align="center"
      justify="center"
      py={8}
      px={4}
    >
      <Container maxW="container.sm">
        <Box
          bg="white"
          borderRadius="2xl"
          shadow="2xl"
          p={{ base: 6, md: 8 }}
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading size="xl" color="teal.600" mb={2}>
                Welcome to BrightPath
              </Heading>
              <Text color="gray.600">
                Select your role to continue
              </Text>
            </Box>

            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                I am a...
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                {roles.map((role) => {
                  const Icon = role.icon
                  const isSelected = selectedRole === role.value
                  return (
                    <Box
                      key={role.value}
                      p={4}
                      border="2px"
                      borderColor={isSelected ? `${role.color}.500` : 'gray.200'}
                      borderRadius="lg"
                      bg={isSelected ? `${role.color}.50` : 'white'}
                      cursor="pointer"
                      onClick={() => setSelectedRole(role.value)}
                      transition="all 0.2s"
                      _hover={{
                        borderColor: `${role.color}.300`,
                        shadow: 'md'
                      }}
                    >
                      <VStack spacing={3} align="start">
                        <Flex align="center" gap={3} w="full">
                          <Box
                            p={2}
                            borderRadius="md"
                            bg={`${role.color}.100`}
                            color={`${role.color}.600`}
                          >
                            <Icon size="24px" />
                          </Box>
                          <VStack align="start" spacing={0} flex={1}>
                            <Text fontWeight="semibold">{role.label}</Text>
                            {isSelected && (
                              <Badge colorScheme={role.color} fontSize="xs">
                                Selected
                              </Badge>
                            )}
                          </VStack>
                        </Flex>
                        <Text fontSize="xs" color="gray.600">
                          {role.description}
                        </Text>
                      </VStack>
                    </Box>
                  )
                })}
              </SimpleGrid>
            </VStack>

            <VStack spacing={3} pt={4}>
              <Button
                colorScheme="teal"
                size="lg"
                w="full"
                onClick={handleContinue}
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                colorScheme="teal"
                size="lg"
                w="full"
                onClick={handleSignup}
              >
                Create Account
              </Button>
            </VStack>

            <Box pt={4} borderTop="1px" borderColor="gray.200">
              <Text fontSize="xs" color="gray.500" textAlign="center">
                Demo Mode: All roles are available for testing
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Flex>
  )
}

