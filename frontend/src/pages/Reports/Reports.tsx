import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  Select,
  HStack,
  Button,
  Spinner,
  useToast
} from '@chakra-ui/react'
import { MdDownload } from 'react-icons/md'
import { useState, useEffect } from 'react'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { testDataService } from '../../services/testDataService'
import { testChildren } from '../../data/testData'

export default function Reports() {
  const toast = useToast()
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [regionFilter, setRegionFilter] = useState('all')


  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true)
      try {
        const data = await testDataService.getStatistics({
          region: regionFilter !== 'all' ? regionFilter : undefined
        })
        setStats(data)
      } catch (error) {
        console.error('Failed to load statistics:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadStats()
  }, [regionFilter])

  // Calculate disaggregated data
  const calculateDisaggregated = () => {
    const filtered = regionFilter === 'all' 
      ? testChildren 
      : testChildren.filter(c => c.location.region === regionFilter)
    
    const male = filtered.filter(c => c.gender === 'male').length
    const female = filtered.filter(c => c.gender === 'female').length
    const withDisability = filtered.filter(c => c.disability_status).length
    const withoutDisability = filtered.length - withDisability
    
    // Simple urban/rural split (using region as proxy)
    const urban = filtered.filter(c => 
      ['Montserrado', 'Nimba'].includes(c.location.region)
    ).length
    const rural = filtered.length - urban
    
    // Poverty distribution
    const poorest = filtered.filter(c => c.household_poverty_indicator === 'poorest').length
    const richest = filtered.filter(c => c.household_poverty_indicator === 'richest').length
    
    return {
      male: ((male / filtered.length) * 100).toFixed(1),
      female: ((female / filtered.length) * 100).toFixed(1),
      withDisability: ((withDisability / filtered.length) * 100).toFixed(1),
      withoutDisability: ((withoutDisability / filtered.length) * 100).toFixed(1),
      urban: ((urban / filtered.length) * 100).toFixed(1),
      rural: ((rural / filtered.length) * 100).toFixed(1),
      poorest: ((poorest / filtered.length) * 100).toFixed(1),
      richest: ((richest / filtered.length) * 100).toFixed(1),
    }
  }

  const disaggregated = stats ? calculateDisaggregated() : null

  const handleExport = () => {
    if (!stats || !disaggregated) {
      toast({
        title: 'No Data',
        description: 'Please wait for data to load',
        status: 'warning',
        duration: 3000,
      })
      return
    }

    // Create CSV data
    const csvData = [
      ['Metric', 'Value'],
      ['Total Children', stats?.total || 0],
      ['Enrolled', stats?.enrolled || 0],
      ['Not Enrolled', stats?.notEnrolled || 0],
      ['At Risk', stats?.atRisk || 0],
      ['Enrollment Rate', `${stats?.enrollmentRate || 0}%`],
      ['Retention Rate', `${stats?.retentionRate || 0}%`],
      ['', ''],
      ['Disaggregated Data', ''],
      ['Male', `${disaggregated?.male || 0}%`],
      ['Female', `${disaggregated?.female || 0}%`],
      ['With Disability', `${disaggregated?.withDisability || 0}%`],
      ['Without Disability', `${disaggregated?.withoutDisability || 0}%`],
      ['Urban', `${disaggregated?.urban || 0}%`],
      ['Rural', `${disaggregated?.rural || 0}%`],
      ['Poorest', `${disaggregated?.poorest || 0}%`],
      ['Richest', `${disaggregated?.richest || 0}%`],
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `brightpath-report-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: 'Export Successful',
      description: 'Report data has been downloaded as CSV',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <MobileLayout>
      <Header title="Reports & Analytics" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="md">Analytics Dashboard</Heading>
            <Select 
              w="200px" 
              size="sm"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="all">All Regions</option>
              <option value="Montserrado">Montserrado</option>
              <option value="Nimba">Nimba</option>
              <option value="Bong">Bong</option>
              <option value="Lofa">Lofa</option>
              <option value="Grand Bassa">Grand Bassa</option>
              <option value="Margibi">Margibi</option>
              <option value="Grand Cape Mount">Grand Cape Mount</option>
              <option value="Sinoe">Sinoe</option>
              <option value="Grand Gedeh">Grand Gedeh</option>
              <option value="Maryland">Maryland</option>
              <option value="Grand Kru">Grand Kru</option>
              <option value="River Cess">River Cess</option>
              <option value="River Gee">River Gee</option>
              <option value="Bomi">Bomi</option>
              <option value="Gbarpolu">Gbarpolu</option>
            </Select>
          </HStack>

          {isLoading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" color="teal.500" />
            </Box>
          ) : stats && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Card>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">Enrollment Rate</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="green.500">
                    {stats.enrollmentRate}%
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {stats.enrolled} of {stats.total} children enrolled
                  </Text>
                </VStack>
              </Card>

              <Card>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">Retention Rate</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="teal.500">
                    {stats.retentionRate}%
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {stats.enrolled} children retained
                  </Text>
                </VStack>
              </Card>

              <Card>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">Not Enrolled</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="red.500">
                    {stats.notEnrolled}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Need intervention
                  </Text>
                </VStack>
              </Card>

              <Card>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">At Risk</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                    {stats.atRisk}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Require monitoring
                  </Text>
                </VStack>
              </Card>
            </SimpleGrid>
          )}

          {disaggregated && (
            <Card>
              <VStack align="start" spacing={4}>
                <HStack justify="space-between" w="full">
                  <Heading size="sm">Disaggregated Data</Heading>
                  <Button
                    leftIcon={<MdDownload />}
                    size="sm"
                    variant="outline"
                    onClick={handleExport}
                  >
                    Export
                  </Button>
                </HStack>
                
                <SimpleGrid columns={2} spacing={4} w="full">
                  <Box>
                    <Text fontSize="xs" color="gray.600">By Gender</Text>
                    <Text fontSize="sm" mt={1}>Male: {disaggregated.male}%</Text>
                    <Text fontSize="sm">Female: {disaggregated.female}%</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.600">By Disability</Text>
                    <Text fontSize="sm" mt={1}>With Disability: {disaggregated.withDisability}%</Text>
                    <Text fontSize="sm">Without: {disaggregated.withoutDisability}%</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.600">By Location</Text>
                    <Text fontSize="sm" mt={1}>Urban: {disaggregated.urban}%</Text>
                    <Text fontSize="sm">Rural: {disaggregated.rural}%</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.600">By Poverty</Text>
                    <Text fontSize="sm" mt={1}>Poorest: {disaggregated.poorest}%</Text>
                    <Text fontSize="sm">Richest: {disaggregated.richest}%</Text>
                  </Box>
                </SimpleGrid>
              </VStack>
            </Card>
          )}
        </VStack>
      </Box>
    </MobileLayout>
  )
}

