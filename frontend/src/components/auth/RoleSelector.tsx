import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  SimpleGrid,
  Button,
  useColorModeValue
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
    description: 'Community data collector',
    icon: MdPerson,
    color: 'teal'
  },
  {
    value: 'school_admin',
    label: 'School Administrator',
    description: 'School management',
    icon: MdSchool,
    color: 'green'
  },
  {
    value: 'education_officer',
    label: 'Education Officer',
    description: 'District/Regional oversight',
    icon: MdAdminPanelSettings,
    color: 'blue'
  },
  {
    value: 'coordinator',
    label: 'Coordinator',
    description: 'System coordinator',
    icon: MdSupervisorAccount,
    color: 'purple'
  }
]

interface RoleSelectorProps {
  selectedRole: string
  onRoleChange: (role: 'field_worker' | 'school_admin' | 'education_officer' | 'coordinator') => void
  variant?: 'select' | 'cards'
}

export default function RoleSelector({ selectedRole, onRoleChange, variant = 'select' }: RoleSelectorProps) {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  if (variant === 'cards') {
    return (
      <VStack spacing={4} align="stretch">
        <Text fontSize="sm" fontWeight="semibold" color="gray.700">
          Select Your Role
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
                borderColor={isSelected ? `${role.color}.500` : borderColor}
                borderRadius="lg"
                bg={isSelected ? `${role.color}.50` : bg}
                cursor="pointer"
                onClick={() => onRoleChange(role.value)}
                transition="all 0.2s"
                _hover={{
                  borderColor: `${role.color}.300`,
                  shadow: 'md'
                }}
              >
                <HStack spacing={3}>
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
                    <Text fontSize="xs" color="gray.600">
                      {role.description}
                    </Text>
                  </VStack>
                  {isSelected && (
                    <Badge colorScheme={role.color}>Selected</Badge>
                  )}
                </HStack>
              </Box>
            )
          })}
        </SimpleGrid>
      </VStack>
    )
  }

  return null
}

