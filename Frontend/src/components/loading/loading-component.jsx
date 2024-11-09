import { Flex, Spinner, Text } from '@chakra-ui/react'

const LoadingComponent = ({ message = 'Loading...' }) => {
  return (
    <Flex direction="column" align="center" justify="center" height="50vh">
      <Spinner size="xl" color="blue.900" />
      <Text mt={4} fontSize="xl" color="teal.500">
        {message}
      </Text>
    </Flex>
  )
}

export default LoadingComponent
