import { create } from 'zustand'
import { SEARCHING } from '../constants/books-constants'

const useSearchStore = create((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
  queryType: SEARCHING,
  setQueryType: (queryType) => set({ queryType }),
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
  currentPage: 0,
  setCurrentPage: (currentPage) => set({ currentPage }),
  totalPages: 0,
  setTotalPages: (totalPages) => set({ totalPages }),
  availabilityStatus: true,
  setAvailabilityStatus: (availabilityStatus) => set({ availabilityStatus }),
  genre: '',
  setGenre: (genre) => set({ genre }),
}))

export default useSearchStore
