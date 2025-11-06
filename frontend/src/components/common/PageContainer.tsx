import { Box, Container, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface PageContainerProps extends BoxProps {
  children: ReactNode
}

export default function PageContainer({ children, ...props }: PageContainerProps) {
  return (
    <Box minH="100vh" bg="gray.50" {...props}>
      <Container maxW="container.xl" py={{ base: 4, md: 6 }} px={{ base: 4, md: 6 }}>
        {children}
      </Container>
    </Box>
  )
}

