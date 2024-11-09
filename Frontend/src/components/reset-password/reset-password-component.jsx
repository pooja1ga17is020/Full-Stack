import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword, verifyEmailForResetPassword } from './../../services/user-service'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Flex,
  Text,
} from '@chakra-ui/react'

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [urlWithToken, setUrlWithToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setErrorMessage('')
    const value = e.target.value
    const checkEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
    setIsEmailValid(checkEmail)
    setEmail(value)
  }

  const handleNewPasswordChange = (e) => {
    setErrorMessage('')
    const value = e.target.value
    const checkPassword = value.length >= 6
    setIsPasswordValid(checkPassword)
    setNewPassword(value)
  }

  const handleConfirmPasswordChange = (e) => {
    setErrorMessage('')
    setConfirmPassword(e.target.value)
  }

  const handleVerifyEmail = async () => {
    if (isEmailValid) {
      try {
        setIsLoading(true)
        const payload = {
          email: email,
        }
        const response = await verifyEmailForResetPassword(payload)
        if (response.status === 200) {
          setIsVerified(true)
          setUrlWithToken(response.data.trim())
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setErrorMessage('Error: Incorrect email or server error')
        } else {
          setErrorMessage('An unexpected error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    } else {
      setErrorMessage('Please enter a valid email address.')
    }
  }

  const handleResetPassword = async () => {
    if (!isPasswordValid) {
      setErrorMessage('Password must be at least 6 characters long.')
    } else if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
    } else {
      const payload = {
        newPassword: newPassword,
      }
      try {
        setIsLoading(true)
        const response = await resetPassword(urlWithToken, payload)
        if (response.status === 200) {
          if (response.data === 'Password reset successfully') {
            alert('Password reset successfully')
            navigate('/login')
          } else {
            setErrorMessage('Unexpected response from the server')
          }
        } else {
          setErrorMessage('Unexpected response from the server')
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setErrorMessage('Error: Incorrect email or server error')
        } else {
          setErrorMessage('An unexpected error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Box minH="90vh" display="flex" justifyContent="center" alignItems="center" p={6}>
      <Box bg="white" p={8} rounded="lg" boxShadow="lg" maxWidth="400px" width="100%">
        <Heading mb={6} textAlign="center" fontSize="xl">
          Please Verify Your Email Before Password Reset
        </Heading>
        {!isVerified ? (
          <VStack spacing={4}>
            <FormControl id="email" isRequired isInvalid={!isEmailValid && email !== ''}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => {
                  if (!isEmailValid) setErrorMessage('Please enter a valid email.')
                }}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              width="100%"
              onClick={handleVerifyEmail}
              disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Verify Email'}
            </Button>
            <Flex>
              <Box height={'100%'} color={'teal'} ml={1} _hover={{ textDecor: 'underline' }}>
                <Link to={'/login'}>Back to Login</Link>
              </Box>
            </Flex>
          </VStack>
        ) : (
          <VStack spacing={4}>
            <FormControl
              id="newPassword"
              isRequired
              isInvalid={!isPasswordValid && newPassword !== ''}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                onBlur={() => {
                  if (!isPasswordValid)
                    setErrorMessage('Password must be at least 6 characters long.')
                }}
              />
            </FormControl>
            <FormControl
              id="confirmPassword"
              isRequired
              isInvalid={confirmPassword !== '' && confirmPassword !== newPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="text"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() => {
                  if (confirmPassword !== newPassword) setErrorMessage('Passwords do not match.')
                }}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              width="100%"
              onClick={handleResetPassword}
              isDisabled={
                !isEmailValid || !isPasswordValid || newPassword !== confirmPassword || isLoading
              }>
              {isLoading ? 'Loading...' : 'Reset Password'}
            </Button>
          </VStack>
        )}
        {errorMessage && (
          <Text color="red.500" mt={4} textAlign="center">
            {errorMessage}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default ResetPasswordForm
