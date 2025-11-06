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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/common/Card'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'

export default function RegisterChild() {
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
  const navigate = useNavigate()
  const toast = useToast()

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
      // TODO: Replace with actual API call when backend is connected
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Child registered',
        description: `${formData.firstName} ${formData.lastName} has been added to the system`,
        status: 'success',
        duration: 5000,
      })
      
      navigate('/children')
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Unable to register child',
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
      <Header title="Register Child" showBack onBack={() => navigate('/children')} />
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
                  <option value="Greater Accra">Greater Accra</option>
                  <option value="Ashanti">Ashanti</option>
                  <option value="Northern">Northern</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Western">Western</option>
                  <option value="Central">Central</option>
                  <option value="Volta">Volta</option>
                  <option value="Upper East">Upper East</option>
                  <option value="Upper West">Upper West</option>
                  <option value="Brong Ahafo">Brong Ahafo</option>
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
                  onClick={() => navigate('/children')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="teal"
                  flex={1}
                  isLoading={isLoading}
                  loadingText="Registering..."
                >
                  Register Child
                </Button>
              </Flex>
            </VStack>
          </form>
        </Card>
      </Box>
    </MobileLayout>
  )
}

