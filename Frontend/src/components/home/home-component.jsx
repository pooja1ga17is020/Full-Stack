import { Box, Flex } from '@chakra-ui/react'
import SearchBar from '../search-bar/search-bar-component'
import BookLists from './books-list-component'
import Pagination from '../search-bar/pagination-component'
import useSearchStore from '../../store/search-store'
import Filter from '../search-bar/filter-component'

const Home = () => {
  const { isVisible, totalPages } = useSearchStore()
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
        </Flex>
        <Flex w={'full'} maxH={'88%'} overflowY={'auto'}>
          <BookLists />
        </Flex>
        {isVisible && totalPages !== 0 && (
          <Flex
            position={'absolute'}
            m={'8px'}
            bottom={'-8px'}
            h={'26px'}
            bg={'teal.100'}
            rounded={'xl'}
            justifyContent={'start'}
            alignItems={'center'}
            paddingX={'24px'}
            border={'1px solid grey'}>
            <Pagination />
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default Home
