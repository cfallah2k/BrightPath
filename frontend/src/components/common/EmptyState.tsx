import { VStack, Text, Button, Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Box py={8} textAlign="center">
      <VStack spacing={4}>
        {icon && <Box>{icon}</Box>}
        <VStack spacing={2}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.700">
            {title}
          </Text>
          {description && (
            <Text fontSize="sm" color="gray.500" maxW="300px">
              {description}
            </Text>
          )}
        </VStack>
        {actionLabel && onAction && (
          <Button colorScheme="teal" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

