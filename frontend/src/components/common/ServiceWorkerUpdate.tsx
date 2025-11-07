import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  HStack,
  Text,
  useToast,
  Icon
} from '@chakra-ui/react'
import { MdRefresh, MdClose } from 'react-icons/md'

export default function ServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const toast = useToast()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      let refreshing = false

      // Check for updates every 30 seconds
      const checkForUpdates = () => {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.update()
          })
        })
      }

      // Also check when page becomes visible (user switches back to tab)
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          checkForUpdates()
        }
      }

      // Check when page regains focus
      const handleFocus = () => {
        checkForUpdates()
      }

      // Check immediately and then every 30 seconds
      checkForUpdates()
      const interval = setInterval(checkForUpdates, 30000) // Check every 30 seconds

      // Add event listeners
      document.addEventListener('visibilitychange', handleVisibilityChange)
      window.addEventListener('focus', handleFocus)

      // Listen for service worker controller change (new version activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true
          // New service worker is controlling the page, reload to get new content
          window.location.reload()
        }
      })

      // Get service worker registration
      navigator.serviceWorker.ready.then((registration) => {
        // Check if there's already a waiting service worker
        if (registration.waiting) {
          setWaitingWorker(registration.waiting)
          setUpdateAvailable(true)
          
          toast({
            title: 'Update Available',
            description: 'A new version of BrightPath is available. Click refresh to update.',
            status: 'info',
            duration: 8000,
            isClosable: true,
          })
        }

        // Listen for new service worker installation
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                // Check if there's a controller (not first install)
                if (navigator.serviceWorker.controller) {
                  // New service worker is installed and waiting
                  setWaitingWorker(newWorker)
                  setUpdateAvailable(true)
                  
                  toast({
                    title: 'Update Available',
                    description: 'A new version of BrightPath is available. Click refresh to update.',
                    status: 'info',
                    duration: 8000,
                    isClosable: true,
                  })
                }
              }
            })
          }
        })
      })

      return () => {
        clearInterval(interval)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('focus', handleFocus)
      }
    }
  }, [toast])

  const handleUpdate = () => {
    if (waitingWorker) {
      // Tell the waiting service worker to skip waiting and activate
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
      setUpdateAvailable(false)
      
      // The controllerchange event will trigger a reload
      // But if it doesn't, force reload after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } else {
      // Fallback: just reload the page
      window.location.reload()
    }
  }

  const handleDismiss = () => {
    setUpdateAvailable(false)
    // Auto-show again after 5 minutes
    setTimeout(() => {
      if (waitingWorker && waitingWorker.state === 'installed') {
        setUpdateAvailable(true)
      }
    }, 5 * 60 * 1000)
  }

  if (!updateAvailable) {
    return null
  }

  return (
    <Box
      position="fixed"
      bottom={{ base: '80px', md: '20px' }}
      left="50%"
      transform="translateX(-50%)"
      zIndex={1000}
      bg="teal.500"
      color="white"
      px={4}
      py={3}
      borderRadius="md"
      shadow="lg"
      maxW="90%"
      w="auto"
    >
      <HStack spacing={3}>
        <Text fontSize="sm" fontWeight="semibold">
          ✨ New update available!
        </Text>
        <Button
          size="sm"
          colorScheme="whiteAlpha"
          leftIcon={<Icon as={MdRefresh} />}
          onClick={handleUpdate}
        >
          Refresh Now
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="white"
          onClick={handleDismiss}
          _hover={{ bg: 'whiteAlpha.200' }}
          aria-label="Dismiss"
        >
          <Icon as={MdClose} />
        </Button>
      </HStack>
    </Box>
  )
}

