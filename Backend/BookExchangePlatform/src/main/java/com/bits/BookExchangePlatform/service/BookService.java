package com.bits.BookExchangePlatform.service;

import com.bits.BookExchangePlatform.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BookService {

    Book saveBook(Book book);

    Book updateBook(int book_id, Book book);

    void deleteBook(int book_id);

    List<Book> getAllBooks();

    Page<Book> getBooksByTitleOrAuthorOrGenre(String keyword, Pageable pageable);

    Page<Book> filterBooks(Boolean availability_status, String genre, Pageable pageable);


}
