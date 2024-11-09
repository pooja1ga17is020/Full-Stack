import { Button, ButtonGroup, HStack } from '@chakra-ui/react'
import useSearchStore from '../../store/search-store'
import { useCallback } from 'react'
import useBookStore from '../../store/book-store'
import { filterBooks, searchBooks } from '../../services/books-service'
import { FILTERING, SEARCHING } from '../../constants/books-constants'

const Pagination = () => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    query,
    queryType,
    availabilityStatus,
    genre,
  } = useSearchStore()
  const { setBooks, setLoading } = useBookStore()

  const handleSearch = useCallback(
    async (page) => {
      setLoading(true)
      try {
        const response = await searchBooks(query, page)
        setBooks(response.data.content)
        setTotalPages(response.data.totalPages)
      } catch (error) {
        console.error('Error searching books:', error)
      } finally {
        setLoading(false)
      }
    },
    [query, setBooks, setLoading, setTotalPages]
  )

  const handleFilter = useCallback(
    async (page) => {
      setLoading(true)
      try {
        const response = await filterBooks(availabilityStatus, genre, page)
        setBooks(response.data.content)
        setTotalPages(response.data.totalPages)
      } catch (error) {
        console.error('Error searching books:', error)
      } finally {
        setLoading(false)
      }
    },
    [availabilityStatus, genre, setBooks, setLoading, setTotalPages]
  )

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      if (queryType === SEARCHING) {
        handleSearch(currentPage - 1)
      }
      if (queryType === FILTERING) {
        handleFilter(currentPage - 1)
      }
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      if (queryType === SEARCHING) {
        handleSearch(currentPage + 1)
      }
      if (queryType === FILTERING) {
        handleFilter(currentPage + 1)
      }
    }
  }

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex)
    if (queryType === SEARCHING) {
      handleSearch(pageIndex)
    }
    if (queryType === FILTERING) {
      handleFilter(pageIndex)
    }
  }

  // Generate page numbers to display
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <HStack spacing={4} justify="center">
      <Button onClick={handlePrevious} isDisabled={currentPage === 0} size={'xs'}>
        Previous
      </Button>

      <ButtonGroup isAttached variant="outline" size={'xs'}>
        {pageNumbers.map((page, index) => (
          <Button
            key={index}
            colorScheme={page === currentPage + 1 ? 'blue' : 'gray'}
            onClick={() => handlePageClick(index)}
            size={'xs'}>
            {page}
          </Button>
        ))}
      </ButtonGroup>

      <Button onClick={handleNext} isDisabled={currentPage === totalPages - 1} size={'xs'}>
        Next
      </Button>
    </HStack>
  )
}

export default Pagination
