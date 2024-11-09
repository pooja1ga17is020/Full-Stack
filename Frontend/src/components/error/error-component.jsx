import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={'16px'}>
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        Page Not Found !!!
      </Text>
      <Box boxSize={'md'} p={'24px'} rounded={'full'} bg={'whiteAlpha.700'}>
        <Image src="/error404pagenotfound.png" alt="Page Not Found !!!" />
      </Box>
      <Button onClick={() => navigate('/')}>Get Back to Dashboard !!!</Button>
    </Flex>
  )
}
