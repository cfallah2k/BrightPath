import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  Avatar,
  Badge
} from '@chakra-ui/react'
import { MdAccountCircle, MdLogout, MdSettings } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import NotificationBell from './NotificationBell'

interface HeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
}

export default function Header({ title, showBack, onBack }: HeaderProps) {
  const navigate = useNavigate()
  const { fieldWorker, logout } = useAuthStore()
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'coordinator':
        return 'purple'
      case 'education_officer':
        return 'blue'
      case 'school_admin':
        return 'green'
      default:
        return 'teal'
    }
  }

  return (
    <Box
      borderBottom="1px"
      borderColor={borderColor}
      shadow={{ base: 'sm', md: 'sm' }}
      position="sticky"
      top={0}
      zIndex={100}
      pt="env(safe-area-inset-top)"
      backdropFilter="blur(10px)"
      bg="rgba(255, 255, 255, 0.95)"
    >
      <Flex
        align="center"
        justify="space-between"
        px={{ base: 3, sm: 4, md: 6 }}
        py={{ base: 2.5, md: 3 }}
        minH={{ base: '56px', md: '64px' }}
        maxW="container.xl"
        mx="auto"
      >
        <Flex align="center" gap={3} flex={1}>
          {showBack && (
            <IconButton
              aria-label="Back"
              icon={<MdLogout />}
              variant="ghost"
              onClick={onBack || (() => navigate(-1))}
            />
          )}
          <Heading size="md" color="teal.600">
            {title || 'BrightPath'}
          </Heading>
        </Flex>

        <Flex align="center" gap={2}>
          <NotificationBell />
          
          <Menu>
            <MenuButton>
              <Flex align="center" gap={2}>
                <Avatar size="sm" name={fieldWorker?.name || 'User'} />
                <Box display={{ base: 'none', md: 'block' }}>
                  <Text fontSize="sm" fontWeight="medium">
                    {fieldWorker?.name || 'User'}
                  </Text>
                  {fieldWorker?.role && (
                    <Badge
                      colorScheme={getRoleBadgeColor(fieldWorker.role)}
                      fontSize="xs"
                    >
                      {fieldWorker.role.replace('_', ' ')}
                    </Badge>
                  )}
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<MdAccountCircle />} onClick={() => navigate('/profile')}>
                Profile
              </MenuItem>
              <MenuItem icon={<MdSettings />} onClick={() => navigate('/settings')}>
                Settings
              </MenuItem>
              <MenuItem icon={<MdAccountCircle />} onClick={() => navigate('/tutorial')}>
                Tutorials
              </MenuItem>
              <MenuItem icon={<MdAccountCircle />} onClick={() => navigate('/about')}>
                About
              </MenuItem>
              <MenuItem icon={<MdLogout />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

