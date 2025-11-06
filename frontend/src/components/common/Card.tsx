import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface CardProps extends BoxProps {
  children: ReactNode
  clickable?: boolean
}

export default function Card({ children, clickable, ...props }: CardProps) {
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
      _hover={clickable ? { 
        shadow: { base: 'md', md: 'lg' }, 
        transform: { base: 'scale(0.98)', md: 'translateY(-2px)' }
      } : {}}
      _active={clickable ? { 
        transform: 'scale(0.97)',
        shadow: 'sm'
      } : {}}
      className="mobile-scale-in"
      {...props}
    >
      {children}
    </Box>
  )
}

