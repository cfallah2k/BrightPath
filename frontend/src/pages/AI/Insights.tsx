import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Card,
  Badge,
  Progress,
  Icon,
  Flex,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { MdTrendingUp, MdWarning, MdInsights, MdLightbulb, MdBarChart, MdPeople } from 'react-icons/md'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { useAuthStore } from '../../store/authStore'
import { testDataService } from '../../services/testDataService'

interface AIInsight {
  id: string
  type: 'risk' | 'opportunity' | 'trend' | 'recommendation'
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  confidence: number
  actionItems: string[]
  affectedCount: number
}

export default function AIInsights() {
  const { fieldWorker } = useAuthStore()
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalInsights: 0,
    highPriority: 0,
    childrenAtRisk: 0,
    interventionSuccess: 0
  })

  useEffect(() => {
    loadInsights()
  }, [])

  const loadInsights = async () => {
    setIsLoading(true)
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockInsights: AIInsight[] = [
        {
          id: 'insight-1',
          type: 'risk',
          title: 'High Dropout Risk Detected',
          description: 'AI analysis shows 3 children in Greater Accra region have 85% probability of dropping out within the next 30 days based on attendance patterns and family indicators.',
          severity: 'high',
          confidence: 87,
          actionItems: [
            'Schedule immediate home visits',
            'Engage with parents/guardians',
            'Provide additional learning support',
            'Monitor attendance daily'
          ],
          affectedCount: 3
        },
        {
          id: 'insight-2',
          type: 'opportunity',
          title: 'Enrollment Opportunity Identified',
          description: '5 children in Ashanti region show readiness indicators for enrollment. Family economic conditions have improved, and children express interest in returning to school.',
          severity: 'medium',
          confidence: 72,
          actionItems: [
            'Contact families for enrollment discussion',
            'Prepare enrollment documentation',
            'Coordinate with nearby schools',
            'Schedule enrollment assessment'
          ],
          affectedCount: 5
        },
        {
          id: 'insight-3',
          type: 'trend',
          title: 'Positive Attendance Trend',
          description: 'Attendance rates have improved by 15% in the Northern region over the past month. AI attributes this to the recent intervention programs.',
          severity: 'low',
          confidence: 91,
          actionItems: [
            'Continue current intervention strategies',
            'Share best practices with other regions',
            'Document successful approaches'
          ],
          affectedCount: 12
        },
        {
          id: 'insight-4',
          type: 'recommendation',
          title: 'Optimal Intervention Timing',
          description: 'AI recommends scheduling assessments during morning hours (8-10 AM) when children show highest engagement levels based on historical data.',
          severity: 'medium',
          confidence: 68,
          actionItems: [
            'Adjust assessment schedules',
            'Train field workers on optimal timing',
            'Update assessment protocols'
          ],
          affectedCount: 0
        }
      ]

      setInsights(mockInsights)
      setStats({
        totalInsights: mockInsights.length,
        highPriority: mockInsights.filter(i => i.severity === 'high').length,
        childrenAtRisk: mockInsights.filter(i => i.type === 'risk').reduce((sum, i) => sum + i.affectedCount, 0),
        interventionSuccess: 78
      })
    } catch (error) {
      console.error('Failed to load AI insights:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'red'
      case 'medium': return 'orange'
      case 'low': return 'green'
      default: return 'gray'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'risk': return MdWarning
      case 'opportunity': return MdLightbulb
      case 'trend': return MdTrendingUp
      case 'recommendation': return MdInsights
      default: return MdBarChart
    }
  }

  return (
    <MobileLayout>
      <Header title="AI Insights" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          {/* AI Stats Overview */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Card p={4}>
              <Stat>
                <StatLabel>Total Insights</StatLabel>
                <StatNumber>{stats.totalInsights}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  AI Generated
                </StatHelpText>
              </Stat>
            </Card>
            <Card p={4}>
              <Stat>
                <StatLabel>High Priority</StatLabel>
                <StatNumber color="red.500">{stats.highPriority}</StatNumber>
                <StatHelpText>Requires Action</StatHelpText>
              </Stat>
            </Card>
            <Card p={4}>
              <Stat>
                <StatLabel>At Risk</StatLabel>
                <StatNumber color="orange.500">{stats.childrenAtRisk}</StatNumber>
                <StatHelpText>Children Identified</StatHelpText>
              </Stat>
            </Card>
            <Card p={4}>
              <Stat>
                <StatLabel>Success Rate</StatLabel>
                <StatNumber color="green.500">{stats.interventionSuccess}%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Interventions
                </StatHelpText>
              </Stat>
            </Card>
          </SimpleGrid>

          {/* AI Insights List */}
          <VStack spacing={4} align="stretch">
            <Heading size="md">AI-Generated Insights</Heading>
            {isLoading ? (
              <Card p={8} textAlign="center">
                <Text color="gray.500">Analyzing data with AI...</Text>
              </Card>
            ) : (
              insights.map((insight) => {
                const IconComponent = getTypeIcon(insight.type)
                return (
                  <Card key={insight.id} p={5}>
                    <VStack align="stretch" spacing={4}>
                      <Flex justify="space-between" align="start">
                        <HStack spacing={3}>
                          <Icon as={IconComponent} boxSize={6} color={`${getSeverityColor(insight.severity)}.500`} />
                          <VStack align="start" spacing={0}>
                            <Heading size="sm">{insight.title}</Heading>
                            <HStack spacing={2}>
                              <Badge colorScheme={getSeverityColor(insight.severity)}>
                                {insight.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">
                                {insight.confidence}% Confidence
                              </Badge>
                            </HStack>
                          </VStack>
                        </HStack>
                      </Flex>

                      <Text color="gray.600" fontSize="sm">
                        {insight.description}
                      </Text>

                      {insight.affectedCount > 0 && (
                        <Alert status="info" borderRadius="md">
                          <AlertIcon />
                          <Box>
                            <AlertTitle fontSize="sm">
                              {insight.affectedCount} {insight.affectedCount === 1 ? 'Child' : 'Children'} Affected
                            </AlertTitle>
                          </Box>
                        </Alert>
                      )}

                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>
                          Recommended Actions:
                        </Text>
                        <VStack align="stretch" spacing={2}>
                          {insight.actionItems.map((item, index) => (
                            <HStack key={index} spacing={2}>
                              <Box
                                w="6px"
                                h="6px"
                                borderRadius="full"
                                bg={`${getSeverityColor(insight.severity)}.500`}
                              />
                              <Text fontSize="sm" color="gray.700">
                                {item}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>

                      <HStack justify="space-between" pt={2} borderTop="1px" borderColor="gray.200">
                        <Text fontSize="xs" color="gray.500">
                          AI Confidence: {insight.confidence}%
                        </Text>
                        <Button size="sm" colorScheme="teal" variant="outline">
                          Take Action
                        </Button>
                      </HStack>
                    </VStack>
                  </Card>
                )
              })
            )}
          </VStack>

          {/* AI Explanation */}
          <Card p={5} bgGradient="linear(to-r, teal.50, blue.50)">
            <HStack spacing={3} mb={3}>
              <Icon as={MdInsights} boxSize={6} color="teal.600" />
              <Heading size="sm" color="teal.700">
                How AI Works Here
              </Heading>
            </HStack>
            <Text fontSize="sm" color="gray.700" mb={3}>
              Our AI system analyzes patterns in attendance, enrollment data, family indicators, and historical trends to identify:
            </Text>
            <VStack align="stretch" spacing={2}>
              <HStack spacing={2}>
                <Icon as={MdWarning} color="red.500" />
                <Text fontSize="sm">Early warning signs for at-risk children</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={MdLightbulb} color="orange.500" />
                <Text fontSize="sm">Opportunities for enrollment and intervention</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={MdTrendingUp} color="green.500" />
                <Text fontSize="sm">Trends and patterns in educational outcomes</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={MdPeople} color="blue.500" />
                <Text fontSize="sm">Optimal strategies for each child's situation</Text>
              </HStack>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

