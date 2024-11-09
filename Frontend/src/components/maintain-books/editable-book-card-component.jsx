import { Box, Image, Text, IconButton, Flex, Tooltip, useDisclosure } from '@chakra-ui/react'
import { LuFileEdit, LuTrash2 } from 'react-icons/lu'
import UpdateBookModal from './update-book-modal'
import useBookFormStore from '../../store/form-store'
import { deleteBook } from '../../services/books-service'

const EditableBookCard = ({ book, setRefresh }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleUpdateClick = () => {
    const { setBookForm } = useBookFormStore.getState()
    setBookForm(book)
    onOpen()
  }

  const handleDelete = async () => {
    try {
      const response = await deleteBook(book?.book_id)
      if (response.status === 204) {
        alert(`Deleted Book !!! ${book.title}`)
      } else {
        alert('Error in Deleting the book details.')
      }
      setRefresh((prev) => !prev)
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="4px 8px"
      boxShadow="md"
      display="flex"
      alignItems="center"
      gap="16px"
      width="75%">
      {/* Book Cover Image */}
      <Image
        src={book?.image_url || '/placeholderBookImage.jpg'}
        alt={book?.title}
        objectFit="cover"
        width="60px"
        height="80px"
        borderRadius="md"
      />

      <Flex flexDirection="column" flex="1" overflow="hidden">
        {/* Book Title */}
        <Text fontSize="lg" fontWeight="bold" isTruncated>
          {book?.title}
        </Text>

        {/* Author */}
        <Text fontSize="md" color="gray.600" isTruncated>
          by: {book?.author}
        </Text>
      </Flex>

      {/* Price */}
      <Flex width={'100px'}>
        <Text fontSize="md" fontWeight={'semibold'} color="gray.600" isTruncated>
          Rs: {book?.price}
        </Text>
      </Flex>

      {/* Update and Delete Buttons */}
      <Flex gap="8px">
        <Tooltip label="Update">
          <IconButton
            icon={<LuFileEdit />}
            onClick={handleUpdateClick}
            aria-label="Update Book"
            colorScheme="blue"
            size="sm"
          />
        </Tooltip>
        <UpdateBookModal
          isOpen={isOpen}
          onClose={onClose}
          bookId={book?.book_id}
          setRefresh={setRefresh}
        />

        <Tooltip label="Delete">
          <IconButton
            icon={<LuTrash2 />}
            onClick={handleDelete}
            aria-label="Delete Book"
            colorScheme="red"
            size="sm"
          />
        </Tooltip>
      </Flex>
    </Box>
  )
}

export default EditableBookCard
