import { Box, Flex } from '@chakra-ui/react'
import useBookStore from '../../store/book-store'
import { useEffect, useState } from 'react'
import { getAllBooks } from '../../services/books-service'
import EditableBookCard from './editable-book-card-component'
import LoadingComponent from '../loading/loading-component'
import SearchBar from '../search-bar/search-bar-component'
import Filter from '../search-bar/filter-component'
import AddBookModal from './add-book-modal'

const MaintainBooks = () => {
  const { loading, setLoading, books, setBooks } = useBookStore()
  const [refresh, setRefresh] = useState(false)

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
  }, [setBooks, setLoading, refresh])

  return (
    <Box minH="90vh" h={'90vh'} minW={'full'} display="flex" justifyContent="center" p={6}>
      <Box bg="whiteAlpha.800" p={2} rounded="lg" boxShadow="lg" width="100%" position={'relative'}>
        <Flex
          w={'full'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'16px'}
          pb={'8px'}
          borderBottom={'1px solid grey'}>
          <SearchBar /> OR <Filter />
          <AddBookModal />
        </Flex>
        <Flex h="85%" w="full" alignItems={'center'} direction={'column'} overflowY={'auto'}>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              {books.map((book) => (
                <EditableBookCard
                  key={`book_id:${book.book_id}`}
                  book={book}
                  setRefresh={setRefresh}
                />
              ))}
            </>
          )}
        </Flex>
      </Box>
    </Box>
  )
}

export default MaintainBooks
