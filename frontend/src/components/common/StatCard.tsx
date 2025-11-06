import { Text, VStack, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  color?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  subtitle?: string
}

export default function StatCard({ label, value, icon, color = 'teal.500', trend, subtitle }: StatCardProps) {
  return (
    <VStack
      align="start"
      spacing={1}
      p={4}
      bg="white"
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
      shadow="sm"
      flex={1}
    >
      <HStack justify="space-between" w="full">
        <Text fontSize="sm" color="gray.600">
          {label}
        </Text>
        {icon}
      </HStack>
      <Text fontSize="2xl" fontWeight="bold" color={color}>
        {value}
      </Text>
      {trend && (
        <Text fontSize="xs" color={trend.isPositive ? 'green.500' : 'red.500'}>
          {trend.isPositive ? '+' : ''}{trend.value}%
        </Text>
      )}
      {subtitle && (
        <Text fontSize="xs" color="gray.500">
          {subtitle}
        </Text>
      )}
    </VStack>
  )
}

