import { useEffect } from 'react'
import useBookStore from '../../store/book-store'
import { getAllBooks } from './../../services/books-service'
import { Flex } from '@chakra-ui/react'
import BookCard from '../book-card/book-card-component'
import LoadingComponent from '../loading/loading-component'
import NoBooksFound from '../error/no-books-found'

const BookLists = () => {
  const { loading, setLoading, books, setBooks } = useBookStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getAllBooks()
        setBooks(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [setBooks, setLoading])

  return (
    <Flex h="full" w="full" wrap="wrap" gap="16px" m="24px" justifyContent={'space-evenly'}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {books.length === 0 ? (
            <NoBooksFound />
          ) : (
            <>
              {books.map((book) => (
                <Flex key={book.book_id} flex="1 1 30%" maxW="30%" minW="250px" mb="16px">
                  <BookCard book={book} />
                </Flex>
              ))}
            </>
          )}
        </>
      )}
    </Flex>
  )
}

export default BookLists
