import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Card,
  Icon,
  SimpleGrid,
  Divider,
  Badge,
  Link
} from '@chakra-ui/react'
import { 
  MdSchool, 
  MdPeople, 
  MdInsights, 
  MdSecurity,
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdCode,
  MdCloud
} from 'react-icons/md'
import Header from '../components/layout/Header'
import MobileLayout from '../components/layout/MobileLayout'

export default function About() {

  const features = [
    {
      icon: MdPeople,
      title: 'Child Tracking',
      description: 'Comprehensive tracking of out-of-school children with detailed profiles and history',
      color: 'teal'
    },
    {
      icon: MdSchool,
      title: 'School Management',
      description: 'Manage school records, enrollments, and coordinate with educational institutions',
      color: 'blue'
    },
    {
      icon: MdInsights,
      title: 'AI-Powered Insights',
      description: 'Advanced AI analytics to predict risks, identify opportunities, and recommend actions',
      color: 'purple'
    },
    {
      icon: MdSecurity,
      title: 'Secure & Private',
      description: 'End-to-end encryption and privacy protection for all child data',
      color: 'green'
    },
    {
      icon: MdCloud,
      title: 'Offline Capable',
      description: 'Work without internet connection with automatic sync when online',
      color: 'orange'
    },
    {
      icon: MdCode,
      title: 'Open Source',
      description: 'Built with transparency and community collaboration in mind',
      color: 'red'
    }
  ]

  const stats = [
    { label: 'Children Tracked', value: '0', color: 'teal' },
    { label: 'Schools Connected', value: '0', color: 'blue' },
    { label: 'Field Workers', value: '0', color: 'green' },
    { label: 'Counties Covered', value: '0', color: 'purple' }
  ]

  return (
    <MobileLayout>
      <Header title="About BrightPath" />
      <Box px={{ base: 3, sm: 4, md: 6 }} py={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          {/* Hero Section */}
          <Card p={6} bgGradient="linear(to-r, teal.400, teal.600)" color="white">
            <VStack spacing={4} align="center" textAlign="center">
              <Box
                w="100px"
                h="100px"
                borderRadius="2xl"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="4xl" fontWeight="bold" color="teal.600">
                  BP
                </Text>
              </Box>
              <Heading size="xl">BrightPath</Heading>
              <Text fontSize="lg" opacity={0.9}>
                Out of School Children Tracking System
              </Text>
              <Badge colorScheme="whiteAlpha" fontSize="md" px={3} py={1}>
                Version 1.0.0
              </Badge>
            </VStack>
          </Card>

          {/* Mission */}
          <Card p={6}>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Our Mission</Heading>
              <Text color="gray.600" lineHeight="tall">
                BrightPath is an innovative solution designed to accurately track enrollment, retention, 
                and learning outcomes of out-of-school children in Liberia. Our mission is to ensure 
                every child has access to quality education by providing real-time data, AI-powered 
                insights, and community-driven interventions.
              </Text>
            </VStack>
          </Card>

          {/* Key Features */}
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Key Features</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} p={5}>
                    <HStack spacing={4} align="start">
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg={`${feature.color}.100`}
                        color={`${feature.color}.600`}
                      >
                        <Icon as={IconComponent} boxSize={6} />
                      </Box>
                      <VStack align="start" spacing={1} flex={1}>
                        <Heading size="sm">{feature.title}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {feature.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Card>
                )
              })}
            </SimpleGrid>
          </VStack>

          {/* Statistics */}
          <Card p={6} bgGradient="linear(to-r, blue.50, teal.50)">
            <VStack spacing={4}>
              <Heading size="md" textAlign="center">
                Impact at a Glance
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
                {stats.map((stat, index) => (
                  <VStack key={index} spacing={2}>
                    <Text fontSize="3xl" fontWeight="bold" color={`${stat.color}.600`}>
                      {stat.value}
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      {stat.label}
                    </Text>
                  </VStack>
                ))}
              </SimpleGrid>
            </VStack>
          </Card>

          {/* Technology Stack */}
          <Card p={6}>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Technology</Heading>
              <Text color="gray.600">
                Built with modern, scalable technologies to ensure reliability and performance:
              </Text>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                {['React', 'TypeScript', 'Supabase', 'AI/ML', 'PWA', 'Netlify'].map((tech) => (
                  <Badge key={tech} colorScheme="teal" fontSize="sm" p={2} textAlign="center">
                    {tech}
                  </Badge>
                ))}
              </SimpleGrid>
            </VStack>
          </Card>

          {/* Contact & Support */}
          <Card p={6}>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Contact & Support</Heading>
              <VStack align="stretch" spacing={3}>
                <HStack spacing={3}>
                  <Icon as={MdEmail} color="teal.600" />
                  <Link href="mailto:annitallc@gmail.com" color="teal.600">
                    annitallc@gmail.com
                  </Link>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={MdPhone} color="teal.600" />
                  <Link href="tel:+231775057227" color="teal.600">
                    +231 77 505 7227
                  </Link>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={MdLocationOn} color="teal.600" />
                  <Text color="gray.700">Monrovia, Liberia</Text>
                </HStack>
              </VStack>
            </VStack>
          </Card>

          {/* Credits */}
          <Card p={6} bg="gray.50">
            <VStack align="stretch" spacing={3}>
              <Heading size="sm">Credits</Heading>
              <Text fontSize="sm" color="gray.600">
                Developed for the Innovate4Children: Out of School Children Challenge
              </Text>
              <Divider />
              <VStack align="start" spacing={2}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                  Built by Annita LLC
                </Text>
                <HStack spacing={2}>
                  <Icon as={MdEmail} color="gray.500" boxSize={4} />
                  <Link href="mailto:annitallc@gmail.com" color="teal.600" fontSize="xs">
                    annitallc@gmail.com
                  </Link>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={MdPhone} color="gray.500" boxSize={4} />
                  <Link href="tel:+231775057227" color="teal.600" fontSize="xs">
                    +231 77 505 7227
                  </Link>
                </HStack>
              </VStack>
              <Divider />
              <Text fontSize="xs" color="gray.500" fontStyle="italic">
                This solution was designed and built for Ghana's out-of-school children tracking needs, 
                but was developed and built in Liberia by Annita LLC. The solution is fully adaptable 
                to Ghana's specific requirements, regions, and data structures.
              </Text>
              <Divider />
              <Text fontSize="xs" color="gray.500">
                © {new Date().getFullYear()} BrightPath. All rights reserved.
                <br />
                Built with ❤️ in Liberia for the children of Ghana
              </Text>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

