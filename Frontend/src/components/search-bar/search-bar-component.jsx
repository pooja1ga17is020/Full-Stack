import { useCallback, useEffect } from 'react'
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react'
import { LuSearch, LuX } from 'react-icons/lu'
import { getAllBooks, searchBooks } from '../../services/books-service'
import useSearchStore from '../../store/search-store'
import useBookStore from '../../store/book-store'
import { SEARCHING } from '../../constants/books-constants'

const SearchBar = () => {
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    currentPage,
    setCurrentPage,
    setTotalPages,
    setIsVisible: setIsPaginationVisible,
    setQueryType,
  } = useSearchStore()

  const { setBooks, setLoading } = useBookStore()

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = useCallback(async () => {
    setLoading(true)
    setQueryType(SEARCHING)
    try {
      const response = await searchBooks(searchQuery, currentPage)
      setBooks(response.data.content)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error searching books:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchQuery, setBooks, setLoading, setQueryType, setTotalPages])

  const handleReset = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getAllBooks()
      setSearchQuery('')
      setBooks(response.data)
    } catch (error) {
      console.error('Error resetting books:', error)
    } finally {
      setLoading(false)
    }
  }, [setBooks, setLoading, setSearchQuery])

  useEffect(() => {
    if (!searchQuery) {
      handleReset()
      setTotalPages(0)
      setCurrentPage(0)
      setIsPaginationVisible(false)
    } else {
      setIsPaginationVisible(true)
    }
  }, [handleReset, searchQuery, setCurrentPage, setIsPaginationVisible, setTotalPages])

  return (
    <InputGroup maxW="md">
      <Input
        placeholder="Search for books..."
        value={searchQuery}
        onChange={handleInputChange}
        focusBorderColor="teal.400"
        variant="outline"
        size={'sm'}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
      />
      <InputRightElement h={'32px'} w={'64px'}>
        <IconButton
          aria-label="Search"
          icon={<LuX />}
          colorScheme="red"
          onClick={handleReset}
          variant={'ghost'}
          size={'sm'}
          disabled={!searchQuery}
        />
        <IconButton
          aria-label="Search"
          icon={<LuSearch />}
          colorScheme="teal"
          onClick={handleSearch}
          size={'sm'}
          disabled={!searchQuery}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchBar
