import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  Flex,
  Select,
  useColorModeValue,
  Spinner
} from '@chakra-ui/react'
import { MdSearch, MdAdd, MdPerson } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { testDataService } from '../../services/testDataService'
import { formatChildName, calculateAge, getEnrollmentStatusColor, getSchoolById } from '../../utils/testDataHelpers'

export default function ChildrenList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [children, setChildren] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const bg = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    const loadChildren = async () => {
      setIsLoading(true)
      try {
        const data = await testDataService.getChildren({
          search: searchQuery || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined
        })
        setChildren(data)
      } catch (error) {
        console.error('Failed to load children:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadChildren()
  }, [searchQuery, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled':
        return 'green'
      case 'at_risk':
        return 'orange'
      case 'not_enrolled':
        return 'red'
      case 'dropped_out':
        return 'gray'
      default:
        return 'gray'
    }
  }

  return (
    <MobileLayout>
      <Header 
        title="Children" 
        showBack={false}
      />
      <Box 
        px={{ base: 3, sm: 4, md: 6 }} 
        py={{ base: 4, md: 6 }}
        maxW="100%"
        overflowX="hidden"
      >
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          {/* Search and Filters */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={3}>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <MdSearch color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search children by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={bg}
              />
            </InputGroup>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              w={{ base: 'full', md: '200px' }}
              bg={bg}
            >
              <option value="all">All Status</option>
              <option value="enrolled">Enrolled</option>
              <option value="at_risk">At Risk</option>
              <option value="not_enrolled">Not Enrolled</option>
              <option value="dropped_out">Dropped Out</option>
            </Select>
            <IconButton
              aria-label="Add child"
              icon={<MdAdd />}
              colorScheme="teal"
              onClick={() => navigate('/children/register')}
            />
          </Flex>

          {/* Results Count */}
          {!isLoading && (
            <Text fontSize="sm" color="gray.600">
              {children.length} child{children.length !== 1 ? 'ren' : ''} found
            </Text>
          )}

          {/* Children List */}
          {isLoading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" color="teal.500" />
            </Box>
          ) : (
            <VStack spacing={3} align="stretch">
              {children.map((child) => {
                const school = child.enrolled_school_id ? getSchoolById(child.enrolled_school_id) : null
                return (
                  <Card
                    key={child.id}
                    clickable
                    onClick={() => navigate(`/children/${child.id}`)}
                  >
                    <HStack justify="space-between" align="start">
                      <HStack spacing={3} flex={1}>
                        <Box
                          w="50px"
                          h="50px"
                          borderRadius="full"
                          bg="teal.100"
                          display="flex"
                          align="center"
                          justify="center"
                          flexShrink={0}
                        >
                          <MdPerson size="24px" color="teal.600" />
                        </Box>
                        <VStack align="start" spacing={1} flex={1}>
                          <Heading size="sm">
                            {formatChildName(child)}
                          </Heading>
                          <Text fontSize="sm" color="gray.600">
                            {calculateAge(child.date_of_birth)} years old • {child.gender === 'male' ? 'Male' : 'Female'}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {child.location.district}, {child.location.community}
                          </Text>
                          {school && (
                            <Text fontSize="xs" color="teal.600">
                              {school.name}
                            </Text>
                          )}
                        </VStack>
                      </HStack>
                      <VStack align="end" spacing={2}>
                        <Badge colorScheme={getEnrollmentStatusColor(child.enrollment_status)}>
                          {child.enrollment_status.replace('_', ' ')}
                        </Badge>
                        {child.disability_status && (
                          <Badge colorScheme="purple" fontSize="xs">
                            Disability
                          </Badge>
                        )}
                      </VStack>
                    </HStack>
                  </Card>
                )
              })}
            </VStack>
          )}

          {/* Empty State */}
          {!isLoading && children.length === 0 && (
            <Card>
              <VStack py={8} spacing={2}>
                <MdPerson size="48px" color="gray.400" />
                <Text color="gray.500">No children found</Text>
                <Text fontSize="sm" color="gray.400">
                  Try adjusting your search or filters
                </Text>
              </VStack>
            </Card>
          )}
        </VStack>
      </Box>
    </MobileLayout>
  )
}

