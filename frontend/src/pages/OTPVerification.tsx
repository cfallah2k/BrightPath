import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  useToast,
  Flex,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { MdArrowBack, MdLock } from 'react-icons/md'

export default function OTPVerification() {
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  
  const purpose = (location.state as any)?.purpose || 'login'
  const contactInfo = (location.state as any)?.contactInfo || 'your email/phone'
  const onVerifyCallback = (location.state as any)?.onVerify
  const onResendCallback = (location.state as any)?.onResend

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const inputRefs = useState(() => Array(6).fill(null).map(() => ({ current: null as HTMLInputElement | null })))[0]

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value.replace(/\D/g, '') // Only numbers
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus()
    }

    // Auto-verify when all filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '')
    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)
    if (pastedData.length === 6) {
      handleVerify(pastedData)
    }
  }

  const handleVerify = async (otpCode: string) => {
    setIsVerifying(true)
    try {
      if (onVerifyCallback) {
        await onVerifyCallback(otpCode)
      } else {
        // Default verification logic
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      toast({
        title: 'Verification Successful',
        description: 'Your account has been verified',
        status: 'success',
        duration: 3000,
      })
      
      // Navigate based on purpose
      if (purpose === 'login') {
        navigate('/dashboard')
      } else if (purpose === 'signup') {
        navigate('/dashboard')
      } else {
        navigate(-1)
      }
    } catch (error: any) {
      toast({
        title: 'Verification Failed',
        description: error.message || 'Invalid OTP. Please try again.',
        status: 'error',
        duration: 5000,
      })
      // Clear OTP on error
      setOtp(['', '', '', '', '', ''])
      inputRefs[0].current?.focus()
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      if (onResendCallback) {
        await onResendCallback()
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      toast({
        title: 'Code Resent',
        description: 'A new verification code has been sent',
        status: 'success',
        duration: 3000,
      })
      
      setCountdown(60)
      setOtp(['', '', '', '', '', ''])
      inputRefs[0].current?.focus()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to resend code',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsResending(false)
    }
  }

  const getPurposeTitle = () => {
    switch (purpose) {
      case 'login': return 'Verify Login'
      case 'signup': return 'Verify Account'
      case 'password_reset': return 'Verify Password Reset'
      case 'phone_verification': return 'Verify Phone Number'
      case 'email_verification': return 'Verify Email'
      default: return 'Verify OTP'
    }
  }

  const getPurposeDescription = () => {
    switch (purpose) {
      case 'login': return 'Enter the 6-digit code sent to verify your login'
      case 'signup': return 'Enter the 6-digit code sent to verify your account'
      case 'password_reset': return 'Enter the 6-digit code to reset your password'
      case 'phone_verification': return 'Enter the code sent to your phone number'
      case 'email_verification': return 'Enter the code sent to your email'
      default: return 'Enter the 6-digit verification code'
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
                onClick={() => navigate(-1)}
                mb={2}
                color="gray.600"
              >
                Back
              </Button>
              <Heading size="xl" color="teal.600" mb={2}>
                {getPurposeTitle()}
              </Heading>
              <Text color="gray.600">
                {getPurposeDescription()}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2}>
                Code sent to: {contactInfo}
              </Text>
            </Box>

            <VStack spacing={4}>
              <HStack spacing={2} justify="center">
                {otp.map((digit, index) => (
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
                    isDisabled={isVerifying}
                  />
                ))}
              </HStack>

              <Alert status="info" borderRadius="md" fontSize="sm">
                <AlertIcon />
                <Text>
                  {isVerifying ? 'Verifying...' : 'Enter the 6-digit code'}
                </Text>
              </Alert>

              <VStack spacing={2} w="full">
                <Button
                  colorScheme="teal"
                  size="lg"
                  w="full"
                  onClick={() => handleVerify(otp.join(''))}
                  isDisabled={otp.join('').length !== 6 || isVerifying}
                  isLoading={isVerifying}
                  loadingText="Verifying..."
                  leftIcon={<MdLock />}
                >
                  Verify Code
                </Button>

                <HStack spacing={2} w="full" justify="center">
                  <Text fontSize="sm" color="gray.600">
                    Didn't receive code?
                  </Text>
                  <Button
                    variant="link"
                    size="sm"
                    color="teal.600"
                    onClick={handleResend}
                    isDisabled={countdown > 0 || isResending}
                    isLoading={isResending}
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Flex>
  )
}

