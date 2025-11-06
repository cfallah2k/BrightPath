import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Card,
  Progress,
  SimpleGrid,
  Badge
} from '@chakra-ui/react'
import { 
  MdPerson, 
  MdSchool, 
  MdAdminPanelSettings, 
  MdSupervisorAccount,
  MdCheckCircle,
  MdPlayArrow,
  MdArrowForward
} from 'react-icons/md'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { useAuthStore } from '../../store/authStore'

interface TutorialStep {
  id: string
  title: string
  description: string
  icon: any
  duration: string
  completed: boolean
}

interface TutorialModule {
  id: string
  title: string
  description: string
  icon: any
  steps: TutorialStep[]
  color: string
}

export default function Tutorial() {
  const { fieldWorker } = useAuthStore()
  const navigate = useNavigate()

  const role = fieldWorker?.role || 'field_worker'

  const modules: TutorialModule[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using BrightPath',
      icon: MdPlayArrow,
      color: 'teal',
      steps: [
        {
          id: 'step-1',
          title: 'Welcome to BrightPath',
          description: 'Introduction to the app and its features',
          icon: MdPlayArrow,
          duration: '2 min',
          completed: false
        },
        {
          id: 'step-2',
          title: 'Navigation Basics',
          description: 'How to navigate through the app',
          icon: MdPlayArrow,
          duration: '3 min',
          completed: false
        },
        {
          id: 'step-3',
          title: 'Your Dashboard',
          description: 'Understanding your personalized dashboard',
          icon: MdPlayArrow,
          duration: '2 min',
          completed: false
        }
      ]
    },
    {
      id: 'child-management',
      title: 'Child Management',
      description: 'Register and manage children records',
      icon: MdPerson,
      color: 'blue',
      steps: [
        {
          id: 'step-4',
          title: 'Registering a Child',
          description: 'Step-by-step guide to register new children',
          icon: MdPerson,
          duration: '5 min',
          completed: false
        },
        {
          id: 'step-5',
          title: 'Viewing Child Details',
          description: 'Access and understand child information',
          icon: MdPerson,
          duration: '3 min',
          completed: false
        },
        {
          id: 'step-6',
          title: 'Editing Child Records',
          description: 'Update child information and status',
          icon: MdPerson,
          duration: '4 min',
          completed: false
        }
      ]
    },
    {
      id: 'attendance',
      title: 'Attendance Tracking',
      description: 'Record and monitor attendance',
      icon: MdCheckCircle,
      color: 'green',
      steps: [
        {
          id: 'step-7',
          title: 'Recording Attendance',
          description: 'How to record daily attendance',
          icon: MdCheckCircle,
          duration: '3 min',
          completed: false
        },
        {
          id: 'step-8',
          title: 'Batch Attendance',
          description: 'Record attendance for multiple children',
          icon: MdCheckCircle,
          duration: '4 min',
          completed: false
        },
        {
          id: 'step-9',
          title: 'Attendance Reports',
          description: 'View and analyze attendance data',
          icon: MdCheckCircle,
          duration: '3 min',
          completed: false
        }
      ]
    },
    {
      id: 'assessments',
      title: 'Learning Assessments',
      description: 'Conduct and track learning assessments',
      icon: MdSchool,
      color: 'purple',
      steps: [
        {
          id: 'step-10',
          title: 'Creating Assessments',
          description: 'How to create new learning assessments',
          icon: MdSchool,
          duration: '4 min',
          completed: false
        },
        {
          id: 'step-11',
          title: 'Assessment Types',
          description: 'Understanding different assessment types',
          icon: MdSchool,
          duration: '3 min',
          completed: false
        },
        {
          id: 'step-12',
          title: 'Tracking Progress',
          description: 'Monitor learning progress over time',
          icon: MdSchool,
          duration: '3 min',
          completed: false
        }
      ]
    },
    {
      id: 'ai-features',
      title: 'AI Features',
      description: 'Leverage AI insights and recommendations',
      icon: MdAdminPanelSettings,
      color: 'orange',
      steps: [
        {
          id: 'step-13',
          title: 'AI Insights Dashboard',
          description: 'Understanding AI-generated insights',
          icon: MdAdminPanelSettings,
          duration: '4 min',
          completed: false
        },
        {
          id: 'step-14',
          title: 'AI Recommendations',
          description: 'How to use AI recommendations',
          icon: MdAdminPanelSettings,
          duration: '3 min',
          completed: false
        },
        {
          id: 'step-15',
          title: 'Smart Alerts',
          description: 'Configure and manage AI alerts',
          icon: MdAdminPanelSettings,
          duration: '3 min',
          completed: false
        }
      ]
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      description: 'Generate and analyze reports',
      icon: MdSupervisorAccount,
      color: 'red',
      steps: [
        {
          id: 'step-16',
          title: 'Viewing Reports',
          description: 'Access and understand reports',
          icon: MdSupervisorAccount,
          duration: '3 min',
          completed: false
        },
        {
          id: 'step-17',
          title: 'Exporting Data',
          description: 'Export reports and data',
          icon: MdSupervisorAccount,
          duration: '2 min',
          completed: false
        },
        {
          id: 'step-18',
          title: 'Analytics Dashboard',
          description: 'Using the analytics dashboard',
          icon: MdSupervisorAccount,
          duration: '4 min',
          completed: false
        }
      ]
    }
  ]

  const totalSteps = modules.reduce((sum, module) => sum + module.steps.length, 0)
  const completedSteps = modules.reduce(
    (sum, module) => sum + module.steps.filter(s => s.completed).length,
    0
  )
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  const handleStartModule = (moduleId: string) => {
    navigate(`/tutorial/${moduleId}`)
  }

  return (
    <MobileLayout>
      <Header title="Tutorials & Guides" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          {/* Progress Overview */}
          <Card p={5}>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Heading size="md">Your Progress</Heading>
                <Badge colorScheme="teal" fontSize="md">
                  {completedSteps}/{totalSteps} Completed
                </Badge>
              </HStack>
              <Progress value={progress} colorScheme="teal" size="lg" borderRadius="full" />
              <Text fontSize="sm" color="gray.600">
                {Math.round(progress)}% Complete
              </Text>
            </VStack>
          </Card>

          {/* Role-specific Welcome */}
          <Card p={5} bgGradient={`linear(to-r, ${modules[0].color}.50, ${modules[0].color}.100)`}>
            <HStack spacing={3}>
              <Icon as={MdPerson} boxSize={8} color={`${modules[0].color}.600`} />
              <VStack align="start" spacing={1} flex={1}>
                <Heading size="sm" color={`${modules[0].color}.700`}>
                  Welcome, {fieldWorker?.name || 'User'}!
                </Heading>
                <Text fontSize="sm" color={`${modules[0].color}.600`}>
                  Learn how to use BrightPath effectively for your role as {role.replace('_', ' ')}
                </Text>
              </VStack>
            </HStack>
          </Card>

          {/* Tutorial Modules */}
          <VStack spacing={4} align="stretch">
            <Heading size="md">Available Tutorials</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {modules.map((module) => {
                const completedCount = module.steps.filter(s => s.completed).length
                const moduleProgress = (completedCount / module.steps.length) * 100
                const IconComponent = module.icon

                return (
                  <Card 
                    key={module.id} 
                    p={5}
                    cursor="pointer"
                    onClick={() => handleStartModule(module.id)}
                    _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <VStack align="stretch" spacing={4}>
                      <HStack spacing={3}>
                        <Box
                          p={3}
                          borderRadius="lg"
                          bg={`${module.color}.100`}
                          color={`${module.color}.600`}
                        >
                          <Icon as={IconComponent} boxSize={6} />
                        </Box>
                        <VStack align="start" spacing={0} flex={1}>
                          <Heading size="sm">{module.title}</Heading>
                          <Text fontSize="xs" color="gray.600">
                            {module.steps.length} lessons
                          </Text>
                        </VStack>
                        {moduleProgress === 100 && (
                          <Icon as={MdCheckCircle} boxSize={5} color="green.500" />
                        )}
                      </HStack>

                      <Text fontSize="sm" color="gray.600">
                        {module.description}
                      </Text>

                      <VStack align="stretch" spacing={2}>
                        <HStack justify="space-between">
                          <Text fontSize="xs" color="gray.500">
                            Progress
                          </Text>
                          <Text fontSize="xs" color="gray.600" fontWeight="semibold">
                            {completedCount}/{module.steps.length}
                          </Text>
                        </HStack>
                        <Progress 
                          value={moduleProgress} 
                          colorScheme={module.color} 
                          size="sm" 
                          borderRadius="full"
                        />
                      </VStack>

                      <Button
                        size="sm"
                        colorScheme={module.color}
                        rightIcon={<MdArrowForward />}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStartModule(module.id)
                        }}
                      >
                        {completedCount === 0 ? 'Start' : 'Continue'}
                      </Button>
                    </VStack>
                  </Card>
                )
              })}
            </SimpleGrid>
          </VStack>

          {/* Quick Tips */}
          <Card p={5} bg="blue.50">
            <VStack align="stretch" spacing={3}>
              <Heading size="sm" color="blue.700">
                💡 Quick Tips
              </Heading>
              <VStack align="stretch" spacing={2}>
                <Text fontSize="sm" color="blue.700">
                  • Use the search function to quickly find children
                </Text>
                <Text fontSize="sm" color="blue.700">
                  • Enable offline mode for areas with poor connectivity
                </Text>
                <Text fontSize="sm" color="blue.700">
                  • Check AI recommendations daily for actionable insights
                </Text>
                <Text fontSize="sm" color="blue.700">
                  • Export reports regularly for backup and sharing
                </Text>
              </VStack>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

