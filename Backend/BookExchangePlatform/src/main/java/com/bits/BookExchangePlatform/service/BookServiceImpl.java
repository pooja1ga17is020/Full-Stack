package com.bits.BookExchangePlatform.service;

import com.bits.BookExchangePlatform.entity.Book;
import com.bits.BookExchangePlatform.exception.ISBNException;
import com.bits.BookExchangePlatform.exception.ResourceNotFoundException;
import com.bits.BookExchangePlatform.repository.BookRepo;
import com.bits.BookExchangePlatform.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{

    private final BookRepo bookRepo;



    @Override
    public Book saveBook(Book book) {

        if(bookRepo.existsByISBN(book.getISBN()))
        {
            throw new ISBNException("Duplicate ISBN");
        }
        return bookRepo.save(book);
    }

    @Override
    public Book updateBook(int book_id,Book book) {
       var existingBook = bookRepo.findById(book_id)
               .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
       existingBook.setISBN(book.getISBN());
       existingBook.setTitle(book.getTitle());
       existingBook.setAuthor(book.getAuthor());
       existingBook.setGenre(book.getGenre());
       existingBook.setAvailability_status(book.getAvailability_status());
       existingBook.setBookCondition(book.getBookCondition());
       existingBook.setDescription((book.getDescription()));
       existingBook.setPrice(book.getPrice());
       existingBook.setImage_url(book.getImage_url());
       return bookRepo.save(existingBook);
    }

    @Override
    public void deleteBook(int book_id) {
        var existingBook = bookRepo.findById(book_id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        bookRepo.delete(existingBook);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    @Override
    public Page<Book> getBooksByTitleOrAuthorOrGenre(String keyword, Pageable pageable) {
        return bookRepo.serachBooksByKeyword(keyword, pageable);
    }

    @Override
    public Page<Book> filterBooks(Boolean availability_status, String genre, Pageable pageable) {
        return bookRepo.findByAvailabilityStatusAndGenre(availability_status, genre, pageable);
    }


}
