import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Icon,
  Card,
  Flex,
  Avatar,
  Badge
} from '@chakra-ui/react'
import { MdSend, MdSmartToy, MdPerson } from 'react-icons/md'
import Header from '../../components/layout/Header'
import MobileLayout from '../../components/layout/MobileLayout'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. I can help you with questions about BrightPath, child tracking, attendance, assessments, and more. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes('register') || lowerInput.includes('add child')) {
      return "To register a new child, go to the Children page and tap the '+' button. You'll need to provide the child's name, date of birth, location, and other relevant information. Would you like step-by-step guidance?"
    }

    if (lowerInput.includes('attendance') || lowerInput.includes('present')) {
      return "To record attendance, go to the Attendance page. You can record attendance for a single child or use batch mode for multiple children. The system will automatically calculate attendance rates and flag any concerns."
    }

    if (lowerInput.includes('assessment') || lowerInput.includes('learning')) {
      return "Learning assessments help track a child's progress. You can create assessments from the Assessments page. There are baseline and quarterly assessments available. Would you like to know more about assessment types?"
    }

    if (lowerInput.includes('ai') || lowerInput.includes('insight') || lowerInput.includes('recommendation')) {
      return "Our AI system analyzes patterns in attendance, enrollment, and family data to provide insights and recommendations. Check the AI Insights page for predictive analytics and the Recommendations page for actionable suggestions."
    }

    if (lowerInput.includes('report') || lowerInput.includes('export')) {
      return "Reports are available in the Reports section. You can view enrollment statistics, retention rates, and disaggregated data by region, gender, and other factors. Reports can be exported for sharing."
    }

    if (lowerInput.includes('help') || lowerInput.includes('how')) {
      return "I can help you with:\n• Registering and managing children\n• Recording attendance\n• Creating assessments\n• Understanding AI insights\n• Generating reports\n• Using offline mode\n\nWhat would you like to know more about?"
    }

    if (lowerInput.includes('offline') || lowerInput.includes('sync')) {
      return "BrightPath works offline! All data is stored locally and automatically syncs when you have internet connection. You can continue working in areas with poor connectivity."
    }

    return "I understand you're asking about: " + userInput + ". Let me help you with that. Could you provide more details about what specifically you need assistance with? I can help with child registration, attendance tracking, assessments, AI insights, reports, and more."
  }

  const quickQuestions = [
    "How do I register a child?",
    "How to record attendance?",
    "What are AI insights?",
    "How does offline mode work?"
  ]

  return (
    <MobileLayout>
      <Header title="AI Assistant" />
      <Box 
        px={{ base: 3, sm: 4, md: 6 }} 
        py={{ base: 4, md: 6 }}
        display="flex"
        flexDirection="column"
        h="calc(100vh - 140px)"
      >
        <VStack spacing={4} align="stretch" flex={1} overflow="hidden">
          {/* Messages */}
          <Box 
            flex={1} 
            overflowY="auto" 
            pr={2}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#CBD5E0',
                borderRadius: '2px',
              },
            }}
          >
            <VStack spacing={4} align="stretch" pb={4}>
              {messages.map((message) => (
                <Flex
                  key={message.id}
                  justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                >
                  <HStack
                    spacing={3}
                    maxW="80%"
                    align="start"
                    flexDirection={message.sender === 'user' ? 'row-reverse' : 'row'}
                  >
                    <Avatar
                      size="sm"
                      bg={message.sender === 'user' ? 'teal.500' : 'purple.500'}
                      icon={message.sender === 'user' ? <MdPerson /> : <MdSmartToy />}
                    />
                    <Card
                      p={3}
                      bg={message.sender === 'user' ? 'teal.500' : 'gray.100'}
                      color={message.sender === 'user' ? 'white' : 'gray.800'}
                      borderRadius="lg"
                    >
                      <Text fontSize="sm" whiteSpace="pre-wrap">
                        {message.text}
                      </Text>
                      <Text fontSize="xs" opacity={0.7} mt={1}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </Card>
                  </HStack>
                </Flex>
              ))}
              {isTyping && (
                <Flex justify="flex-start">
                  <HStack spacing={3}>
                    <Avatar size="sm" bg="purple.500" icon={<MdSmartToy />} />
                    <Card p={3} bg="gray.100" borderRadius="lg">
                      <HStack spacing={1}>
                        <Box w="8px" h="8px" bg="gray.400" borderRadius="full" animation="pulse 1s infinite" />
                        <Box w="8px" h="8px" bg="gray.400" borderRadius="full" animation="pulse 1s infinite" style={{ animationDelay: '0.2s' }} />
                        <Box w="8px" h="8px" bg="gray.400" borderRadius="full" animation="pulse 1s infinite" style={{ animationDelay: '0.4s' }} />
                      </HStack>
                    </Card>
                  </HStack>
                </Flex>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          </Box>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <Box>
              <Text fontSize="xs" color="gray.500" mb={2}>
                Quick Questions:
              </Text>
              <Flex wrap="wrap" gap={2}>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    size="xs"
                    variant="outline"
                    onClick={() => setInput(question)}
                  >
                    {question}
                  </Button>
                ))}
              </Flex>
            </Box>
          )}

          {/* Input */}
          <HStack spacing={2}>
            <Input
              placeholder="Ask me anything about BrightPath..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              size="md"
            />
            <Button
              colorScheme="teal"
              onClick={handleSend}
              isDisabled={!input.trim() || isTyping}
              leftIcon={<MdSend />}
            >
              Send
            </Button>
          </HStack>
        </VStack>
      </Box>
    </MobileLayout>
  )
}

