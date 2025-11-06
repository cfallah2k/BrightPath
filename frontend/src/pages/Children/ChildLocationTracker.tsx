import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
  Card,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { MdLocationOn, MdHistory, MdRefresh, MdArrowBack, MdMyLocation } from 'react-icons/md'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import ChildLocationMap from '../../components/maps/ChildLocationMap'
import { testDataService } from '../../services/testDataService'
import { formatChildName } from '../../utils/testDataHelpers'
import { getChildById } from '../../data/testData'

interface LocationHistory {
  id: string
  timestamp: string
  lat: number
  lng: number
  address: string
  recordedBy: string
  purpose: string
}

export default function ChildLocationTracker() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [child, setChild] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [locationHistory, setLocationHistory] = useState<LocationHistory[]>([])
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)

  useEffect(() => {
    if (id) {
      loadChildData()
      loadLocationHistory()
    }
  }, [id])

  const loadChildData = async () => {
    setIsLoading(true)
    try {
      const childData = await testDataService.getChildById(id!)
      if (childData) {
        setChild(childData)
        // Set initial location from child data
        if (childData.location?.coordinates) {
          setCurrentLocation({
            lat: childData.location.coordinates.lat,
            lng: childData.location.coordinates.lng,
            address: `${childData.location.community}, ${childData.location.district}, ${childData.location.region}`
          })
        }
      }
    } catch (error) {
      console.error('Failed to load child data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadLocationHistory = async () => {
    // Simulate location history
    const mockHistory: LocationHistory[] = [
      {
        id: 'loc-1',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        lat: 5.6037,
        lng: -0.1870,
        address: 'Accra Central, Accra Metropolitan, Greater Accra',
        recordedBy: 'Field Worker 001',
        purpose: 'Home Visit'
      },
      {
        id: 'loc-2',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        lat: 5.6100,
        lng: -0.1900,
        address: 'Accra Central, Accra Metropolitan, Greater Accra',
        recordedBy: 'Field Worker 001',
        purpose: 'Initial Registration'
      }
    ]
    setLocationHistory(mockHistory)
  }

  const handleUpdateLocation = (location: { lat: number; lng: number; address: string }) => {
    setCurrentLocation(location)
    // Here you would save to backend
    console.log('Location updated:', location)
  }

  const handleRefreshLocation = () => {
    // Get current GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          // Reverse geocode to get address
          setCurrentLocation({
            lat,
            lng,
            address: 'Current GPS Location'
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  if (isLoading) {
    return (
      <MobileLayout>
        <Header title="Location Tracker" showBack onBack={() => navigate(`/children/${id}`)} />
        <Box display="flex" justify="center" align="center" minH="50vh">
          <Spinner size="xl" color="teal.500" />
        </Box>
      </MobileLayout>
    )
  }

  if (!child) {
    return (
      <MobileLayout>
        <Header title="Location Tracker" showBack onBack={() => navigate('/children')} />
        <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
          <Alert status="error">
            <AlertIcon />
            Child not found
          </Alert>
        </Box>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout>
      <Header 
        title="Location Tracker" 
        showBack 
        onBack={() => navigate(`/children/${id}`)} 
      />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          {/* Child Info Card */}
          <Card p={4}>
            <VStack align="stretch" spacing={2}>
              <Heading size="md">{formatChildName(child)}</Heading>
              <HStack spacing={2}>
                <Icon as={MdLocationOn} color="teal.500" />
                <Text fontSize="sm" color="gray.600">
                  {child.location?.community}, {child.location?.district}, {child.location?.region}
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Button
                  size="sm"
                  leftIcon={<MdRefresh />}
                  onClick={handleRefreshLocation}
                  variant="outline"
                >
                  Refresh Location
                </Button>
                <Button
                  size="sm"
                  leftIcon={<MdMyLocation />}
                  onClick={() => navigate(`/children/${id}/location/edit`)}
                  colorScheme="teal"
                >
                  Update Location
                </Button>
              </HStack>
            </VStack>
          </Card>

          {/* Map */}
          <Card p={4}>
            <VStack align="stretch" spacing={4}>
              <Heading size="sm">Current Location</Heading>
              <ChildLocationMap
                childId={child.id}
                childName={formatChildName(child)}
                initialLocation={currentLocation || undefined}
                mode="view"
                showSearch={true}
              />
            </VStack>
          </Card>

          {/* Location History */}
          {locationHistory.length > 0 && (
            <Card p={4}>
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Heading size="sm">Location History</Heading>
                  <Badge colorScheme="teal">{locationHistory.length} records</Badge>
                </HStack>
                <VStack spacing={3} align="stretch">
                  {locationHistory.map((location) => (
                    <Card key={location.id} p={3} bg="gray.50">
                      <VStack align="stretch" spacing={2}>
                        <HStack justify="space-between">
                          <HStack spacing={2}>
                            <Icon as={MdHistory} color="gray.500" />
                            <Text fontSize="sm" fontWeight="semibold">
                              {new Date(location.timestamp).toLocaleDateString()}
                            </Text>
                          </HStack>
                          <Badge fontSize="xs">{location.purpose}</Badge>
                        </HStack>
                        <Text fontSize="xs" color="gray.600">
                          {location.address}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Recorded by: {location.recordedBy}
                        </Text>
                      </VStack>
                    </Card>
                  ))}
                </VStack>
              </VStack>
            </Card>
          )}

          {/* Location Stats */}
          <SimpleGrid columns={2} spacing={4}>
            <Card p={4} textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                {locationHistory.length}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Location Records
              </Text>
            </Card>
            <Card p={4} textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {currentLocation ? 'Active' : 'N/A'}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Tracking Status
              </Text>
            </Card>
          </SimpleGrid>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

