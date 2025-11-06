import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Button,
  FormControl,
  Input,
  useToast,
  SimpleGrid,
  Card,
  Icon
} from '@chakra-ui/react'
import { MdEdit, MdPhone, MdEmail, MdLocationOn, MdInsights, MdLightbulb, MdChat, MdBarChart, MdSchool, MdPerson } from 'react-icons/md'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/common/Card'
import Header from '../components/layout/Header'
import MobileLayout from '../components/layout/MobileLayout'
import { useAuthStore } from '../store/authStore'

export default function Profile() {
  const { fieldWorker } = useAuthStore()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const toast = useToast()

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: 'Profile updated',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <MobileLayout>
      <Header title="Profile" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <VStack spacing={4} align="stretch">
          <Card>
            <VStack spacing={4}>
              <Avatar size="xl" name={fieldWorker?.name || 'User'} />
              <VStack spacing={1}>
                <Heading size="md">{fieldWorker?.name || 'User'}</Heading>
                <Badge colorScheme="teal">
                  {fieldWorker?.role?.replace('_', ' ') || 'Field Worker'}
                </Badge>
              </VStack>
              {!isEditing && (
                <Button
                  leftIcon={<MdEdit />}
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </VStack>
          </Card>

          <Card>
            <Heading size="sm" mb={4}>Contact Information</Heading>
            <VStack spacing={3} align="stretch">
              <HStack>
                <MdPhone size="20px" color="gray.600" />
                {isEditing ? (
                  <FormControl flex={1}>
                    <Input
                      defaultValue={fieldWorker?.phone || ''}
                      placeholder="Phone number"
                    />
                  </FormControl>
                ) : (
                  <Text flex={1}>{fieldWorker?.phone || 'Not provided'}</Text>
                )}
              </HStack>

              <HStack>
                <MdEmail size="20px" color="gray.600" />
                {isEditing ? (
                  <FormControl flex={1}>
                    <Input
                      type="email"
                      defaultValue={fieldWorker?.email || ''}
                      placeholder="Email"
                    />
                  </FormControl>
                ) : (
                  <Text flex={1}>{fieldWorker?.email || 'Not provided'}</Text>
                )}
              </HStack>
            </VStack>
          </Card>

          <Card>
            <Heading size="sm" mb={4}>Assignment</Heading>
            <VStack spacing={3} align="stretch">
              {fieldWorker?.assigned_region && (
                <HStack>
                  <MdLocationOn size="20px" color="gray.600" />
                  <Text flex={1}>
                    {fieldWorker.assigned_region}
                    {fieldWorker.assigned_district && `, ${fieldWorker.assigned_district}`}
                  </Text>
                </HStack>
              )}
            </VStack>
          </Card>

          {/* Quick Access to AI Features */}
          <Card p={5} bgGradient="linear(to-r, purple.50, teal.50)">
            <VStack align="stretch" spacing={4}>
              <Heading size="sm" color="purple.700">AI Features</Heading>
              <SimpleGrid columns={2} spacing={3}>
                <Card
                  clickable
                  onClick={() => navigate('/ai/insights')}
                  p={3}
                  bg="white"
                >
                  <VStack spacing={2}>
                    <Icon as={MdInsights} boxSize={5} color="purple.500" />
                    <Text fontSize="xs" fontWeight="semibold">AI Insights</Text>
                  </VStack>
                </Card>
                <Card
                  clickable
                  onClick={() => navigate('/ai/recommendations')}
                  p={3}
                  bg="white"
                >
                  <VStack spacing={2}>
                    <Icon as={MdLightbulb} boxSize={5} color="orange.500" />
                    <Text fontSize="xs" fontWeight="semibold">Recommendations</Text>
                  </VStack>
                </Card>
                <Card
                  clickable
                  onClick={() => navigate('/ai/chat')}
                  p={3}
                  bg="white"
                >
                  <VStack spacing={2}>
                    <Icon as={MdChat} boxSize={5} color="teal.500" />
                    <Text fontSize="xs" fontWeight="semibold">AI Assistant</Text>
                  </VStack>
                </Card>
                <Card
                  clickable
                  onClick={() => navigate('/ai/reports')}
                  p={3}
                  bg="white"
                >
                  <VStack spacing={2}>
                    <Icon as={MdBarChart} boxSize={5} color="blue.500" />
                    <Text fontSize="xs" fontWeight="semibold">AI Reports</Text>
                  </VStack>
                </Card>
              </SimpleGrid>
            </VStack>
          </Card>

          {/* Quick Links */}
          <Card>
            <Heading size="sm" mb={4}>Quick Links</Heading>
            <VStack spacing={2} align="stretch">
              <Button
                variant="ghost"
                leftIcon={<MdSchool />}
                justifyContent="flex-start"
                onClick={() => navigate('/tutorial')}
              >
                Tutorials & Guides
              </Button>
              <Button
                variant="ghost"
                leftIcon={<MdPerson />}
                justifyContent="flex-start"
                onClick={() => navigate('/about')}
              >
                About BrightPath
              </Button>
            </VStack>
          </Card>

          {isEditing && (
            <HStack>
              <Button
                variant="outline"
                flex={1}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme="teal"
                flex={1}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </HStack>
          )}
        </VStack>
      </Box>
    </MobileLayout>
  )
}

