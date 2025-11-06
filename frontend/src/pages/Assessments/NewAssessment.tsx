import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
  Select,
  SimpleGrid,
  Flex,
  RadioGroup,
  Radio,
  HStack
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { testDataService } from '../../services/testDataService'
import { testChildren } from '../../data/testData'
import { formatChildName } from '../../utils/testDataHelpers'

export default function NewAssessment() {
  const [formData, setFormData] = useState({
    childId: '',
    assessmentType: 'quarterly',
    assessmentDate: new Date().toISOString().split('T')[0],
    literacyScore: '',
    numeracyScore: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await testDataService.createAssessment({
        child_id: formData.childId,
        assessment_type: formData.assessmentType,
        assessment_date: formData.assessmentDate,
        literacy_score: formData.literacyScore ? parseFloat(formData.literacyScore) : null,
        numeracy_score: formData.numeracyScore ? parseFloat(formData.numeracyScore) : null,
        assessed_by: 'worker-001' // Mock field worker ID
      })
      
      toast({
        title: 'Assessment recorded',
        status: 'success',
        duration: 3000,
      })
      
      navigate('/assessments')
    } catch (error: any) {
      toast({
        title: 'Failed to record assessment',
        description: error.message,
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MobileLayout>
      <Header title="New Assessment" showBack onBack={() => navigate('/assessments')} />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <Card>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>Select Child</FormLabel>
                <Select
                  value={formData.childId}
                  onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                  placeholder="Choose a child"
                >
                  {testChildren.map((child) => (
                    <option key={child.id} value={child.id}>
                      {formatChildName(child)}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Assessment Type</FormLabel>
                <RadioGroup
                  value={formData.assessmentType}
                  onChange={(value) => setFormData({ ...formData, assessmentType: value })}
                >
                  <VStack align="start" spacing={2}>
                    <Radio value="baseline">Baseline Assessment</Radio>
                    <Radio value="quarterly">Quarterly Assessment</Radio>
                    <Radio value="literacy">Literacy Only</Radio>
                    <Radio value="numeracy">Numeracy Only</Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Assessment Date</FormLabel>
                <Input
                  type="date"
                  value={formData.assessmentDate}
                  onChange={(e) => setFormData({ ...formData, assessmentDate: e.target.value })}
                />
              </FormControl>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl>
                  <FormLabel>Literacy Score (%)</FormLabel>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.literacyScore}
                    onChange={(e) => setFormData({ ...formData, literacyScore: e.target.value })}
                    placeholder="0-100"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Numeracy Score (%)</FormLabel>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.numeracyScore}
                    onChange={(e) => setFormData({ ...formData, numeracyScore: e.target.value })}
                    placeholder="0-100"
                  />
                </FormControl>
              </SimpleGrid>

              <Flex gap={3} pt={4}>
                <Button
                  type="button"
                  variant="outline"
                  flex={1}
                  onClick={() => navigate('/assessments')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="teal"
                  flex={1}
                  isLoading={isLoading}
                  loadingText="Recording..."
                >
                  Record Assessment
                </Button>
              </Flex>
            </VStack>
          </form>
        </Card>
      </Box>
    </MobileLayout>
  )
}

