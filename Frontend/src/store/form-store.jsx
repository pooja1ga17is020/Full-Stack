// formStore.js
import { create } from 'zustand'

const initialBookFormState = {
  availability_status: false,
  price: '',
  author: '',
  genre: '',
  isbn: '',
  title: '',
  bookCondition: 'New',
  description: '',
  image_url: '',
}

const useBookFormStore = create((set) => ({
  bookForm: initialBookFormState,
  setField: (field, value) =>
    set((state) => ({
      bookForm: {
        ...state.bookForm,
        [field]: value,
      },
    })),
  setBookForm: (bookForm) => set({ bookForm }),
  resetForm: () => set({ bookForm: initialBookFormState }),
}))

export default useBookFormStore
