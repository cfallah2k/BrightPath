import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  useToast,
  Select,
  Input,
  Checkbox,
  Text,
  SimpleGrid,
  HStack,
  Badge
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import { testDataService } from '../../services/testDataService'
import { testChildren, testSchools } from '../../data/testData'
import { formatChildName, getSchoolById } from '../../utils/testDataHelpers'

export default function RecordAttendance() {
  const { childId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  
  const [formData, setFormData] = useState({
    childId: childId || '',
    schoolId: '',
    date: new Date().toISOString().split('T')[0],
    present: true,
    reasonForAbsence: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [batchMode, setBatchMode] = useState(false)
  const [selectedChildren, setSelectedChildren] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await testDataService.recordAttendance(formData)
      
      toast({
        title: 'Attendance recorded',
        description: batchMode 
          ? `Attendance recorded for ${selectedChildren.length} children`
          : 'Attendance recorded successfully',
        status: 'success',
        duration: 3000,
      })
      
      navigate(batchMode ? '/attendance' : `/children/${formData.childId}`)
    } catch (error: any) {
      toast({
        title: 'Failed to record attendance',
        description: error.message,
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChildSelection = (id: string) => {
    setSelectedChildren(prev =>
      prev.includes(id)
        ? prev.filter(cid => cid !== id)
        : [...prev, id]
    )
  }

  return (
    <MobileLayout>
      <Header 
        title="Record Attendance" 
        showBack 
        onBack={() => navigate(batchMode ? '/attendance' : '/children')} 
      />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <VStack spacing={4} align="stretch">
          <Card>
            <Checkbox
              isChecked={batchMode}
              onChange={(e) => setBatchMode(e.target.checked)}
              mb={4}
            >
              Batch Mode (Record for multiple children)
            </Checkbox>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                {!batchMode ? (
                  <>
                    <FormControl isRequired>
                      <FormLabel>Select Child</FormLabel>
                      <Select
                        value={formData.childId}
                        onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                        placeholder="Choose a child"
                      >
                        {testChildren.map((child) => {
                          const school = child.enrolled_school_id ? getSchoolById(child.enrolled_school_id) : null
                          return (
                            <option key={child.id} value={child.id}>
                              {formatChildName(child)} {school ? `- ${school.name}` : ''}
                            </option>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </>
                ) : (
                  <Box>
                    <FormLabel mb={3}>Select Children</FormLabel>
                    <VStack spacing={2} align="stretch" maxH="300px" overflowY="auto">
                      {testChildren.map((child) => {
                        const school = child.enrolled_school_id ? getSchoolById(child.enrolled_school_id) : null
                        return (
                          <Card
                            key={child.id}
                            clickable
                            onClick={() => toggleChildSelection(child.id)}
                            bg={selectedChildren.includes(child.id) ? 'teal.50' : 'white'}
                          >
                            <HStack justify="space-between">
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="semibold">{formatChildName(child)}</Text>
                                {school && (
                                  <Text fontSize="sm" color="gray.600">{school.name}</Text>
                                )}
                              </VStack>
                              <Checkbox
                                isChecked={selectedChildren.includes(child.id)}
                                onChange={() => toggleChildSelection(child.id)}
                              />
                            </HStack>
                          </Card>
                        )
                      })}
                    </VStack>
                    {selectedChildren.length > 0 && (
                      <Text fontSize="sm" color="teal.600" mt={2}>
                        {selectedChildren.length} child{selectedChildren.length !== 1 ? 'ren' : ''} selected
                      </Text>
                    )}
                  </Box>
                )}

                <FormControl isRequired>
                  <FormLabel>School</FormLabel>
                  <Select
                    value={formData.schoolId}
                    onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                    placeholder="Select school"
                  >
                    {testSchools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <Checkbox
                    isChecked={formData.present}
                    onChange={(e) => setFormData({ ...formData, present: e.target.checked })}
                  >
                    Present
                  </Checkbox>
                </FormControl>

                {!formData.present && (
                  <FormControl>
                    <FormLabel>Reason for Absence</FormLabel>
                    <Select
                      value={formData.reasonForAbsence}
                      onChange={(e) => setFormData({ ...formData, reasonForAbsence: e.target.value })}
                      placeholder="Select reason"
                    >
                      <option value="sick">Sick</option>
                      <option value="family_issue">Family Issue</option>
                      <option value="transport">Transport Problem</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>
                )}

                <HStack pt={4}>
                  <Button
                    type="button"
                    variant="outline"
                    flex={1}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    flex={1}
                    isLoading={isLoading}
                    loadingText="Recording..."
                    isDisabled={batchMode && selectedChildren.length === 0}
                  >
                    Record Attendance
                  </Button>
                </HStack>
              </VStack>
            </form>
          </Card>

          {/* Quick Stats */}
          <Card>
            <Heading size="sm" mb={3}>Today's Summary</Heading>
            <SimpleGrid columns={3} spacing={4}>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="green.500">45</Text>
                <Text fontSize="xs" color="gray.600">Present</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="red.500">5</Text>
                <Text fontSize="xs" color="gray.600">Absent</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="teal.500">90%</Text>
                <Text fontSize="xs" color="gray.600">Rate</Text>
              </Box>
            </SimpleGrid>
          </Card>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

