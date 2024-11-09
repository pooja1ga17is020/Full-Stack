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
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react'
import { registerService } from '../../services/user-service'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    setErrorMessage('')
    setName(e.target.value)
  }

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
    const payload = { name, email, password }

    try {
      setIsLoading(true)
      const response = await registerService(payload)
      console.log('response', response.data)
      if (response.status === 200) {
        alert('Please check your email box for verification.')
        navigate('/login')
      } else {
        setErrorMessage('Unexpected response from the server')
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setErrorMessage(
          'Error: Incorrect email or email might already registered, Please check your mail box.'
        )
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
          Register
        </Heading>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
          </FormControl>
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
          <Button
            colorScheme="teal"
            width="full"
            onClick={handleClick}
            isDisabled={!isEmailValid || !isPasswordValid || name === '' || isLoading}>
            {isLoading ? 'Loading...' : 'Register'}
          </Button>

          {errorMessage && (
            <Text color="red.500" mt={4} textAlign="center">
              {errorMessage}
            </Text>
          )}

          <Divider border={'1px solid grey'} />
          <Flex>
            Registered Already? Then Login
            <Box height={'100%'} color={'teal'} ml={1} _hover={{ textDecor: 'underline' }}>
              <Link to={'/login'}>here.</Link>
            </Box>
          </Flex>
        </VStack>
      </Box>
    </Box>
  )
}

export default RegisterForm
