import { useEffect, useRef, useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
  Card,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { MdLocationOn, MdMyLocation, MdSearch, MdDirections } from 'react-icons/md'

/// <reference types="@types/google.maps" />

interface ChildLocationMapProps {
  childId?: string
  childName?: string
  initialLocation?: {
    lat: number
    lng: number
    address?: string
  }
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void
  mode?: 'view' | 'edit' | 'track'
  showSearch?: boolean
  height?: string
}

export default function ChildLocationMap({
  childName,
  initialLocation,
  onLocationSelect,
  mode = 'view',
  showSearch = true,
  height = '400px'
}: ChildLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [address, setAddress] = useState(initialLocation?.address || '')
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const autocompleteRef = useRef<any>(null)
  const geocoderRef = useRef<any>(null)

  // Initialize Google Maps
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = () => {
      if (!window.google) {
        console.error('Google Maps API not loaded')
        setIsLoading(false)
        return
      }

      const defaultLocation = initialLocation || { lat: 5.6037, lng: -0.1870 } // Accra, Ghana
      
      const mapInstance = new window.google.maps.Map(mapRef.current!, {
        center: defaultLocation,
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      setMap(mapInstance)

      // Add marker
      const markerInstance = new window.google.maps.Marker({
        position: defaultLocation,
        map: mapInstance,
        draggable: mode === 'edit',
        title: childName || 'Child Location',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40)
        }
      })

      setMarker(markerInstance)

      // Geocoder for reverse geocoding
      geocoderRef.current = new window.google.maps.Geocoder()

      // Get address for initial location
      if (defaultLocation) {
        geocoderRef.current.geocode(
          { location: defaultLocation },
          (results: any, status: string) => {
            if (status === 'OK' && results && results[0]) {
              setAddress(results[0].formatted_address)
            }
          }
        )
      }

      // Handle marker drag (for edit mode)
      if (mode === 'edit') {
        markerInstance.addListener('dragend', () => {
          const position = markerInstance.getPosition()
          if (position) {
            const lat = position.lat()
            const lng = position.lng()
            updateLocation(lat, lng)
          }
        })
      }

      // Handle map click (for edit mode)
      if (mode === 'edit') {
        mapInstance.addListener('click', (e: any) => {
          if (e.latLng) {
            const lat = e.latLng.lat()
            const lng = e.latLng.lng()
            markerInstance.setPosition({ lat, lng })
            updateLocation(lat, lng)
          }
        })
      }

      setIsLoading(false)
    }

    // Load Google Maps script if not already loaded
    if (window.google && window.google.maps) {
      initMap()
    } else {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        initMap()
        return
      }

      const script = document.createElement('script')
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDemoKeyForTesting'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      script.onerror = () => {
        console.error('Failed to load Google Maps. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file')
        setIsLoading(false)
      }
      document.head.appendChild(script)
    }
  }, [initialLocation, mode, childName])

  // Initialize Autocomplete for search
  useEffect(() => {
    if (!map || !showSearch) return

    const searchInput = document.getElementById('location-search') as HTMLInputElement
    if (!searchInput) return

    autocompleteRef.current = new window.google.maps.places.Autocomplete(searchInput, {
      types: ['address'],
      componentRestrictions: { country: 'gh' } // Restrict to Ghana
    })

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace()
      if (place?.geometry?.location && marker) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        
        marker.setPosition({ lat, lng })
        map.setCenter({ lat, lng })
        map.setZoom(15)
        
        setAddress(place.formatted_address || '')
        updateLocation(lat, lng)
      }
    })
  }, [map, showSearch, marker])

  const updateLocation = (lat: number, lng: number) => {
    if (geocoderRef.current) {
      geocoderRef.current.geocode(
        { location: { lat, lng } },
        (results: any, status: string) => {
          if (status === 'OK' && results && results[0]) {
            const newAddress = results[0].formatted_address
            setAddress(newAddress)
            if (onLocationSelect) {
              onLocationSelect({ lat, lng, address: newAddress })
            }
          }
        }
      )
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setCurrentLocation({ lat, lng })
        
        if (marker && map) {
          marker.setPosition({ lat, lng })
          map.setCenter({ lat, lng })
          map.setZoom(15)
          updateLocation(lat, lng)
        }
        setIsLoading(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsLoading(false)
      }
    )
  }

  const openInGoogleMaps = () => {
    if (marker) {
      const position = marker.getPosition()
      if (position) {
        const lat = position.lat()
        const lng = position.lng()
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
      }
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      {showSearch && (
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdSearch color="gray.400" />
          </InputLeftElement>
          <Input
            id="location-search"
            placeholder="Search for location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      )}

      <Card p={0} overflow="hidden">
        <Box position="relative" h={height} w="100%">
          {isLoading && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={1000}
            >
              <Spinner size="xl" color="teal.500" />
            </Box>
          )}
          <Box
            ref={mapRef}
            h="100%"
            w="100%"
            borderRadius="lg"
            overflow="hidden"
          />
        </Box>
      </Card>

      {address && (
        <Card p={4}>
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <HStack spacing={2}>
                <Icon as={MdLocationOn} color="teal.500" />
                <Text fontWeight="semibold">Location</Text>
              </HStack>
              {mode === 'view' && (
                <Badge colorScheme="teal">Verified</Badge>
              )}
            </HStack>
            <Text fontSize="sm" color="gray.600">
              {address}
            </Text>
            {currentLocation && (
              <Text fontSize="xs" color="gray.500">
                Coordinates: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
              </Text>
            )}
          </VStack>
        </Card>
      )}

      <HStack spacing={2}>
        <Button
          leftIcon={<MdMyLocation />}
          onClick={getCurrentLocation}
          isLoading={isLoading}
          size="sm"
          variant="outline"
          flex={1}
        >
          Use My Location
        </Button>
        {mode === 'view' && (
          <Button
            leftIcon={<MdDirections />}
            onClick={openInGoogleMaps}
            size="sm"
            colorScheme="teal"
            variant="outline"
            flex={1}
          >
            Open in Maps
          </Button>
        )}
      </HStack>

      {!window.google && (
        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">
            Google Maps API key not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file
          </Text>
        </Alert>
      )}
    </VStack>
  )
}


