import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { LuFolderCog, LuLogOut } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/auth-store'

function Navbar() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Box bg="teal.400" color={'white'} px={4} py={2}>
      <Flex justify="space-between" align="center">
        <HStack gap={'16px'}>
          <Flex>
            <Link to="/">Dashboard</Link>
          </Flex>
          <Flex>
            <Link to="/about">About</Link>
          </Flex>
        </HStack>
        {isAuthenticated && (
          <HStack spacing={4}>
            <Button
              variant={'outline'}
              bg={'teal.100'}
              colorScheme="teal"
              size={'sm'}
              rounded={'full'}
              onClick={() => navigate('/maintain-books')}>
              <LuFolderCog />
              &nbsp; Maintain Books
            </Button>
            <Button
              variant={'outline'}
              bg={'red.100'}
              colorScheme="red"
              size={'sm'}
              onClick={() => logout()}>
              <LuLogOut />
              &nbsp; Logout
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  )
}

export default Navbar
