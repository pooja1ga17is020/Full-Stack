import {
  Box,
  Image,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Flex,
  Tooltip,
} from '@chakra-ui/react'
import { LuInfo } from 'react-icons/lu'
import MoreInfoModalBody from './more-info-modal-body'

const BookCard = ({ book }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4"
      boxShadow="md"
      width={'full'}
      maxHeight={'200px'}
      display={'flex'}
      justifyContent={'flex-start'}
      gap={'24px'}>
      {/* Book Cover Image */}
      <Image
        src={book.image_url || '/placeholderBookImage.jpg'}
        alt={book.title}
        objectFit="cover"
        maxW="100px"
        mb="4"
        aspectRatio={2 / 3}
      />

      <Flex flexDirection={'column'} width={'50%'} overflow={'hidden'}>
        {/* Book Title */}
        <Text fontSize="xl" fontWeight="bold" mb="1" isTruncated>
          {book.title}
        </Text>

        {/* Author */}
        <Text fontSize="md" color="gray.600" isTruncated>
          by : {book.author}
        </Text>

        {/* Price */}
        <Text fontSize="lg" fontWeight="semibold" mb="1">
          ${book.price}
        </Text>

        <Flex justifyContent={'start'} gap={'16px'} alignItems={'center'}>
          {/* Availability */}
          <Text fontSize={'md'} color={book.availability_status ? 'green.500' : 'orange.500'}>
            {book.availability_status ? 'Currently Available' : 'Currently Not Available'}
          </Text>

          {/* Info Button */}
          <Tooltip label="More Info ...">
            <IconButton
              icon={<LuInfo />}
              onClick={onOpen}
              aria-label="More Info"
              colorScheme="teal"
              size="sm"
              width={'32px'}
            />
          </Tooltip>
        </Flex>

        {/* Modal for Full Details */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'2xl'}
          closeOnEsc={false}
          closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{book.title}</ModalHeader>
            <ModalCloseButton />
            <MoreInfoModalBody book={book} />
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  )
}

export default BookCard
