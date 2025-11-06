import { useState } from 'react'
import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Button
} from '@chakra-ui/react'
import { MdNotifications, MdNotificationsNone } from 'react-icons/md'
import SmartAlert from '../common/SmartAlert'

interface Notification {
  id: string
  type: 'warning' | 'info' | 'success' | 'error'
  title: string
  description: string
  timestamp: Date
  aiConfidence?: number
  read: boolean
}

export default function NotificationBell() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Dropout Risk Detected',
      description: '3 children in your region have 85% probability of dropping out',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      aiConfidence: 87,
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'New AI Recommendation',
      description: 'AI suggests scheduling home visits for 2 children',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      aiConfidence: 72,
      read: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Attendance Improved',
      description: 'Attendance rates increased by 15% this week',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      aiConfidence: 91,
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            icon={unreadCount > 0 ? <MdNotifications /> : <MdNotificationsNone />}
            variant="ghost"
            size="md"
          />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="0"
              right="0"
              colorScheme="red"
              borderRadius="full"
              fontSize="xs"
              minW="18px"
              h="18px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w="90vw" maxW="400px">
        <PopoverBody p={0}>
          <VStack spacing={0} align="stretch" maxH="400px" overflowY="auto">
            <Box p={3} borderBottom="1px" borderColor="gray.200">
              <HStack justify="space-between">
                <Text fontWeight="semibold">Notifications</Text>
                {unreadCount > 0 && (
                  <Badge colorScheme="red">{unreadCount} new</Badge>
                )}
              </HStack>
            </Box>
            {notifications.length === 0 ? (
              <Box p={6} textAlign="center">
                <Text color="gray.500" fontSize="sm">No notifications</Text>
              </Box>
            ) : (
              notifications.map((notification) => (
                <Box
                  key={notification.id}
                  p={3}
                  borderBottom="1px"
                  borderColor="gray.100"
                  bg={notification.read ? 'white' : 'blue.50'}
                >
                  <SmartAlert
                    type={notification.type}
                    title={notification.title}
                    description={notification.description}
                    aiConfidence={notification.aiConfidence}
                    actionLabel="View"
                    dismissible={!notification.read}
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {notification.timestamp.toLocaleString()}
                  </Text>
                </Box>
              ))
            )}
            <Box p={3} borderTop="1px" borderColor="gray.200">
              <Button size="sm" variant="ghost" w="full">
                View All Notifications
              </Button>
            </Box>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

