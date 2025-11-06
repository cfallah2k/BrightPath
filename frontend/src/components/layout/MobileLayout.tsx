import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  MdHome, 
  MdPerson, 
  MdBarChart
} from 'react-icons/md'

interface MobileLayoutProps {
  children: ReactNode
}

const navItems = [
  { path: '/dashboard', icon: MdHome, label: 'Home' },
  { path: '/children', icon: MdPerson, label: 'Children' },
  { path: '/ai/insights', icon: MdBarChart, label: 'AI Insights' },
  { path: '/reports', icon: MdBarChart, label: 'Reports' },
  { path: '/profile', icon: MdPerson, label: 'Profile' },
]

// Routes that should hide bottom nav
const routesWithoutBottomNav = [
  '/loader', 
  '/role-selector', 
  '/login', 
  '/signup', 
  '/attendance/record', 
  '/children/register', 
  '/assessments/new', 
  '/children/:id/edit',
  '/ai/chat',
  '/tutorial/:moduleId'
]

export default function MobileLayout({ children }: MobileLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const activeColor = 'teal.500'
  const inactiveColor = 'gray.400'

  // Check if bottom nav should be hidden
  const shouldHideBottomNav = routesWithoutBottomNav.some(route => {
    const regex = new RegExp('^' + route.replace(':id', '.*') + '$')
    return regex.test(location.pathname)
  })

  const showBottomNav = !shouldHideBottomNav

  return (
    <Box 
      minH="100vh" 
      bg="gray.50"
      position="relative"
      pb={{ base: showBottomNav ? '80px' : '0', md: 0 }}
      className="mobile-fade-in"
    >
      {/* Desktop Sidebar (hidden on mobile) */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position="fixed"
        left={0}
        top={0}
        bottom={0}
        w="250px"
        bg={bg}
        borderRight="1px"
        borderColor={borderColor}
        shadow="sm"
        zIndex={100}
      >
        <Box p={4}>
          <Text fontSize="xl" fontWeight="bold" color="teal.600" mb={6}>
            BrightPath
          </Text>
          <Flex direction="column" gap={2}>
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path)
              const Icon = item.icon
              return (
                <Flex
                  key={item.path}
                  align="center"
                  gap={3}
                  p={3}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => navigate(item.path)}
                  bg={isActive ? 'teal.50' : 'transparent'}
                  color={isActive ? 'teal.600' : 'gray.600'}
                  fontWeight={isActive ? 'semibold' : 'normal'}
                  _hover={{ bg: 'gray.50' }}
                  transition="all 0.2s"
                  _active={{ transform: 'scale(0.98)' }}
                >
                  <Icon size="20px" />
                  <Text>{item.label}</Text>
                </Flex>
              )
            })}
          </Flex>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        as="main"
        minH="100vh"
        ml={{ base: 0, md: '250px' }}
        position="relative"
        overflowX="hidden"
      >
        {children}
      </Box>

      {/* Bottom Navigation Bar (Mobile only) - Enhanced */}
      {showBottomNav && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg={bg}
          borderTop="1px"
          borderColor={borderColor}
          shadow="mobile-lg"
          zIndex={1000}
          display={{ base: 'block', md: 'none' }}
          pb="env(safe-area-inset-bottom)"
          className="mobile-slide-up"
        >
          <Flex justify="space-around" align="center" py={2} px={1}>
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path)
              const Icon = item.icon
              return (
                <Flex
                  key={item.path}
                  direction="column"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  onClick={() => navigate(item.path)}
                  flex={1}
                  py={2}
                  px={1}
                  minH="64px"
                  role="button"
                  aria-label={item.label}
                  position="relative"
                  transition="all 0.2s"
                  _active={{ transform: 'scale(0.95)' }}
                  _hover={{ bg: 'gray.50' }}
                  borderRadius="md"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <Box
                      position="absolute"
                      top={0}
                      left="50%"
                      transform="translateX(-50%)"
                      w="40px"
                      h="3px"
                      bg={activeColor}
                      borderRadius="full"
                    />
                  )}
                  <Icon 
                    size="26px" 
                    style={{ 
                      color: isActive ? activeColor : inactiveColor,
                      transition: 'color 0.2s'
                    }} 
                  />
                  <Text
                    fontSize="10px"
                    mt={0.5}
                    color={isActive ? activeColor : inactiveColor}
                    fontWeight={isActive ? 'bold' : 'normal'}
                    transition="all 0.2s"
                    letterSpacing="0.3px"
                  >
                    {item.label}
                  </Text>
                </Flex>
              )
            })}
          </Flex>
        </Box>
      )}
    </Box>
  )
}

