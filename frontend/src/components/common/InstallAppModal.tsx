import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Icon,
  Box,
  Image,
  useToast
} from '@chakra-ui/react'
import { MdPhoneAndroid, MdPhoneIphone, MdComputer, MdClose } from 'react-icons/md'

interface InstallAppModalProps {
  isOpen: boolean
  onClose: () => void
  onInstall: () => void
}

export default function InstallAppModal({ isOpen, onClose, onInstall }: InstallAppModalProps) {
  const toast = useToast()

  const handleInstall = () => {
    onInstall()
    toast({
      title: 'Installing BrightPath',
      description: 'The app will be added to your home screen',
      status: 'info',
      duration: 3000,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent mx={4} borderRadius="2xl">
        <ModalHeader>
          <VStack spacing={2} align="center" textAlign="center">
            <Box
              w="80px"
              h="80px"
              borderRadius="2xl"
              bgGradient="linear(to-br, teal.400, teal.600)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Text fontSize="3xl" fontWeight="bold" color="white">
                BP
              </Text>
            </Box>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              Install BrightPath App
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            <Text color="gray.600" textAlign="center">
              Install BrightPath on your device for a better experience with offline access, push notifications, and faster loading.
            </Text>

            <VStack spacing={4} align="stretch">
              <HStack spacing={3} p={3} bg="teal.50" borderRadius="lg">
                <Icon as={MdPhoneAndroid} boxSize={6} color="teal.600" />
                <VStack align="start" spacing={0} flex={1}>
                  <Text fontWeight="semibold" fontSize="sm">
                    Works Offline
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Access data without internet connection
                  </Text>
                </VStack>
              </HStack>

              <HStack spacing={3} p={3} bg="blue.50" borderRadius="lg">
                <Icon as={MdPhoneIphone} boxSize={6} color="blue.600" />
                <VStack align="start" spacing={0} flex={1}>
                  <Text fontWeight="semibold" fontSize="sm">
                    Faster Performance
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Quick access from your home screen
                  </Text>
                </VStack>
              </HStack>

              <HStack spacing={3} p={3} bg="green.50" borderRadius="lg">
                <Icon as={MdComputer} boxSize={6} color="green.600" />
                <VStack align="start" spacing={0} flex={1}>
                  <Text fontWeight="semibold" fontSize="sm">
                    Push Notifications
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Get alerts for important updates
                  </Text>
                </VStack>
              </HStack>
            </VStack>

            <VStack spacing={3} pt={2}>
              <Button
                colorScheme="teal"
                size="lg"
                w="full"
                onClick={handleInstall}
              >
                Install App
              </Button>
              <Button
                variant="ghost"
                size="sm"
                w="full"
                onClick={onClose}
              >
                Maybe Later
              </Button>
            </VStack>

            <Box pt={4} borderTop="1px" borderColor="gray.200">
              <Text fontSize="xs" color="gray.500" textAlign="center">
                On iOS: Tap Share → Add to Home Screen
                <br />
                On Android: Tap Menu → Install App
              </Text>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

