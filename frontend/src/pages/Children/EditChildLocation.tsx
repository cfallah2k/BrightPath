import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Heading,
  VStack,
  Button,
  useToast,
  Card
} from '@chakra-ui/react'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'
import ChildLocationMap from '../../components/maps/ChildLocationMap'
import { testDataService } from '../../services/testDataService'
import { formatChildName } from '../../utils/testDataHelpers'

export default function EditChildLocation() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()
  const [child, setChild] = useState<any>(null)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (id) {
      loadChild()
    }
  }, [id])

  const loadChild = async () => {
    try {
      const childData = await testDataService.getChildById(id!)
      if (childData) {
        setChild(childData)
        if (childData.location?.coordinates) {
          setSelectedLocation({
            lat: childData.location.coordinates.lat,
            lng: childData.location.coordinates.lng,
            address: `${childData.location.community}, ${childData.location.district}, ${childData.location.region}`
          })
        }
      }
    } catch (error) {
      console.error('Failed to load child:', error)
    }
  }

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setSelectedLocation(location)
  }

  const handleSave = async () => {
    if (!selectedLocation) {
      toast({
        title: 'Error',
        description: 'Please select a location',
        status: 'error',
        duration: 3000,
      })
      return
    }

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Location Updated',
        description: 'Child location has been successfully updated',
        status: 'success',
        duration: 3000,
      })
      
      navigate(`/children/${id}/location`)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update location',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!child) {
    return (
      <MobileLayout>
        <Header title="Update Location" showBack onBack={() => navigate(`/children/${id}`)} />
        <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
          Loading...
        </Box>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout>
      <Header 
        title="Update Location" 
        showBack 
        onBack={() => navigate(`/children/${id}/location`)} 
      />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          <Card p={4}>
            <VStack align="stretch" spacing={4}>
              <Heading size="sm">Select Location for {formatChildName(child)}</Heading>
              <Text fontSize="sm" color="gray.600">
                Click on the map or search for a location to set the child's address
              </Text>
              
              <ChildLocationMap
                childId={child.id}
                childName={formatChildName(child)}
                initialLocation={selectedLocation || undefined}
                onLocationSelect={handleLocationSelect}
                mode="edit"
                showSearch={true}
              />

              {selectedLocation && (
                <VStack spacing={2} align="stretch" pt={4} borderTop="1px" borderColor="gray.200">
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={handleSave}
                    isLoading={isSaving}
                    loadingText="Saving..."
                  >
                    Save Location
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/children/${id}/location`)}
                  >
                    Cancel
                  </Button>
                </VStack>
              )}
            </VStack>
          </Card>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

