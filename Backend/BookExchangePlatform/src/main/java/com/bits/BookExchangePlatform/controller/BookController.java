package com.bits.BookExchangePlatform.controller;

import com.bits.BookExchangePlatform.entity.Book;
import com.bits.BookExchangePlatform.repository.BookRepo;
import com.bits.BookExchangePlatform.service.BookService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
@CrossOrigin("http://localhost:5173")
public class BookController {

    private final BookService bookService;
    private final BookRepo bookRepo;

    @PostMapping("/add-book")
    public ResponseEntity<Book> saveBook(@RequestBody Book book)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.saveBook(book));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") int book_id, @RequestBody Book book)
    {
        return ResponseEntity.ok(bookService.updateBook(book_id,book));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") int book_id)
    {
        bookService.deleteBook(book_id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all-books")
    public ResponseEntity<List<Book>> getAllBooks()
    {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Book>> searchBookByTitleOrAuthorOrGenre(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size)
    {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Book> books = bookService.getBooksByTitleOrAuthorOrGenre(keyword, pageable);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Book>> filterBooks(
            @RequestParam(required = false) Boolean availability_status,
            @RequestParam(required = false) String genre,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size)
    {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Book> books = bookService.filterBooks(availability_status, genre, pageable);
        return ResponseEntity.ok(books);
    }



}
