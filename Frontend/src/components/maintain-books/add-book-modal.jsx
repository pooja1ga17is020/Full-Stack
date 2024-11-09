// AddBookModal.js
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import useBookFormStore from '../../store/form-store'
import BookForm from '../book-form/book-form-component'
import { LuBookPlus } from 'react-icons/lu'
import { useState } from 'react'
import { addBook, getAllBooks } from '../../services/books-service'
import LoadingComponent from '../loading/loading-component'
import useBookStore from './../../store/book-store'

const AddBookModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const resetForm = useBookFormStore((state) => state.resetForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const { bookForm } = useBookFormStore.getState()
    const { setBooks } = useBookStore.getState()
    try {
      setLoading(true)
      const response = await addBook(bookForm)
      if (response.status === 201) {
        console.log('New Book Added:', response.data)
        resetForm()
        onClose()
        const resAllBooks = await getAllBooks()
        setBooks(resAllBooks.data)
      } else {
        setError('Error in adding the book details.')
      }
    } catch (error) {
      setError('Error in adding the book details.')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle the form reset
  const handleReset = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <Button colorScheme="purple" variant={'outline'} size={'sm'} onClick={onOpen}>
        <LuBookPlus />
        &nbsp;Add Book
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Add a New Book
            <>{error && <Text color={'red'}>{error}</Text>}</>
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <LoadingComponent message="Adding Book..." />
            ) : (
              <BookForm handleSubmit={handleSubmit} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleReset} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddBookModal
