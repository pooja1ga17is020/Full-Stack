import { create } from 'zustand'

const useBookStore = create((set) => ({
  books: [],
  setBooks: (newBooks) => set({ books: newBooks }),
  loading: false,
  setLoading: (loading) => set({ loading: loading }),
}))

export default useBookStore
