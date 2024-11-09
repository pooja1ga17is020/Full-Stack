import axios from 'axios'

const base_url = 'http://localhost:8080/api/books'

export function getAllBooks() {
  return axios.get(base_url + '/all-books')
}

export function searchBooks(keyword, pageNumber) {
  const page = pageNumber || 0
  const size = 6
  return axios.get(base_url + `/search?keyword=${keyword}&page=${page}&size=${size}`)
}

export function filterBooks(isAvailable, genre, page = 0) {
  const size = 6
  return axios.get(
    base_url + `/filter?availability_status=${isAvailable}&genre=${genre}&page=${page}&size=${size}`
  )
}

export function addBook(payload) {
  return axios.post(base_url + '/add-book', payload)
}

export function updateBook(bookId, payload) {
  return axios.put(base_url + `/update/${bookId}`, payload)
}

export function deleteBook(bookId) {
  return axios.delete(base_url + `/delete/${bookId}`)
}
