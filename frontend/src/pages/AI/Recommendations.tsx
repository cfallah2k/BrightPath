import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Card,
  Badge,
  Button,
  Icon,
  Flex,
  SimpleGrid,
  Progress,
  Alert,
  AlertIcon,
  Divider
} from '@chakra-ui/react'
import { MdLightbulb, MdCheckCircle, MdSchedule, MdPerson, MdSchool, MdTrendingUp } from 'react-icons/md'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { useAuthStore } from '../../store/authStore'

interface Recommendation {
  id: string
  childId?: string
  childName?: string
  type: 'enrollment' | 'intervention' | 'support' | 'assessment'
  title: string
  description: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  estimatedImpact: number
  effort: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed'
  aiConfidence: number
  suggestedActions: string[]
}

export default function AIRecommendations() {
  const { fieldWorker } = useAuthStore()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [filter, setFilter] = useState<'all' | 'urgent' | 'high' | 'medium' | 'low'>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockRecommendations: Recommendation[] = [
        {
          id: 'rec-1',
          childId: 'child-002',
          childName: 'Ama Mensah',
          type: 'intervention',
          title: 'Immediate Home Visit Recommended',
          description: 'AI detected irregular attendance pattern. Child has missed 5 consecutive days. Family engagement is critical to prevent dropout.',
          priority: 'urgent',
          estimatedImpact: 92,
          effort: 'medium',
          status: 'pending',
          aiConfidence: 89,
          suggestedActions: [
            'Schedule home visit within 24 hours',
            'Assess family situation and barriers',
            'Provide emergency learning materials',
            'Connect with local support services'
          ]
        },
        {
          id: 'rec-2',
          childId: 'child-005',
          childName: 'Kwame Asante',
          type: 'enrollment',
          title: 'Ready for School Enrollment',
          description: 'Child shows strong readiness indicators. Family economic situation has stabilized. High probability of successful enrollment.',
          priority: 'high',
          estimatedImpact: 85,
          effort: 'low',
          status: 'pending',
          aiConfidence: 76,
          suggestedActions: [
            'Contact family to discuss enrollment',
            'Prepare enrollment documentation',
            'Coordinate with nearest school',
            'Schedule enrollment assessment'
          ]
        },
        {
          id: 'rec-3',
          childId: 'child-001',
          childName: 'Efua Boateng',
          type: 'support',
          title: 'Additional Learning Support Needed',
          description: 'Assessment scores indicate child needs targeted literacy support. Early intervention will improve learning outcomes.',
          priority: 'high',
          estimatedImpact: 78,
          effort: 'medium',
          status: 'in_progress',
          aiConfidence: 82,
          suggestedActions: [
            'Assign dedicated learning support',
            'Provide age-appropriate reading materials',
            'Schedule weekly progress check-ins',
            'Engage parents in learning activities'
          ]
        },
        {
          id: 'rec-4',
          type: 'assessment',
          title: 'Batch Assessment Opportunity',
          description: 'AI recommends conducting assessments for 8 children in the same community to optimize field worker time and resources.',
          priority: 'medium',
          estimatedImpact: 65,
          effort: 'low',
          status: 'pending',
          aiConfidence: 71,
          suggestedActions: [
            'Schedule group assessment session',
            'Prepare assessment materials',
            'Notify families in advance',
            'Coordinate with community center'
          ]
        }
      ]

      setRecommendations(mockRecommendations)
    } catch (error) {
      console.error('Failed to load recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'red'
      case 'high': return 'orange'
      case 'medium': return 'blue'
      case 'low': return 'gray'
      default: return 'gray'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'enrollment': return MdSchool
      case 'intervention': return MdPerson
      case 'support': return MdLightbulb
      case 'assessment': return MdSchedule
      default: return MdLightbulb
    }
  }

  const filteredRecommendations = filter === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.priority === filter)

  const handleAccept = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => rec.id === id ? { ...rec, status: 'in_progress' as const } : rec)
    )
  }

  const handleComplete = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => rec.id === id ? { ...rec, status: 'completed' as const } : rec)
    )
  }

  return (
    <MobileLayout>
      <Header title="AI Recommendations" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          {/* Filter Tabs */}
          <HStack spacing={2} overflowX="auto" pb={2}>
            {['all', 'urgent', 'high', 'medium', 'low'].map((priority) => (
              <Button
                key={priority}
                size="sm"
                variant={filter === priority ? 'solid' : 'outline'}
                colorScheme={filter === priority ? getPriorityColor(priority) : 'gray'}
                onClick={() => setFilter(priority as any)}
                textTransform="capitalize"
              >
                {priority}
              </Button>
            ))}
          </HStack>

          {/* Recommendations List */}
          {isLoading ? (
            <Card p={8} textAlign="center">
              <Text color="gray.500">AI is analyzing and generating recommendations...</Text>
            </Card>
          ) : (
            <VStack spacing={4} align="stretch">
              {filteredRecommendations.map((rec) => {
                const IconComponent = getTypeIcon(rec.type)
                return (
                  <Card key={rec.id} p={5}>
                    <VStack align="stretch" spacing={4}>
                      <Flex justify="space-between" align="start">
                        <HStack spacing={3} flex={1}>
                          <Icon 
                            as={IconComponent} 
                            boxSize={6} 
                            color={`${getPriorityColor(rec.priority)}.500`} 
                          />
                          <VStack align="start" spacing={1} flex={1}>
                            <Heading size="sm">{rec.title}</Heading>
                            {rec.childName && (
                              <Text fontSize="xs" color="gray.600">
                                For: {rec.childName}
                              </Text>
                            )}
                            <HStack spacing={2}>
                              <Badge colorScheme={getPriorityColor(rec.priority)}>
                                {rec.priority.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">
                                {rec.aiConfidence}% AI Confidence
                              </Badge>
                              {rec.status === 'completed' && (
                                <Badge colorScheme="green">
                                  <Icon as={MdCheckCircle} mr={1} />
                                  Completed
                                </Badge>
                              )}
                            </HStack>
                          </VStack>
                        </HStack>
                      </Flex>

                      <Text color="gray.600" fontSize="sm">
                        {rec.description}
                      </Text>

                      <SimpleGrid columns={2} spacing={4}>
                        <Box>
                          <Text fontSize="xs" color="gray.500" mb={1}>
                            Estimated Impact
                          </Text>
                          <Progress 
                            value={rec.estimatedImpact} 
                            colorScheme="teal" 
                            size="sm" 
                            borderRadius="full"
                          />
                          <Text fontSize="xs" color="gray.600" mt={1}>
                            {rec.estimatedImpact}%
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color="gray.500" mb={1}>
                            Effort Required
                          </Text>
                          <Badge 
                            colorScheme={rec.effort === 'low' ? 'green' : rec.effort === 'medium' ? 'orange' : 'red'}
                            textTransform="capitalize"
                          >
                            {rec.effort} Effort
                          </Badge>
                        </Box>
                      </SimpleGrid>

                      <Divider />

                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>
                          Suggested Actions:
                        </Text>
                        <VStack align="stretch" spacing={2}>
                          {rec.suggestedActions.map((action, index) => (
                            <HStack key={index} spacing={2}>
                              <Icon as={MdCheckCircle} color="teal.500" boxSize={4} />
                              <Text fontSize="sm" color="gray.700">
                                {action}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>

                      <HStack spacing={2} pt={2}>
                        {rec.status === 'pending' && (
                          <Button 
                            size="sm" 
                            colorScheme="teal" 
                            flex={1}
                            onClick={() => handleAccept(rec.id)}
                          >
                            Accept Recommendation
                          </Button>
                        )}
                        {rec.status === 'in_progress' && (
                          <>
                            <Button 
                              size="sm" 
                              colorScheme="green" 
                              flex={1}
                              onClick={() => handleComplete(rec.id)}
                            >
                              Mark Complete
                            </Button>
                            <Button size="sm" variant="outline" flex={1}>
                              View Details
                            </Button>
                          </>
                        )}
                        {rec.status === 'completed' && (
                          <Alert status="success" borderRadius="md">
                            <AlertIcon />
                            <Text fontSize="sm">Recommendation completed</Text>
                          </Alert>
                        )}
                      </HStack>
                    </VStack>
                  </Card>
                )
              })}
            </VStack>
          )}

          {filteredRecommendations.length === 0 && !isLoading && (
            <Card p={8} textAlign="center">
              <Icon as={MdLightbulb} boxSize={12} color="gray.300" mb={4} />
              <Text color="gray.500">No recommendations found for this filter</Text>
            </Card>
          )}
        </VStack>
      </Box>
    </MobileLayout>
  )
}

