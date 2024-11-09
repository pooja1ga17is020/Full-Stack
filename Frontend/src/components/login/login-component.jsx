import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  HStack,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react'
import { loginService } from '../../services/user-service'
import useAuthStore from './../../store/auth-store'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setErrorMessage('')
    const value = e.target.value
    const checkEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
    setIsEmailValid(checkEmail)
    setEmail(value)
  }

  const handlePasswordChange = (e) => {
    setErrorMessage('')
    const value = e.target.value
    const checkPassword = value.length >= 6
    setIsPasswordValid(checkPassword)
    setPassword(value)
  }

  const handleClick = async () => {
    const payload = { email, password }

    try {
      setIsLoading(true)
      const response = await loginService(payload)
      if (response.status === 200 && response.data === 'Login Success') {
        login()
        navigate('/')
      } else if (response.data === 'Password does not match') {
        setErrorMessage('Password does not match')
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

  return (
    <Box minH="90vh" display="flex" justifyContent="center" alignItems="center" p={6}>
      <Box bg="white" p={8} rounded="lg" boxShadow="lg" maxWidth="400px" width="100%">
        <Heading mb={6} textAlign="center" fontSize="2xl">
          Login
        </Heading>
        <VStack spacing={4}>
          <FormControl id="email" isRequired isInvalid={!isEmailValid && email !== ''}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => {
                if (!isEmailValid) {
                  setErrorMessage('Please enter a valid email.')
                }
              }}
            />
          </FormControl>
          <FormControl id="password" isRequired isInvalid={!isPasswordValid && password !== ''}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => {
                if (!isPasswordValid) {
                  setErrorMessage('Password must be at least 6 characters long')
                }
              }}
            />
          </FormControl>
          <HStack w={'full'}>
            <Button
              colorScheme="teal"
              width="50%"
              onClick={handleClick}
              isDisabled={!isEmailValid || !isPasswordValid || isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              width="50%"
              height={'100%'}
              color={'teal'}
              _hover={{ textDecor: 'underline' }}>
              <Link to={'/reset-password'}>Forgot Password ?</Link>
            </Box>
          </HStack>
          <Divider border={'1px solid grey'} /> <div>OR</div>
          <Flex>
            Logging in for first time? Then register
            <Box height={'100%'} color={'teal'} ml={1} _hover={{ textDecor: 'underline' }}>
              <Link to={'/register'}>here.</Link>
            </Box>
          </Flex>
          {errorMessage && (
            <Text color="red.500" mt={4} textAlign="center">
              {errorMessage}
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  )
}

export default LoginForm
