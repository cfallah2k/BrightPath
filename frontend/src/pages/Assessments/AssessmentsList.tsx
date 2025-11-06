import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  SimpleGrid,
  Select,
  Flex
} from '@chakra-ui/react'
import { MdAdd, MdAssessment } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { testDataService } from '../../services/testDataService'
import { formatChildName, formatDate, getChildById } from '../../utils/testDataHelpers'

export default function AssessmentsList() {
  const navigate = useNavigate()
  const [assessments, setAssessments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAssessments = async () => {
      setIsLoading(true)
      try {
        const data = await testDataService.getAssessments()
        setAssessments(data)
      } catch (error) {
        console.error('Failed to load assessments:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadAssessments()
  }, [])

  return (
    <MobileLayout>
      <Header title="Assessments" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <VStack spacing={4} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading size="md">Learning Assessments</Heading>
            <Button
              leftIcon={<MdAdd />}
              colorScheme="teal"
              size="sm"
              onClick={() => navigate('/assessments/new')}
            >
              New Assessment
            </Button>
          </Flex>

          <Select placeholder="Filter by type" size="sm">
            <option value="all">All Types</option>
            <option value="baseline">Baseline</option>
            <option value="quarterly">Quarterly</option>
            <option value="literacy">Literacy</option>
            <option value="numeracy">Numeracy</option>
          </Select>

          {isLoading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" color="teal.500" />
            </Box>
          ) : (
            <VStack spacing={3} align="stretch">
              {assessments.map((assessment) => {
                const child = getChildById(assessment.child_id)
                return (
                  <Card key={assessment.id} clickable>
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">
                          {child ? formatChildName(child) : 'Unknown Child'}
                        </Text>
                        <HStack>
                          <Badge colorScheme="blue">
                            {assessment.assessment_type.charAt(0).toUpperCase() + assessment.assessment_type.slice(1)}
                          </Badge>
                          <Text fontSize="xs" color="gray.600">
                            {formatDate(assessment.assessment_date)}
                          </Text>
                        </HStack>
                      </VStack>
                      <SimpleGrid columns={2} spacing={4}>
                        <Box textAlign="center">
                          <Text fontSize="xs" color="gray.600">Literacy</Text>
                          <Text fontSize="lg" fontWeight="bold" color="teal.500">
                            {assessment.literacy_score || 'N/A'}%
                          </Text>
                        </Box>
                        <Box textAlign="center">
                          <Text fontSize="xs" color="gray.600">Numeracy</Text>
                          <Text fontSize="lg" fontWeight="bold" color="blue.500">
                            {assessment.numeracy_score || 'N/A'}%
                          </Text>
                        </Box>
                      </SimpleGrid>
                    </HStack>
                  </Card>
                )
              })}
            </VStack>
          )}
        </VStack>
      </Box>
    </MobileLayout>
  )
}

