import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  useToast,
  Flex,
  Link,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { MdEmail, MdArrowBack } from 'react-icons/md'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email')
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: 'OTP Sent',
        description: 'We\'ve sent a verification code to your email/phone',
        status: 'success',
        duration: 3000,
      })
      
      setStep('otp')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send OTP',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex minH="100vh" bgGradient="linear(to-br, teal.400, teal.600)" align="center" justify="center">
      <Container maxW="container.sm" py={8} px={4}>
        <Box
          bg="white"
          borderRadius="2xl"
          shadow="2xl"
          p={{ base: 6, md: 8 }}
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<MdArrowBack />}
                onClick={() => navigate('/login')}
                mb={2}
                color="gray.600"
              >
                Back to Login
              </Button>
              <Heading size="xl" color="teal.600" mb={2}>
                {step === 'email' && 'Forgot Password?'}
                {step === 'otp' && 'Verify OTP'}
                {step === 'reset' && 'Reset Password'}
              </Heading>
              <Text color="gray.600">
                {step === 'email' && 'Enter your email or phone to receive a verification code'}
                {step === 'otp' && 'Enter the 6-digit code sent to your email/phone'}
                {step === 'reset' && 'Create a new password for your account'}
              </Text>
            </Box>

            {step === 'email' && (
              <form onSubmit={handleSubmitEmail}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Email or Phone Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <MdEmail color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Enter email or phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    w="full"
                    isLoading={isLoading}
                    loadingText="Sending..."
                  >
                    Send Verification Code
                  </Button>
                </VStack>
              </form>
            )}

            {step === 'otp' && (
              <OTPInput
                onComplete={(otp) => {
                  toast({
                    title: 'OTP Verified',
                    description: 'Please create a new password',
                    status: 'success',
                    duration: 3000,
                  })
                  setStep('reset')
                }}
                onResend={() => {
                  toast({
                    title: 'Code Resent',
                    description: 'A new code has been sent',
                    status: 'info',
                    duration: 3000,
                  })
                }}
              />
            )}

            {step === 'reset' && (
              <ResetPasswordForm
                onSuccess={() => {
                  toast({
                    title: 'Password Reset Successful',
                    description: 'You can now login with your new password',
                    status: 'success',
                    duration: 3000,
                  })
                  navigate('/login')
                }}
              />
            )}

            <Text textAlign="center" fontSize="sm">
              Remember your password?{' '}
              <Link color="teal.600" fontWeight="semibold" onClick={() => navigate('/login')}>
                Sign in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Flex>
  )
}

// OTP Input Component
function OTPInput({ onComplete, onResend }: { onComplete: (otp: string) => void; onResend: () => void }) {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const inputRefs = useState(() => Array(6).fill(null).map(() => ({ current: null as HTMLInputElement | null })))[0]

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otpDigits]
    newOtp[index] = value
    setOtpDigits(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus()
    }

    // Check if all filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      onComplete(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newOtp = [...otpDigits]
    pastedData.split('').forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char
      }
    })
    setOtpDigits(newOtp)
    if (pastedData.length === 6) {
      onComplete(pastedData)
    }
  }

  return (
    <VStack spacing={4}>
      <HStack spacing={2} justify="center">
        {otpDigits.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs[index].current = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
            w="50px"
            h="60px"
            borderRadius="lg"
            border="2px"
            borderColor={digit ? 'teal.500' : 'gray.300'}
            _focus={{
              borderColor: 'teal.500',
              boxShadow: '0 0 0 1px teal.500'
            }}
          />
        ))}
      </HStack>
      <Button
        variant="link"
        size="sm"
        color="teal.600"
        onClick={onResend}
      >
        Resend Code
      </Button>
    </VStack>
  )
}

// Reset Password Form
function ResetPasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 5000,
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        status: 'error',
        duration: 5000,
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSuccess()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to reset password',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          w="full"
          isLoading={isLoading}
          loadingText="Resetting..."
        >
          Reset Password
        </Button>
      </VStack>
    </form>
  )
}

