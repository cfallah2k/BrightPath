import { useState } from 'react'
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  Checkbox,
  SimpleGrid,
  Icon,
  Badge,
  Progress,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { MdFileDownload, MdAutoAwesome, MdBarChart, MdPeople, MdSchool } from 'react-icons/md'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { useAuthStore } from '../../store/authStore'

interface ReportOption {
  id: string
  title: string
  description: string
  icon: any
  estimatedTime: string
  aiEnhanced: boolean
}

export default function ReportGenerator() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const reportOptions: ReportOption[] = [
    {
      id: 'enrollment',
      title: 'Enrollment Report',
      description: 'Comprehensive enrollment statistics and trends',
      icon: MdPeople,
      estimatedTime: '2 min',
      aiEnhanced: true
    },
    {
      id: 'attendance',
      title: 'Attendance Analysis',
      description: 'Detailed attendance patterns and rates',
      icon: MdBarChart,
      estimatedTime: '3 min',
      aiEnhanced: true
    },
    {
      id: 'retention',
      title: 'Retention Report',
      description: 'Student retention and dropout analysis',
      icon: MdSchool,
      estimatedTime: '2 min',
      aiEnhanced: true
    },
    {
      id: 'assessments',
      title: 'Learning Assessments',
      description: 'Progress tracking and learning outcomes',
      icon: MdBarChart,
      estimatedTime: '4 min',
      aiEnhanced: true
    },
    {
      id: 'regional',
      title: 'Regional Comparison',
      description: 'Cross-regional performance comparison',
      icon: MdBarChart,
      estimatedTime: '5 min',
      aiEnhanced: true
    },
    {
      id: 'custom',
      title: 'Custom AI Report',
      description: 'AI-generated insights and recommendations',
      icon: MdAutoAwesome,
      estimatedTime: '6 min',
      aiEnhanced: true
    }
  ]

  const handleToggleReport = (reportId: string) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    )
  }

  const handleGenerate = async () => {
    if (selectedReports.length === 0) return

    setIsGenerating(true)
    setProgress(0)

    // Simulate AI report generation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <MobileLayout>
      <Header title="AI Report Generator" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          {/* Info Card */}
          <Card p={5} bgGradient="linear(to-r, purple.50, teal.50)">
            <HStack spacing={3} mb={3}>
              <Icon as={MdAutoAwesome} boxSize={6} color="purple.600" />
              <Heading size="sm" color="purple.700">
                AI-Powered Report Generation
              </Heading>
            </HStack>
            <Text fontSize="sm" color="gray.700">
              Select one or more reports to generate. Our AI will analyze data, identify patterns, 
              and create comprehensive reports with insights and recommendations.
            </Text>
          </Card>

          {/* Report Selection */}
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Select Reports</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {reportOptions.map((report) => {
                const IconComponent = report.icon
                const isSelected = selectedReports.includes(report.id)
                
                return (
                  <Card
                    key={report.id}
                    p={5}
                    cursor="pointer"
                    border={isSelected ? '2px' : '1px'}
                    borderColor={isSelected ? 'teal.500' : 'gray.200'}
                    bg={isSelected ? 'teal.50' : 'white'}
                    onClick={() => handleToggleReport(report.id)}
                    _hover={{ shadow: 'md' }}
                    transition="all 0.2s"
                  >
                    <VStack align="stretch" spacing={3}>
                      <HStack justify="space-between">
                        <HStack spacing={3}>
                          <Icon as={IconComponent} boxSize={5} color="teal.600" />
                          <VStack align="start" spacing={0}>
                            <Heading size="sm">{report.title}</Heading>
                            {report.aiEnhanced && (
                              <Badge colorScheme="purple" fontSize="xs">
                                <Icon as={MdAutoAwesome} mr={1} />
                                AI Enhanced
                              </Badge>
                            )}
                          </VStack>
                        </HStack>
                        <Checkbox
                          isChecked={isSelected}
                          colorScheme="teal"
                          size="lg"
                        />
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        {report.description}
                      </Text>
                      <HStack justify="space-between">
                        <Text fontSize="xs" color="gray.500">
                          Est. time: {report.estimatedTime}
                        </Text>
                      </HStack>
                    </VStack>
                  </Card>
                )
              })}
            </SimpleGrid>
          </VStack>

          {/* Generation Progress */}
          {isGenerating && (
            <Card p={5}>
              <VStack spacing={4} align="stretch">
                <Heading size="sm">Generating Reports...</Heading>
                <Progress value={progress} colorScheme="teal" size="lg" borderRadius="full" />
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  AI is analyzing data and creating reports... {progress}%
                </Text>
              </VStack>
            </Card>
          )}

          {/* Success Message */}
          {!isGenerating && progress === 100 && (
            <Alert status="success" borderRadius="lg">
              <AlertIcon />
              <VStack align="start" spacing={1} flex={1}>
                <Text fontWeight="semibold">Reports Generated Successfully!</Text>
                <Text fontSize="sm">
                  {selectedReports.length} report(s) ready for download
                </Text>
              </VStack>
            </Alert>
          )}

          {/* Action Buttons */}
          <HStack spacing={3}>
            <Button
              colorScheme="teal"
              size="lg"
              flex={1}
              onClick={handleGenerate}
              isDisabled={selectedReports.length === 0 || isGenerating}
              leftIcon={<MdAutoAwesome />}
            >
              {isGenerating ? 'Generating...' : 'Generate Reports'}
            </Button>
            {progress === 100 && (
              <Button
                colorScheme="green"
                size="lg"
                leftIcon={<MdFileDownload />}
              >
                Download All
              </Button>
            )}
          </HStack>

          {/* AI Features Info */}
          <Card p={5} bg="blue.50">
            <VStack align="stretch" spacing={3}>
              <Heading size="sm" color="blue.700">
                What AI Adds to Your Reports:
              </Heading>
              <VStack align="stretch" spacing={2}>
                <HStack spacing={2}>
                  <Icon as={MdAutoAwesome} color="blue.600" />
                  <Text fontSize="sm" color="blue.700">
                    Predictive analytics and trend forecasting
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={MdAutoAwesome} color="blue.600" />
                  <Text fontSize="sm" color="blue.700">
                    Automatic pattern detection and insights
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={MdAutoAwesome} color="blue.600" />
                  <Text fontSize="sm" color="blue.700">
                    Actionable recommendations based on data
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={MdAutoAwesome} color="blue.600" />
                  <Text fontSize="sm" color="blue.700">
                    Risk identification and early warnings
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

