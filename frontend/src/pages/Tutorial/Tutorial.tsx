import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  Badge,
  Divider,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
  Image,
  Flex,
  useToast
} from '@chakra-ui/react'
import { 
  MdPerson, 
  MdSchool, 
  MdAdminPanelSettings, 
  MdSupervisorAccount,
  MdCheckCircle,
  MdPlayArrow,
  MdArrowForward,
  MdArrowBack,
  MdLocationOn,
  MdBarChart,
  MdInsights,
  MdChat,
  MdMap
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

interface StepContent {
  overview: string
  instructions: string[]
  tips?: string[]
  relatedFeatures?: string[]
}

const getStepContent = (moduleId: string, stepId: string): StepContent => {
  const contentMap: Record<string, StepContent> = {}
  
  // Getting Started Module
  contentMap['getting-started-step-1'] = {
      overview: 'Welcome to BrightPath! This app helps you track out-of-school children, monitor their enrollment, attendance, and learning progress. BrightPath is designed to work offline, so you can use it even in areas with poor internet connectivity.',
      instructions: [
        'BrightPath is a mobile-first application that works on smartphones and tablets',
        'The app automatically saves your work, so you can continue even if you lose connection',
        'All data is securely stored and can be synced when you have internet',
        'You can install the app on your device for quick access (PWA)',
        'The app adapts to your role, showing relevant features and data'
      ],
      tips: [
        'Bookmark the app on your home screen for quick access',
        'Enable notifications to stay updated on important alerts',
        'Use offline mode when working in remote areas'
      ],
      relatedFeatures: ['Dashboard', 'Profile', 'Settings']
    },
    'getting-started-step-2': {
      overview: 'Learn how to navigate through BrightPath efficiently. The app has a simple, intuitive interface designed for easy use on mobile devices.',
      instructions: [
        'Bottom Navigation (Mobile): Use the bottom bar to access main sections - Home, Children, AI Insights, Reports, and Profile',
        'Top Header: Contains the page title, notifications, and your profile menu',
        'Back Button: Use the back button or swipe back to return to previous pages',
        'Search: Use the search icon to quickly find children, schools, or other data',
        'Menu: Tap your profile picture to access settings, tutorials, and logout'
      ],
      tips: [
        'Swipe left/right on mobile to navigate between related pages',
        'Use the search function frequently to save time',
        'The bottom navigation stays visible on most pages for quick access'
      ],
      relatedFeatures: ['Navigation', 'Search', 'Menu']
    },
    'getting-started-step-3': {
      overview: 'Your dashboard is personalized based on your role. It shows key statistics, quick actions, and important updates at a glance.',
      instructions: [
        'Statistics Cards: View total children, enrollment rates, and key metrics',
        'Quick Actions: Access common tasks like registering a child or recording attendance',
        'Recent Activity: See your recent actions and updates',
        'AI Insights: Get AI-powered recommendations and alerts',
        'Notifications: Check for important updates and alerts'
      ],
      tips: [
        'Check your dashboard daily for new insights and recommendations',
        'Use quick actions to save time on common tasks',
        'Customize your dashboard view in settings'
      ],
      relatedFeatures: ['Dashboard', 'Statistics', 'Quick Actions']
    },
    'child-management-step-4': {
      overview: 'Registering children is one of the most important tasks. This guide will walk you through the complete registration process.',
      instructions: [
        'Navigate to Children → Register New Child',
        'Fill in basic information: First name, Last name, Date of birth, Gender',
        'Select location: Region, District, Community (or use map to select exact coordinates)',
        'Add additional information: Disability status, Poverty indicator, Barriers to education',
        'Review all information before submitting',
        'Click "Register Child" to save the record'
      ],
      tips: [
        'Use the map feature to get accurate GPS coordinates for the child\'s location',
        'Be thorough when documenting barriers - this helps with interventions',
        'You can save a draft and complete registration later if needed'
      ],
      relatedFeatures: ['Register Child', 'Location Map', 'Child Form']
    },
    'child-management-step-5': {
      overview: 'Viewing child details gives you complete information about a child, including their enrollment status, attendance history, and assessments.',
      instructions: [
        'Go to Children list and tap on any child\'s name',
        'View the Overview tab: Personal info, location, enrollment status, barriers',
        'Check Attendance tab: See attendance history, rates, and patterns',
        'Review Assessments tab: View learning assessments and progress over time',
        'Use the "Track Location" button to see the child\'s location on a map',
        'Click "Edit" to update child information'
      ],
      tips: [
        'Regularly check attendance patterns to identify at-risk children',
        'Review assessment progress to track learning outcomes',
        'Use location tracking to verify addresses and plan visits'
      ],
      relatedFeatures: ['Child Details', 'Location Tracker', 'Attendance History']
    },
    'child-management-step-6': {
      overview: 'Keeping child records up-to-date is crucial. Learn how to edit and update child information efficiently.',
      instructions: [
        'From child details page, click the "Edit" button',
        'Update any field that needs correction: name, date of birth, location, etc.',
        'Change enrollment status if the child enrolls or drops out',
        'Update barriers if circumstances change',
        'Modify location if the family moves',
        'Save changes when done'
      ],
      tips: [
        'Update enrollment status immediately when a child enrolls in school',
        'Keep location information current for accurate tracking',
        'Document all changes with notes when possible'
      ],
      relatedFeatures: ['Edit Child', 'Update Status', 'Location Update']
    },
    'attendance-step-7': {
      overview: 'Recording daily attendance helps track which children are actively participating and identify those at risk.',
      instructions: [
        'Navigate to Attendance → Record Attendance',
        'Select the date for attendance recording',
        'Choose a child from the list or search for a specific child',
        'Mark as Present or Absent',
        'If absent, select a reason: Illness, Family issues, Distance, Other',
        'Add any notes about the attendance',
        'Save the attendance record'
      ],
      tips: [
        'Record attendance daily for accurate tracking',
        'Document reasons for absences to identify patterns',
        'Use batch attendance for multiple children at once'
      ],
      relatedFeatures: ['Record Attendance', 'Attendance History', 'Batch Attendance']
    },
    'attendance-step-8': {
      overview: 'Batch attendance allows you to record attendance for multiple children at once, saving time during group activities.',
      instructions: [
        'Go to Attendance → Record Attendance',
        'Select "Batch Mode" or "Record for Multiple Children"',
        'Select all children who are present',
        'Mark remaining children as absent with reasons',
        'Review the summary before saving',
        'Submit to save all attendance records at once'
      ],
      tips: [
        'Use batch mode during school visits or group activities',
        'Double-check the list before submitting',
        'You can still edit individual records after batch submission'
      ],
      relatedFeatures: ['Batch Attendance', 'Group Recording', 'Attendance Summary']
    },
    'attendance-step-9': {
      overview: 'Attendance reports help you analyze patterns, identify trends, and spot children who need intervention.',
      instructions: [
        'Go to a child\'s detail page → Attendance tab',
        'View attendance rate percentage and trends',
        'See attendance calendar showing present/absent days',
        'Check attendance history with dates and reasons',
        'Use filters to view attendance by date range',
        'Export attendance data if needed'
      ],
      tips: [
        'Monitor attendance rates regularly - below 80% indicates risk',
        'Look for patterns in absences (e.g., always absent on Mondays)',
        'Use attendance data to prioritize home visits'
      ],
      relatedFeatures: ['Attendance Reports', 'Attendance Calendar', 'Trends Analysis']
    },
    'assessments-step-10': {
      overview: 'Learning assessments help track a child\'s educational progress. Create assessments to measure literacy and numeracy skills.',
      instructions: [
        'Navigate to Assessments → New Assessment',
        'Select the child you want to assess',
        'Choose assessment type: Baseline, Quarterly, Literacy, or Numeracy',
        'Enter assessment date',
        'Record literacy score (0-100%)',
        'Record numeracy score (0-100%)',
        'Add notes about the child\'s performance',
        'Save the assessment'
      ],
      tips: [
        'Conduct baseline assessments when first registering a child',
        'Schedule quarterly assessments to track progress',
        'Be consistent with assessment methods for accurate tracking'
      ],
      relatedFeatures: ['New Assessment', 'Assessment Types', 'Progress Tracking']
    },
    'assessments-step-11': {
      overview: 'Understanding different assessment types helps you choose the right assessment for each situation.',
      instructions: [
        'Baseline Assessment: First assessment when child is registered - establishes starting point',
        'Quarterly Assessment: Regular assessments every 3 months to track progress',
        'Literacy Assessment: Focuses on reading and writing skills',
        'Numeracy Assessment: Focuses on math and counting skills',
        'Combined Assessment: Both literacy and numeracy in one session'
      ],
      tips: [
        'Always start with a baseline assessment',
        'Use quarterly assessments to monitor improvement',
        'Focus on specific skills (literacy/numeracy) when needed'
      ],
      relatedFeatures: ['Assessment Types', 'Baseline', 'Quarterly']
    },
    'assessments-step-12': {
      overview: 'Tracking progress over time shows how children are improving and helps identify those who need additional support.',
      instructions: [
        'Go to child details → Assessments tab',
        'View assessment history in chronological order',
        'See progress charts showing improvement over time',
        'Compare current scores with baseline',
        'Identify trends: improving, stable, or declining',
        'Use progress data to adjust learning support'
      ],
      tips: [
        'Regular assessments (every 3 months) provide better progress tracking',
        'Celebrate improvements to motivate children',
        'Intervene early if progress is declining'
      ],
      relatedFeatures: ['Progress Charts', 'Assessment History', 'Trend Analysis']
    },
    'ai-features-step-13': {
      overview: 'AI Insights use machine learning to analyze data and identify patterns, risks, and opportunities.',
      instructions: [
        'Navigate to AI Insights from the dashboard or main menu',
        'View the overview statistics: Total insights, High priority items, Children at risk',
        'Read through AI-generated insights with confidence scores',
        'Understand insight types: Risk (dropout risk), Opportunity (enrollment ready), Trend (patterns)',
        'Review recommended actions for each insight',
        'Take action on high-priority insights'
      ],
      tips: [
        'Check AI insights daily for new recommendations',
        'Pay attention to high-confidence insights (80%+)',
        'Use insights to prioritize your work'
      ],
      relatedFeatures: ['AI Insights', 'Risk Detection', 'Predictive Analytics']
    },
    'ai-features-step-14': {
      overview: 'AI Recommendations provide specific, actionable steps to help children succeed.',
      instructions: [
        'Go to AI Recommendations page',
        'Filter recommendations by priority: Urgent, High, Medium, Low',
        'Read each recommendation with estimated impact and effort required',
        'Review suggested actions for each recommendation',
        'Accept recommendations to mark them as in progress',
        'Mark recommendations as complete when actions are taken',
        'View details to see related child information'
      ],
      tips: [
        'Start with urgent and high-priority recommendations',
        'Consider effort vs. impact when prioritizing',
        'Track your progress on accepted recommendations'
      ],
      relatedFeatures: ['AI Recommendations', 'Action Items', 'Priority Filtering']
    },
    'ai-features-step-15': {
      overview: 'Smart Alerts notify you about important events, risks, and opportunities in real-time.',
      instructions: [
        'Alerts appear in the notification bell icon in the header',
        'High-priority alerts show on the dashboard',
        'AI-generated alerts include confidence scores',
        'Click on alerts to view details and take action',
        'Configure alert preferences in Settings',
        'Dismiss alerts after addressing them'
      ],
      tips: [
        'Enable push notifications for critical alerts',
        'Check alerts regularly to stay informed',
        'Act on urgent alerts immediately'
      ],
      relatedFeatures: ['Smart Alerts', 'Notifications', 'Alert Settings']
    },
    'reports-step-16': {
      overview: 'Reports provide comprehensive data analysis to help you understand trends and make informed decisions.',
      instructions: [
        'Navigate to Reports from the main menu',
        'View key statistics: Enrollment rate, Retention rate, Not enrolled, At risk',
        'Filter reports by region/county to see specific areas',
        'View disaggregated data: By gender, disability, location, poverty',
        'Analyze trends and patterns in the data',
        'Use visual charts to understand the data better'
      ],
      tips: [
        'Review reports weekly to stay informed',
        'Compare data across different regions',
        'Use disaggregated data to identify gaps'
      ],
      relatedFeatures: ['Reports', 'Analytics', 'Data Visualization']
    },
    'reports-step-17': {
      overview: 'Exporting data allows you to share information, create backups, and integrate with other systems.',
      instructions: [
        'Go to Reports page',
        'Click the "Export" button in the Disaggregated Data section',
        'Data will be downloaded as a CSV file',
        'The file includes all statistics and disaggregated data',
        'Open the CSV in Excel or Google Sheets for further analysis',
        'Share exported data with supervisors or stakeholders'
      ],
      tips: [
        'Export data regularly for backup',
        'Use exported data for presentations and reports',
        'Keep exported files organized by date'
      ],
      relatedFeatures: ['Export Data', 'CSV Download', 'Data Sharing']
    },
    'reports-step-18': {
      overview: 'The Analytics Dashboard provides visual insights into your data, making it easy to understand trends and patterns.',
      instructions: [
        'Access the Analytics Dashboard from Reports',
        'View enrollment statistics with visual charts',
        'Analyze retention rates and trends',
        'Check disaggregated data breakdowns',
        'Filter by region to see location-specific analytics',
        'Compare metrics across different time periods',
        'Use insights to inform decision-making'
      ],
      tips: [
        'Regularly review analytics to identify trends',
        'Use visual charts to communicate findings',
        'Share analytics with team members for collaboration'
      ],
      relatedFeatures: ['Analytics Dashboard', 'Data Visualization', 'Trend Analysis']
    }
  }

  return contentMap[`${moduleId}-${stepId}`] || {
    overview: 'Content coming soon...',
    instructions: ['This tutorial step is being developed'],
    tips: [],
    relatedFeatures: []
  }
}

