import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react'
import useBookFormStore from '../../store/form-store'
import BookForm from '../book-form/book-form-component'
import { useState } from 'react'
import { updateBook } from '../../services/books-service'
import LoadingComponent from '../loading/loading-component'

const UpdateBookModal = ({ isOpen, onClose, bookId, setRefresh }) => {
  const resetForm = useBookFormStore((state) => state.resetForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const { bookForm } = useBookFormStore.getState()
    try {
      setLoading(true)
      const response = await updateBook(bookId, bookForm)
      if (response.status === 200) {
        console.log('Updated Book', response.data)
        resetForm()
        onClose()
        setRefresh((prev) => !prev)
      } else {
        setError('Error in Updating the book details.')
      }
    } catch (error) {
      setError('Error in Updating the book details.')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle the form reset
  const handleReset = () => {
    resetForm()
    onClose()
    setRefresh((prev) => !prev)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Update Book Details
            <>{error && <Text color={'red'}>{error}</Text>}</>
          </ModalHeader>
          <ModalBody>
            {loading ? (
              <LoadingComponent message="Updating Book..." />
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

export default UpdateBookModal
