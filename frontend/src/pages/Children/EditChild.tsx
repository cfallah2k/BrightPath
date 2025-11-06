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
  Checkbox,
  Textarea,
  SimpleGrid,
  Flex
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'

// Mock child data - will be replaced with API call
const mockChildData = {
  id: '1',
  firstName: 'Ama',
  lastName: 'Mensah',
  dateOfBirth: '2015-05-15',
  gender: 'female',
  region: 'Montserrado',
  district: 'Monrovia',
  community: 'Central Monrovia',
  disabilityStatus: false,
  disabilityDetails: '',
  householdPovertyIndicator: 'poor',
  barriers: ['Poverty', 'Distance to school'],
}

export default function EditChild() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    region: '',
    district: '',
    community: '',
    disabilityStatus: false,
    disabilityDetails: '',
    householdPovertyIndicator: '',
    barriers: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load child data - in real app, fetch from API
    setFormData({
      firstName: mockChildData.firstName,
      lastName: mockChildData.lastName,
      dateOfBirth: mockChildData.dateOfBirth,
      gender: mockChildData.gender,
      region: mockChildData.region,
      district: mockChildData.district,
      community: mockChildData.community,
      disabilityStatus: mockChildData.disabilityStatus,
      disabilityDetails: mockChildData.disabilityDetails,
      householdPovertyIndicator: mockChildData.householdPovertyIndicator,
      barriers: mockChildData.barriers,
    })
  }, [id])

  const barriersOptions = [
    'Poverty',
    'Gender inequality',
    'Disability',
    'Rural isolation',
    'Distance to school',
    'Family issues',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Child information updated',
        description: `${formData.firstName} ${formData.lastName}'s information has been updated`,
        status: 'success',
        duration: 5000,
      })
      
      navigate(`/children/${id}`)
    } catch (error: any) {
      toast({
        title: 'Update failed',
        description: error.message || 'Unable to update child information',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleBarrier = (barrier: string) => {
    setFormData(prev => ({
      ...prev,
      barriers: prev.barriers.includes(barrier)
        ? prev.barriers.filter(b => b !== barrier)
        : [...prev.barriers, barrier]
    }))
  }

  return (
    <MobileLayout>
      <Header title="Edit Child" showBack onBack={() => navigate(`/children/${id}`)} />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <Card>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <Heading size="md">Basic Information</Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Enter first name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Enter last name"
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    placeholder="Select gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <Heading size="md" mt={4}>Location</Heading>

              <FormControl isRequired>
                <FormLabel>Region</FormLabel>
                <Select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="Select region"
                >
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
              </FormControl>

              <FormControl isRequired>
                <FormLabel>District</FormLabel>
                <Input
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="Enter district"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Community</FormLabel>
                <Input
                  value={formData.community}
                  onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                  placeholder="Enter community"
                />
              </FormControl>

              <Heading size="md" mt={4}>Additional Information</Heading>

              <FormControl>
                <Checkbox
                  isChecked={formData.disabilityStatus}
                  onChange={(e) => setFormData({ ...formData, disabilityStatus: e.target.checked })}
                >
                  Child has a disability
                </Checkbox>
              </FormControl>

              {formData.disabilityStatus && (
                <FormControl>
                  <FormLabel>Disability Details</FormLabel>
                  <Textarea
                    value={formData.disabilityDetails}
                    onChange={(e) => setFormData({ ...formData, disabilityDetails: e.target.value })}
                    placeholder="Describe the disability"
                  />
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Household Poverty Indicator</FormLabel>
                <Select
                  value={formData.householdPovertyIndicator}
                  onChange={(e) => setFormData({ ...formData, householdPovertyIndicator: e.target.value })}
                  placeholder="Select poverty quintile"
                >
                  <option value="poorest">Poorest</option>
                  <option value="poor">Poor</option>
                  <option value="middle">Middle</option>
                  <option value="rich">Rich</option>
                  <option value="richest">Richest</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Barriers to Education</FormLabel>
                <VStack align="start" spacing={2}>
                  {barriersOptions.map((barrier) => (
                    <Checkbox
                      key={barrier}
                      isChecked={formData.barriers.includes(barrier)}
                      onChange={() => toggleBarrier(barrier)}
                    >
                      {barrier}
                    </Checkbox>
                  ))}
                </VStack>
              </FormControl>

              <Flex gap={3} pt={4}>
                <Button
                  type="button"
                  variant="outline"
                  flex={1}
                  onClick={() => navigate(`/children/${id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="teal"
                  flex={1}
                  isLoading={isLoading}
                  loadingText="Updating..."
                >
                  Save Changes
                </Button>
              </Flex>
            </VStack>
          </form>
        </Card>
      </Box>
    </MobileLayout>
  )
}