export default function Tutorial() {
  const { fieldWorker } = useAuthStore()
  const navigate = useNavigate()
  const { moduleId } = useParams<{ moduleId?: string }>()
  const toast = useToast()

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
    },
    {
      id: 'location-tracking',
      title: 'Location Tracking',
      description: 'Track and manage child locations with maps',
      icon: MdMap,
      color: 'cyan',
      steps: [
        {
          id: 'step-19',
          title: 'Viewing Child Location',
          description: 'See child location on interactive map',
          icon: MdMap,
          duration: '3 min',
          completed: false
        },
        {
          id: 'step-20',
          title: 'Updating Location',
          description: 'Edit and update child location coordinates',
          icon: MdLocationOn,
          duration: '4 min',
          completed: false
        },
        {
          id: 'step-21',
          title: 'Location History',
          description: 'View location history and tracking records',
          icon: MdBarChart,
          duration: '3 min',
          completed: false
        }
      ]
    }
  ]

  // Add location tracking content to the map
  contentMap['location-tracking-step-19'] = {
    overview: 'View child locations on an interactive Google Map to verify addresses and plan visits.',
    instructions: [
      'Go to child details page and click "Track Location" button',
      'View the child\'s current location on the map',
      'Use map controls to zoom in/out and pan around',
      'Click "Use My Location" to center the map on your current position',
      'Use search to find specific addresses',
      'Click "Open in Maps" to view in Google Maps app'
    ],
    tips: [
      'Use location tracking to verify addresses before home visits',
      'Save locations for easy navigation',
      'Share locations with team members when needed'
    ],
    relatedFeatures: ['Location Map', 'GPS Tracking', 'Address Verification']
  }

  contentMap['location-tracking-step-20'] = {
    overview: 'Update child locations when families move or to correct inaccurate addresses.',
    instructions: [
      'From location tracker, click "Update Location"',
      'Click on the map to set new coordinates, or drag the marker',
      'Use search to find and select an address',
      'Click "Use My Location" to use your current GPS position',
      'Review the selected address',
      'Click "Save Location" to update the child\'s location'
    ],
    tips: [
      'Always verify new locations before saving',
      'Update locations immediately when families move',
      'Use GPS coordinates for accurate tracking'
    ],
    relatedFeatures: ['Edit Location', 'Map Selection', 'GPS Coordinates']
  }

  contentMap['location-tracking-step-21'] = {
    overview: 'Location history shows all recorded locations for a child, helping track movements and verify addresses.',
    instructions: [
      'View location history in the Location Tracker page',
      'See all previous location records with dates and timestamps',
      'Check who recorded each location and the purpose',
      'View location coordinates and addresses',
      'Use history to track family movements',
      'Export location data if needed'
    ],
    tips: [
      'Regular location updates help maintain accurate records',
      'Document the purpose of each location update',
      'Use location history to identify patterns'
    ],
    relatedFeatures: ['Location History', 'Tracking Records', 'Movement Patterns']
  }

  return contentMap[`${moduleId}-${stepId}`] || {
    overview: 'Content coming soon...',
    instructions: ['This tutorial step is being developed'],
    tips: [],
    relatedFeatures: []
  }
}

  const totalSteps = modules.reduce((sum, module) => sum + module.steps.length, 0)
  const completedSteps = modules.reduce(
    (sum, module) => sum + module.steps.filter(s => s.completed).length,
    0
  )
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  const handleStartModule = (moduleId: string) => {
    navigate(`/tutorial/${moduleId}`)
  }

  // If moduleId is provided, show module detail view
  if (moduleId) {
    const selectedModule = modules.find(m => m.id === moduleId)
    if (!selectedModule) {
      return (
        <MobileLayout>
          <Header title="Tutorial Not Found" showBack onBack={() => navigate('/tutorial')} />
          <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
            <Alert status="error">
              <AlertIcon />
              Tutorial module not found. Please select a valid tutorial.
            </Alert>
            <Button mt={4} onClick={() => navigate('/tutorial')}>
              Back to Tutorials
            </Button>
          </Box>
        </MobileLayout>
      )
    }

    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const currentStep = selectedModule.steps[currentStepIndex]
    const stepContent = getStepContent(selectedModule.id, currentStep.id)

    const handleNextStep = () => {
      if (currentStepIndex < selectedModule.steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1)
      } else {
        // Mark module as completed
        toast({
          title: 'Module Completed!',
          description: `You've completed ${selectedModule.title}`,
          status: 'success',
          duration: 3000,
        })
        navigate('/tutorial')
      }
    }

    const handlePreviousStep = () => {
      if (currentStepIndex > 0) {
        setCurrentStepIndex(currentStepIndex - 1)
      }
    }

    const handleMarkComplete = () => {
      toast({
        title: 'Step Completed',
        description: `Marked "${currentStep.title}" as complete`,
        status: 'success',
        duration: 2000,
      })
    }

    const IconComponent = selectedModule.icon
    const StepIcon = currentStep.icon

    return (
      <MobileLayout>
        <Header 
          title={selectedModule.title} 
          showBack 
          onBack={() => navigate('/tutorial')} 
        />
        <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
          <VStack spacing={{ base: 4, md: 6 }} align="stretch">
            {/* Module Header */}
            <Card p={5} bgGradient={`linear(to-r, ${selectedModule.color}.50, ${selectedModule.color}.100)`}>
              <HStack spacing={3} mb={4}>
                <Box
                  p={3}
                  borderRadius="lg"
                  bg={`${selectedModule.color}.200`}
                  color={`${selectedModule.color}.700`}
                >
                  <Icon as={IconComponent} boxSize={6} />
                </Box>
                <VStack align="start" spacing={0} flex={1}>
                  <Heading size="md" color={`${selectedModule.color}.700`}>
                    {selectedModule.title}
                  </Heading>
                  <Text fontSize="sm" color={`${selectedModule.color}.600`}>
                    {selectedModule.description}
                  </Text>
                </VStack>
              </HStack>
              <Progress 
                value={((currentStepIndex + 1) / selectedModule.steps.length) * 100} 
                colorScheme={selectedModule.color} 
                size="sm" 
                borderRadius="full"
              />
              <Text fontSize="xs" color="gray.600" mt={2}>
                Step {currentStepIndex + 1} of {selectedModule.steps.length}
              </Text>
            </Card>

            {/* Step Content */}
            <Card p={6}>
              <VStack align="stretch" spacing={6}>
                <HStack spacing={3}>
                  <Box
                    p={3}
                    borderRadius="lg"
                    bg={`${selectedModule.color}.100`}
                    color={`${selectedModule.color}.600`}
                  >
                    <Icon as={StepIcon} boxSize={6} />
                  </Box>
                  <VStack align="start" spacing={0} flex={1}>
                    <Heading size="lg">{currentStep.title}</Heading>
                    <Text fontSize="sm" color="gray.600">
                      {currentStep.description} • {currentStep.duration}
                    </Text>
                  </VStack>
                </HStack>

                <Divider />

                <Box>
                  <Heading size="sm" mb={3} color="gray.700">
                    Overview
                  </Heading>
                  <Text fontSize="md" color="gray.700" lineHeight="tall">
                    {stepContent.overview}
                  </Text>
                </Box>

                <Box>
                  <Heading size="sm" mb={3} color="gray.700">
                    Step-by-Step Instructions
                  </Heading>
                  <List spacing={3}>
                    {stepContent.instructions.map((instruction, index) => (
                      <ListItem key={index}>
                        <HStack align="start" spacing={3}>
                          <ListIcon as={MdCheckCircle} color={`${selectedModule.color}.500`} mt={0.5} />
                          <Text fontSize="md" color="gray.700" flex={1}>
                            {instruction}
                          </Text>
                        </HStack>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {stepContent.tips && stepContent.tips.length > 0 && (
                  <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    <Box>
                      <Heading size="sm" mb={2}>💡 Pro Tips</Heading>
                      <VStack align="start" spacing={1}>
                        {stepContent.tips.map((tip, index) => (
                          <Text key={index} fontSize="sm">
                            • {tip}
                          </Text>
                        ))}
                      </VStack>
                    </Box>
                  </Alert>
                )}

                {stepContent.relatedFeatures && stepContent.relatedFeatures.length > 0 && (
                  <Box>
                    <Heading size="sm" mb={3} color="gray.700">
                      Related Features
                    </Heading>
                    <HStack spacing={2} flexWrap="wrap">
                      {stepContent.relatedFeatures.map((feature, index) => (
                        <Badge key={index} colorScheme={selectedModule.color} fontSize="sm" p={2}>
                          {feature}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                )}

                <Divider />

                {/* Navigation Buttons */}
                <HStack spacing={3}>
                  <Button
                    variant="outline"
                    leftIcon={<MdArrowBack />}
                    onClick={handlePreviousStep}
                    isDisabled={currentStepIndex === 0}
                    flex={1}
                  >
                    Previous
                  </Button>
                  <Button
                    colorScheme={selectedModule.color}
                    onClick={handleMarkComplete}
                    variant="ghost"
                  >
                    Mark Complete
                  </Button>
                  <Button
                    colorScheme={selectedModule.color}
                    rightIcon={currentStepIndex === selectedModule.steps.length - 1 ? <MdCheckCircle /> : <MdArrowForward />}
                    onClick={handleNextStep}
                    flex={1}
                  >
                    {currentStepIndex === selectedModule.steps.length - 1 ? 'Finish Module' : 'Next Step'}
                  </Button>
                </HStack>
              </VStack>
            </Card>

            {/* Step Navigation */}
            <Card p={4}>
              <VStack align="stretch" spacing={3}>
                <Heading size="sm">All Steps in This Module</Heading>
                <VStack align="stretch" spacing={2}>
                  {selectedModule.steps.map((step, index) => {
                    const StepIconComponent = step.icon
                    const isActive = index === currentStepIndex
                    return (
                      <HStack
                        key={step.id}
                        p={3}
                        borderRadius="md"
                        bg={isActive ? `${selectedModule.color}.50` : 'gray.50'}
                        border={isActive ? `2px solid` : '1px solid'}
                        borderColor={isActive ? `${selectedModule.color}.300` : 'gray.200'}
                        cursor="pointer"
                        onClick={() => setCurrentStepIndex(index)}
                        _hover={{ bg: isActive ? `${selectedModule.color}.100` : 'gray.100' }}
                      >
                        <Icon as={StepIconComponent} boxSize={5} color={isActive ? `${selectedModule.color}.600` : 'gray.500'} />
                        <VStack align="start" spacing={0} flex={1}>
                          <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'normal'}>
                            {step.title}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {step.duration}
                          </Text>
                        </VStack>
                        {isActive && (
                          <Badge colorScheme={selectedModule.color}>Current</Badge>
                        )}
                      </HStack>
                    )
                  })}
                </VStack>
              </VStack>
            </Card>
          </VStack>
        </Box>
      </MobileLayout>
    )
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

