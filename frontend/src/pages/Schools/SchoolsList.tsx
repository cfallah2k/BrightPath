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
  Center
} from '@chakra-ui/react'
import { MdSearch, MdAdd, MdSchool, MdLocationOn } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { testDataService } from '../../services/testDataService'
import { testChildren } from '../../data/testData'

export default function SchoolsList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [schools, setSchools] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadSchools = async () => {
      setIsLoading(true)
      try {
        const data = await testDataService.getSchools()
        setSchools(data)
      } catch (error) {
        console.error('Failed to load schools:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadSchools()
  }, [])

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate student count for each school
  const getStudentCount = (schoolId: string) => {
    return testChildren.filter(c => c.enrolled_school_id === schoolId).length
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'primary':
        return 'Primary'
      case 'lower_secondary':
        return 'Lower Secondary'
      case 'upper_secondary':
        return 'Upper Secondary'
      case 'mixed':
        return 'Mixed'
      default:
        return type
    }
  }

  return (
    <MobileLayout>
      <Header title="Schools" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <VStack spacing={4} align="stretch">
          <Flex gap={3}>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <MdSearch color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search schools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <IconButton
              aria-label="Add school"
              icon={<MdAdd />}
              colorScheme="teal"
              onClick={() => {
                // For now, show a toast. In production, navigate to add school page
                alert('Add School feature coming soon! This will allow you to register new schools in the system.')
              }}
            />
          </Flex>

          {!isLoading && (
            <Text fontSize="sm" color="gray.600">
              {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found
            </Text>
          )}

          {isLoading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" color="teal.500" />
            </Box>
          ) : (
            <VStack spacing={3} align="stretch">
              {filteredSchools.map((school) => (
              <Card
                key={school.id}
                clickable
                onClick={() => navigate(`/schools/${school.id}`)}
              >
                <HStack spacing={3}>
                      <Center
                        w="50px"
                        h="50px"
                        borderRadius="lg"
                        bg="blue.100"
                      >
                        <MdSchool size="24px" color="blue.600" />
                      </Center>
                  <VStack align="start" spacing={1} flex={1}>
                    <Heading size="sm">{school.name}</Heading>
                    <HStack>
                      <MdLocationOn size="14px" color="gray.600" />
                      <Text fontSize="sm" color="gray.600">
                        {school.location.community}, {school.location.district}
                      </Text>
                    </HStack>
                  </VStack>
                  <VStack align="end" spacing={1}>
                    <Badge colorScheme="blue">{getTypeLabel(school.school_type)}</Badge>
                    <Text fontSize="xs" color="gray.500">
                      {getStudentCount(school.id)} students
                    </Text>
                  </VStack>
                </HStack>
              </Card>
              ))}
            </VStack>
          )}
        </VStack>
      </Box>
    </MobileLayout>
  )
}

