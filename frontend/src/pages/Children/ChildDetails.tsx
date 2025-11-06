import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  SimpleGrid,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Center
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { MdEdit, MdSchool, MdCalendarToday, MdLocationOn, MdPerson, MdMap } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { testDataService } from '../../services/testDataService'
import { formatChildName, calculateAge, getEnrollmentStatusColor, formatDate } from '../../utils/testDataHelpers'

export default function ChildDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [childData, setChildData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChild = async () => {
      if (!id) return
      setIsLoading(true)
      try {
        const data = await testDataService.getChildById(id)
        setChildData(data)
      } catch (error) {
        console.error('Failed to load child:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadChild()
  }, [id])
  
  if (isLoading) {
    return (
      <MobileLayout>
        <Header title="Loading..." showBack onBack={() => navigate('/children')} />
        <Flex justify="center" align="center" minH="50vh">
          <Spinner size="xl" color="teal.500" />
        </Flex>
      </MobileLayout>
    )
  }
  
  if (!childData || !childData.child) {
    return (
      <MobileLayout>
        <Header title="Child Not Found" showBack onBack={() => navigate('/children')} />
        <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
          <Card>
            <Text>Child not found</Text>
          </Card>
        </Box>
      </MobileLayout>
    )
  }
  
  const { child, school, attendanceStats, assessments } = childData

  return (
    <MobileLayout>
      <Header 
        title={formatChildName(child)}
        showBack
        onBack={() => navigate('/children')}
      />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <VStack spacing={4} align="stretch">
          {/* Header Card */}
          <Card>
            <HStack justify="space-between" mb={4}>
              <HStack spacing={3}>
                <Center
                  w="60px"
                  h="60px"
                  borderRadius="full"
                  bg="teal.100"
                >
                  <MdPerson size="30px" color="teal.600" />
                </Center>
                <VStack align="start" spacing={0}>
                  <Heading size="md">
                    {formatChildName(child)}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    {calculateAge(child.date_of_birth)} years old • {child.gender === 'male' ? 'Male' : 'Female'}
                  </Text>
                </VStack>
              </HStack>
              <Badge colorScheme={getEnrollmentStatusColor(child.enrollment_status)} fontSize="md" px={3} py={1}>
                {child.enrollment_status.replace('_', ' ')}
              </Badge>
            </HStack>
            <Button
              leftIcon={<MdEdit />}
              colorScheme="teal"
              size="sm"
              w="full"
              onClick={() => navigate(`/children/${id}/edit`)}
            >
              Edit Child Information
            </Button>
          </Card>

          {/* Tabs */}
          <Tabs colorScheme="teal">
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Attendance</Tab>
              <Tab>Assessments</Tab>
            </TabList>

            <TabPanels>
              {/* Overview Tab */}
              <TabPanel px={0}>
                <VStack spacing={4} align="stretch">
                  <Card>
                    <VStack align="stretch" spacing={3}>
                      <HStack justify="space-between">
                        <Heading size="sm">Location</Heading>
                        <Button
                          size="xs"
                          leftIcon={<MdMap />}
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => navigate(`/children/${id}/location`)}
                        >
                          Track Location
                        </Button>
                      </HStack>
                      <VStack align="start" spacing={2}>
                        <HStack>
                          <MdLocationOn color="gray.600" />
                          <Text fontSize="sm">
                            {child.location.community}, {child.location.district}
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600" pl={6}>
                          {child.location.region} Region
                        </Text>
                        {child.location.coordinates && (
                          <Text fontSize="xs" color="gray.500" pl={6}>
                            {child.location.coordinates.lat.toFixed(6)}, {child.location.coordinates.lng.toFixed(6)}
                          </Text>
                        )}
                      </VStack>
                    </VStack>
                  </Card>

                  {child.enrollment_status === 'enrolled' && school && (
                    <Card>
                      <Heading size="sm" mb={3}>School Information</Heading>
                      <VStack align="start" spacing={2}>
                        <HStack>
                          <MdSchool color="gray.600" />
                          <Text fontSize="sm">{school.name}</Text>
                        </HStack>
                        {child.enrollment_date && (
                          <HStack>
                            <MdCalendarToday color="gray.600" />
                            <Text fontSize="sm" color="gray.600">
                              Enrolled on {formatDate(child.enrollment_date)}
                            </Text>
                          </HStack>
                        )}
                      </VStack>
                    </Card>
                  )}

                  <Card>
                    <Heading size="sm" mb={3}>Background Information</Heading>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="sm" color="gray.600">Disability Status:</Text>
                        <Badge colorScheme={child.disability_status ? 'purple' : 'gray'}>
                          {child.disability_status ? 'Yes' : 'No'}
                        </Badge>
                      </HStack>
                      {child.disability_status && child.disability_details && (
                        <Text fontSize="sm" color="gray.600">
                          {child.disability_details}
                        </Text>
                      )}
                      {child.household_poverty_indicator && (
                        <HStack justify="space-between" w="full">
                          <Text fontSize="sm" color="gray.600">Poverty Indicator:</Text>
                          <Text fontSize="sm" fontWeight="medium">
                            {child.household_poverty_indicator.charAt(0).toUpperCase() + child.household_poverty_indicator.slice(1)}
                          </Text>
                        </HStack>
                      )}
                      {child.barriers_to_education && child.barriers_to_education.length > 0 && (
                        <Box w="full">
                          <Text fontSize="sm" color="gray.600" mb={2}>Barriers to Education:</Text>
                          <HStack flexWrap="wrap" gap={2}>
                            {child.barriers_to_education.map((barrier: string, idx: number) => (
                              <Badge key={idx} colorScheme="orange" fontSize="xs">
                                {barrier}
                              </Badge>
                            ))}
                          </HStack>
                        </Box>
                      )}
                    </VStack>
                  </Card>
                </VStack>
              </TabPanel>

              {/* Attendance Tab */}
              <TabPanel px={0}>
                <Card>
                  <VStack spacing={4} align="stretch">
                    <SimpleGrid columns={3} spacing={4}>
                      <Box textAlign="center">
                        <Text fontSize="2xl" fontWeight="bold" color="green.500">
                          {attendanceStats?.present || 0}
                        </Text>
                        <Text fontSize="xs" color="gray.600">Present</Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="2xl" fontWeight="bold" color="red.500">
                          {attendanceStats?.absent || 0}
                        </Text>
                        <Text fontSize="xs" color="gray.600">Absent</Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                          {attendanceStats?.rate || '0'}%
                        </Text>
                        <Text fontSize="xs" color="gray.600">Rate</Text>
                      </Box>
                    </SimpleGrid>
                    <Divider />
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={() => navigate(`/children/${id}/attendance`)}
                    >
                      View Attendance History
                    </Button>
                  </VStack>
                </Card>
              </TabPanel>

              {/* Assessments Tab */}
              <TabPanel px={0}>
                <VStack spacing={3} align="stretch">
                  {assessments && assessments.length > 0 ? (
                    assessments.map((assessment: any, idx: number) => (
                      <Card key={idx}>
                        <VStack align="start" spacing={2}>
                          <HStack justify="space-between" w="full">
                            <Badge colorScheme="blue">
                              {assessment.assessment_type.charAt(0).toUpperCase() + assessment.assessment_type.slice(1)}
                            </Badge>
                            <Text fontSize="xs" color="gray.600">
                              {formatDate(assessment.assessment_date)}
                            </Text>
                          </HStack>
                          <SimpleGrid columns={2} spacing={4} w="full" mt={2}>
                            <Box>
                              <Text fontSize="xs" color="gray.600">Literacy</Text>
                              <Text fontSize="lg" fontWeight="bold">{assessment.literacy_score || 'N/A'}%</Text>
                            </Box>
                            <Box>
                              <Text fontSize="xs" color="gray.600">Numeracy</Text>
                              <Text fontSize="lg" fontWeight="bold">{assessment.numeracy_score || 'N/A'}%</Text>
                            </Box>
                          </SimpleGrid>
                        </VStack>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <Text color="gray.500" textAlign="center" py={4}>
                        No assessments recorded yet
                      </Text>
                    </Card>
                  )}
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => navigate('/assessments/new')}
                  >
                    Record New Assessment
                  </Button>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

