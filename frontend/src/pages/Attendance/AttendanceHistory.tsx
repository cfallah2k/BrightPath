import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Card,
  Flex,
  Spinner
} from '@chakra-ui/react'
import { MdSearch, MdCalendarToday, MdCheckCircle, MdCancel } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { testDataService } from '../../services/testDataService'
import { formatDate } from '../../utils/testDataHelpers'

export default function AttendanceHistory() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [period, setPeriod] = useState('30')
  const [searchQuery, setSearchQuery] = useState('')
  const [attendance, setAttendance] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAttendance = async () => {
      if (!id) return
      setIsLoading(true)
      try {
        const data = await testDataService.getAttendance(id, parseInt(period))
        setAttendance(data)
      } catch (error) {
        console.error('Failed to load attendance:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadAttendance()
  }, [id, period])

  const filteredAttendance = attendance.filter(att => {
    const matchesSearch = !searchQuery || att.date.includes(searchQuery)
    return matchesSearch
  })

  const stats = {
    total: filteredAttendance.length,
    present: filteredAttendance.filter(a => a.present).length,
    absent: filteredAttendance.filter(a => !a.present).length,
    rate: filteredAttendance.length > 0 
      ? (filteredAttendance.filter(a => a.present).length / filteredAttendance.length * 100).toFixed(1)
      : '0'
  }

  return (
    <MobileLayout>
      <Header 
        title="Attendance History" 
        showBack 
        onBack={() => navigate(`/children/${id}`)} 
      />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <VStack spacing={4} align="stretch">
          {/* Filters */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={3}>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <MdSearch color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search by date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              w={{ base: 'full', md: '200px' }}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="all">All time</option>
            </Select>
          </Flex>

          {/* Stats */}
          <Card>
            <SimpleGrid columns={4} spacing={4}>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold">{stats.total}</Text>
                <Text fontSize="xs" color="gray.600">Total Days</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="green.500">{stats.present}</Text>
                <Text fontSize="xs" color="gray.600">Present</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="red.500">{stats.absent}</Text>
                <Text fontSize="xs" color="gray.600">Absent</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="teal.500">{stats.rate}%</Text>
                <Text fontSize="xs" color="gray.600">Rate</Text>
              </Box>
            </SimpleGrid>
          </Card>

          {/* Attendance List */}
          {isLoading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" color="teal.500" />
            </Box>
          ) : (
            <VStack spacing={3} align="stretch">
              {filteredAttendance.map((att) => (
                <Card key={att.id}>
                  <HStack justify="space-between">
                    <HStack spacing={3}>
                      {att.present ? (
                        <MdCheckCircle size="24px" color="green" />
                      ) : (
                        <MdCancel size="24px" color="red" />
                      )}
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold">
                          {formatDate(att.date)}
                        </Text>
                        {!att.present && att.reason_for_absence && (
                          <Text fontSize="sm" color="gray.600">
                            Reason: {att.reason_for_absence}
                          </Text>
                        )}
                      </VStack>
                    </HStack>
                    <Badge colorScheme={att.present ? 'green' : 'red'}>
                      {att.present ? 'Present' : 'Absent'}
                    </Badge>
                  </HStack>
                </Card>
              ))}
            </VStack>
          )}

          {!isLoading && filteredAttendance.length === 0 && (
            <Card>
              <VStack py={8} spacing={2}>
                <MdCalendarToday size="48px" color="gray.400" />
                <Text color="gray.500">No attendance records found</Text>
              </VStack>
            </Card>
          )}
        </VStack>
      </Box>
    </MobileLayout>
  )
}
