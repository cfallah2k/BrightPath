import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Icon
} from '@chakra-ui/react'
import { MdPerson, MdSchool, MdTrendingUp, MdWarning } from 'react-icons/md'
import Card from '../components/common/Card'
import Header from '../components/layout/Header'
import MobileLayout from '../components/layout/MobileLayout'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { testDataService } from '../services/testDataService'
import { getRecentChildren, formatChildName } from '../utils/testDataHelpers'
import { getSchoolById } from '../data/testData'

export default function Dashboard() {
  const { fieldWorker } = useAuthStore()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalChildren: 0,
    enrolled: 0,
    notEnrolled: 0,
    atRisk: 0,
    enrolledChange: 0,
    atRiskChange: 0,
  })
  const [recentChildren, setRecentChildren] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const statistics = await testDataService.getStatistics()
        const recent = getRecentChildren(3)
        
        setStats({
          totalChildren: statistics.total,
          enrolled: statistics.enrolled,
          notEnrolled: statistics.notEnrolled,
          atRisk: statistics.atRisk,
          enrolledChange: 12.5, // Mock change percentage
          atRiskChange: -5.2, // Mock change percentage
        })
        
        setRecentChildren(recent.map(child => ({
          id: child.id,
          name: formatChildName(child),
          status: child.enrollment_status,
          school: child.enrolled_school_id ? getSchoolById(child.enrolled_school_id)?.name : null,
          date: child.updated_at.split('T')[0]
        })))
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      }
    }
    
    loadData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled':
        return 'green'
      case 'at_risk':
        return 'orange'
      case 'not_enrolled':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <MobileLayout>
      <Header title="Dashboard" />
      <Box 
        px={{ base: 3, sm: 4, md: 6 }} 
        py={{ base: 4, md: 6 }}
        maxW="100%"
        overflowX="hidden"
      >
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          {/* Welcome Section */}
          <Box>
            <Heading size="lg" mb={2}>
              Welcome back, {fieldWorker?.name || 'User'}!
            </Heading>
            <Text color="gray.600">
              {fieldWorker?.role?.replace('_', ' ') || 'Field Worker'} • {fieldWorker?.assigned_region || 'Ghana'}
            </Text>
          </Box>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Card>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={MdPerson} color="teal.500" />
                    <Text>Total Children</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{stats.totalChildren.toLocaleString()}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {stats.enrolledChange}% this month
                </StatHelpText>
              </Stat>
            </Card>

            <Card>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={MdSchool} color="green.500" />
                    <Text>Enrolled</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="green.500">{stats.enrolled.toLocaleString()}</StatNumber>
                <StatHelpText>
                  {((stats.enrolled / stats.totalChildren) * 100).toFixed(1)}% of total
                </StatHelpText>
              </Stat>
            </Card>

            <Card>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={MdWarning} color="red.500" />
                    <Text>Not Enrolled</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="red.500">{stats.notEnrolled.toLocaleString()}</StatNumber>
                <StatHelpText>
                  Need intervention
                </StatHelpText>
              </Stat>
            </Card>

            <Card>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={MdTrendingUp} color="orange.500" />
                    <Text>At Risk</Text>
                  </HStack>
                </StatLabel>
                <StatNumber color="orange.500">{stats.atRisk.toLocaleString()}</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  {Math.abs(stats.atRiskChange)}% improvement
                </StatHelpText>
              </Stat>
            </Card>
          </SimpleGrid>

          {/* Recent Activity */}
          <Card>
            <Heading size="md" mb={4}>Recent Activity</Heading>
            <VStack spacing={3} align="stretch">
              {recentChildren.map((child) => (
                <Box
                  key={child.id}
                  p={3}
                  bg="gray.50"
                  borderRadius="md"
                  borderLeft="4px"
                  borderColor={getStatusColor(child.status) + '.500'}
                >
                  <HStack justify="space-between">
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="semibold">{child.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {child.school || 'No school assigned'}
                      </Text>
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <Badge colorScheme={getStatusColor(child.status)}>
                        {child.status.replace('_', ' ')}
                      </Badge>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(child.date).toLocaleDateString()}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Card>

          {/* Quick Actions */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Card 
              clickable
              onClick={() => navigate('/children/register')}
            >
              <VStack align="start" spacing={2}>
                <Heading size="sm">Register New Child</Heading>
                <Text fontSize="sm" color="gray.600">
                  Add a new child to the tracking system
                </Text>
              </VStack>
            </Card>
            <Card 
              clickable
              onClick={() => navigate('/attendance/record')}
            >
              <VStack align="start" spacing={2}>
                <Heading size="sm">Record Attendance</Heading>
                <Text fontSize="sm" color="gray.600">
                  Update daily attendance records
                </Text>
              </VStack>
            </Card>
          </SimpleGrid>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

