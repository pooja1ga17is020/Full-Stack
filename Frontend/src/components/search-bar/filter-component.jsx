import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Stack,
  useDisclosure,
  Flex,
  Text,
  Radio,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { BOOK_GENRES, FILTERING } from '../../constants/books-constants'
import { filterBooks, getAllBooks } from '../../services/books-service'
import useBookStore from '../../store/book-store'
import { LuChevronDown, LuFilter, LuFilterX } from 'react-icons/lu'
import useSearchStore from '../../store/search-store'

const Filter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setBooks, setLoading } = useBookStore()
  const {
    setIsVisible,
    setTotalPages,
    setQueryType,
    availabilityStatus,
    genre,
    setAvailabilityStatus,
    setGenre,
  } = useSearchStore()

  const applyFilter = async () => {
    setQueryType(FILTERING)
    setTotalPages(0)
    setLoading(true)
    setIsVisible(true)
    try {
      const response = await filterBooks(availabilityStatus, genre, 0)
      setBooks(response.data.content)
      setTotalPages(response.data.totalPages)
      onClose()
    } catch (error) {
      console.error('Error fetching filtered books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    setAvailabilityStatus(true)
    setGenre('')
    setIsVisible(false)
    setTotalPages(0)
    await getAllBooks().then((res) => setBooks(res.data))
  }

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
        closeOnBlur={false}>
        <PopoverTrigger>
          <Button colorScheme="teal" size={'sm'}>
            <LuFilter />
            &nbsp;Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Filter Books</PopoverHeader>
          <PopoverBody>
            <Stack spacing={4}>
              <Flex direction={'column'}>
                <Text fontSize={'md'} fontWeight={'semibold'}>
                  Availability of Books
                </Text>
                <Radio
                  isChecked={availabilityStatus}
                  onChange={() => setAvailabilityStatus(!availabilityStatus)}>
                  Available
                </Radio>
                <Radio
                  isChecked={!availabilityStatus}
                  onChange={() => setAvailabilityStatus(!availabilityStatus)}>
                  Not Available
                </Radio>
              </Flex>

              <Menu matchWidth>
                <MenuButton as={Button} rightIcon={<LuChevronDown />}>
                  {genre || 'Select Genre'}
                </MenuButton>
                <MenuList maxH="200px" overflowY="auto">
                  {BOOK_GENRES.map((genreOption) => (
                    <MenuItem key={genreOption} onClick={() => setGenre(genreOption)}>
                      {genreOption}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Button colorScheme="blue" onClick={applyFilter}>
                Apply Filter
              </Button>
              <Button colorScheme="red" onClick={onClose} variant={'outline'}>
                Cancel
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <IconButton
        aria-label="Search"
        icon={<LuFilterX />}
        colorScheme="red"
        onClick={handleClear}
        variant={'outline'}
        size={'sm'}
      />
    </>
  )
}

export default Filter
