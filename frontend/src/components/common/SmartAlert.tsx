import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
  VStack,
  Badge,
  Icon
} from '@chakra-ui/react'
import { MdWarning, MdInfo, MdCheckCircle, MdError } from 'react-icons/md'

interface SmartAlertProps {
  type: 'warning' | 'info' | 'success' | 'error'
  title: string
  description: string
  aiConfidence?: number
  actionLabel?: string
  onAction?: () => void
  dismissible?: boolean
  onDismiss?: () => void
}

export default function SmartAlert({
  type,
  title,
  description,
  aiConfidence,
  actionLabel,
  onAction,
  dismissible,
  onDismiss
}: SmartAlertProps) {
  const getIcon = () => {
    switch (type) {
      case 'warning': return MdWarning
      case 'info': return MdInfo
      case 'success': return MdCheckCircle
      case 'error': return MdError
      default: return MdInfo
    }
  }

  return (
    <Alert
      status={type}
      borderRadius="lg"
      variant="left-accent"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="start"
    >
      <AlertIcon as={getIcon()} boxSize={5} />
      <VStack align="start" spacing={2} flex={1}>
        <HStack justify="space-between" w="full">
          <AlertTitle fontSize="sm" fontWeight="semibold">
            {title}
          </AlertTitle>
          {aiConfidence && (
            <Badge colorScheme="purple" fontSize="xs">
              AI: {aiConfidence}%
            </Badge>
          )}
        </HStack>
        <AlertDescription fontSize="sm">
          {description}
        </AlertDescription>
        {(actionLabel || dismissible) && (
          <HStack spacing={2} pt={1}>
            {actionLabel && onAction && (
              <Button size="xs" colorScheme={type} onClick={onAction}>
                {actionLabel}
              </Button>
            )}
            {dismissible && onDismiss && (
              <Button size="xs" variant="ghost" onClick={onDismiss}>
                Dismiss
              </Button>
            )}
          </HStack>
        )}
      </VStack>
    </Alert>
  )
}

