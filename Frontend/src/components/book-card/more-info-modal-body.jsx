import { Flex, Image, ModalBody, Text } from '@chakra-ui/react'

const MoreInfoModalBody = ({ book }) => {
  const bookDetails = [
    { label: 'Author', value: book.author },
    { label: 'Genre', value: book.genre },
    {
      label: 'Availability',
      value: book.availability_status ? 'Currently Available' : 'Currently Not Available',
    },
    { label: 'Condition', value: book.bookCondition },
    { label: 'Description', value: book.description },
    { label: 'Price', value: `$${book.price}` },
    { label: 'ISBN', value: book.isbn },
  ]

  const colorValue = book.availability_status ? 'green.500' : 'orange.500'
  return (
    <ModalBody>
      <Flex width={'full'} gap={'32px'}>
        <Image
          src={book.image_url || '/placeholderBookImage.jpg'}
          alt={book.title}
          objectFit="cover"
          maxW="200px"
          mb="4"
          aspectRatio={2 / 3}
        />
        <Flex direction={'column'} gap={'8px'}>
          {bookDetails.map(({ label, value }) => (
            <Flex key={`bookIDDetails:${book.book_id}`} width={'100%'}>
              <Text fontSize={'md'} fontWeight={'semibold'} minW={'100px'}>
                {label}
              </Text>
              <Text
                fontSize={'md'}
                noOfLines={3}
                textColor={label === 'Availability' ? colorValue : 'gray.700'}>
                {value}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </ModalBody>
  )
}

export default MoreInfoModalBody
