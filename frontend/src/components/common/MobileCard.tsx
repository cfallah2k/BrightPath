import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MobileCardProps extends BoxProps {
  children: ReactNode
  clickable?: boolean
  onPress?: () => void
}

/**
 * Mobile-optimized card component with better touch interactions
 */
export default function MobileCard({ children, clickable, onPress, ...props }: MobileCardProps) {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      bg={bg}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      p={{ base: 4, md: 5 }}
      shadow={{ base: 'sm', md: 'sm' }}
      cursor={clickable ? 'pointer' : 'default'}
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      onClick={onPress}
      _active={clickable ? { 
        transform: 'scale(0.97)',
        shadow: 'sm'
      } : {}}
      _hover={clickable ? { 
        shadow: { base: 'md', md: 'lg' }, 
        transform: { base: 'none', md: 'translateY(-2px)' }
      } : {}}
      className="mobile-scale-in"
      touchAction="manipulation"
      userSelect="none"
      {...props}
    >
      {children}
    </Box>
  )
}

