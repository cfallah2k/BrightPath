import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Button,
  Divider,
  useToast
} from '@chakra-ui/react'
import Card from '../components/common/Card'
import Header from '../components/layout/Header'
import MobileLayout from '../components/layout/MobileLayout'
import { useState } from 'react'

export default function Settings() {
  const toast = useToast()
  const [settings, setSettings] = useState({
    notifications: true,
    offlineMode: true,
    language: 'en',
    theme: 'light',
    autoSync: true,
  })

  const handleSave = () => {
    // TODO: Save settings to localStorage or backend
    localStorage.setItem('brightpath_settings', JSON.stringify(settings))
    toast({
      title: 'Settings saved',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <MobileLayout>
      <Header title="Settings" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }} maxW="100%" overflowX="hidden">
        <VStack spacing={4} align="stretch">
          <Card>
            <Heading size="sm" mb={4}>Notifications</Heading>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text fontWeight="medium">Push Notifications</Text>
                  <Text fontSize="sm" color="gray.600">
                    Receive notifications about important updates
                  </Text>
                </VStack>
                <Switch
                  isChecked={settings.notifications}
                  onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                />
              </HStack>
            </VStack>
          </Card>

          <Card>
            <Heading size="sm" mb={4}>Data & Sync</Heading>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text fontWeight="medium">Offline Mode</Text>
                  <Text fontSize="sm" color="gray.600">
                    Enable offline data collection
                  </Text>
                </VStack>
                <Switch
                  isChecked={settings.offlineMode}
                  onChange={(e) => setSettings({ ...settings, offlineMode: e.target.checked })}
                />
              </HStack>
              
              <Divider />
              
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text fontWeight="medium">Auto Sync</Text>
                  <Text fontSize="sm" color="gray.600">
                    Automatically sync when online
                  </Text>
                </VStack>
                <Switch
                  isChecked={settings.autoSync}
                  onChange={(e) => setSettings({ ...settings, autoSync: e.target.checked })}
                />
              </HStack>
            </VStack>
          </Card>

          <Card>
            <Heading size="sm" mb={4}>Appearance</Heading>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Language</FormLabel>
                <Select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="tw">Twi</option>
                  <option value="ga">Ga</option>
                  <option value="ewe">Ewe</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Theme</FormLabel>
                <Select
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </Select>
              </FormControl>
            </VStack>
          </Card>

          <Card>
            <Heading size="sm" mb={4}>Data Management</Heading>
            <VStack spacing={3} align="stretch">
              <Button variant="outline" size="sm" w="full">
                Export Data
              </Button>
              <Button variant="outline" colorScheme="red" size="sm" w="full">
                Clear Cache
              </Button>
            </VStack>
          </Card>

          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleSave}
            w="full"
          >
            Save Settings
          </Button>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

