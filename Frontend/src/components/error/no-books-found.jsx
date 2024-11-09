import { Box, Text, Image } from '@chakra-ui/react'

const NoBooksFound = () => {
  return (
    <Box textAlign="center" p={5}>
      <Image src="/nobookfound.jpg" alt="No Books Found" maxWidth="300px" mx="auto" />
      <Text fontSize="2xl" fontWeight={'bold'} color="gray.500" mt={3}>
        No Books Found
      </Text>
    </Box>
  )
}

export default NoBooksFound
