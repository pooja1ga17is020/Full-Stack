import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Switch,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import useBookFormStore from '../../store/form-store'
import { LuChevronDown } from 'react-icons/lu'
import { BOOK_GENRES } from '../../constants/books-constants'

const BookForm = ({ handleSubmit }) => {
  const { bookForm, setField } = useBookFormStore()

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="500px"
      mx="auto"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md">
      {/* Title */}
      <FormControl mb="4">
        <FormLabel>Title</FormLabel>
        <Input value={bookForm.title} onChange={(e) => setField('title', e.target.value)} />
      </FormControl>

      {/* Author */}
      <FormControl mb="4">
        <FormLabel>Author</FormLabel>
        <Input value={bookForm.author} onChange={(e) => setField('author', e.target.value)} />
      </FormControl>

      {/* Genre */}
      <FormControl mb="4">
        <FormLabel>Genre</FormLabel>
        <Menu matchWidth>
          <MenuButton as={Button} rightIcon={<LuChevronDown />} w={'full'} textAlign={'start'}>
            {bookForm.genre || 'Select Genre'}
          </MenuButton>
          <MenuList maxH="200px" overflowY="auto">
            {BOOK_GENRES.map((genreOption) => (
              <MenuItem key={genreOption} onClick={() => setField('genre', genreOption)}>
                {genreOption}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </FormControl>

      {/* ISBN */}
      <FormControl mb="4">
        <FormLabel>ISBN</FormLabel>
        <Input
          value={bookForm.isbn}
          onChange={(e) => setField('isbn', e.target.value)}
          maxLength={20}
        />
      </FormControl>

      {/* Book Condition */}
      <FormControl mb="4">
        <FormLabel>Book Condition</FormLabel>
        <Menu matchWidth>
          <MenuButton as={Button} rightIcon={<LuChevronDown />} w={'full'} textAlign={'start'}>
            {bookForm.bookCondition || 'Select Book Condition'}
          </MenuButton>
          <MenuList maxH="200px" overflowY="auto">
            <MenuItem onClick={() => setField('bookCondition', 'New')}>{'New'}</MenuItem>
            <MenuItem onClick={() => setField('bookCondition', 'Used')}>{'Used'}</MenuItem>
          </MenuList>
        </Menu>
      </FormControl>

      {/* Price */}
      <FormControl mb="4">
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          value={bookForm.price}
          onChange={(e) => setField('price', e.target.value)}
        />
      </FormControl>

      {/* Availability Status */}
      <FormControl display="flex" alignItems="center" mb="4">
        <FormLabel mb="0">Availability</FormLabel>
        <Switch
          isChecked={bookForm.availability_status}
          onChange={(e) => setField('availability_status', e.target.checked)}
        />
      </FormControl>

      {/* Description */}
      <FormControl mb="4">
        <FormLabel>Description</FormLabel>
        <Textarea
          value={bookForm.description}
          onChange={(e) => setField('description', e.target.value)}
        />
      </FormControl>

      {/* Image URL */}
      <FormControl mb="4">
        <FormLabel>Image URL</FormLabel>
        <Input value={bookForm.image_url} onChange={(e) => setField('image_url', e.target.value)} />
      </FormControl>

      {/* Display Image Preview */}
      <Image
        src={bookForm.image_url || '/placeholderBookImage.jpg'}
        alt={bookForm.title || 'Placeholder Image'}
        borderRadius="md"
        boxSize="100px"
        mb="4"
      />

      <Button colorScheme="teal" type="submit">
        Submit
      </Button>
    </Box>
  )
}

export default BookForm
