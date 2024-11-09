package com.bits.BookExchangePlatform.repository;

import com.bits.BookExchangePlatform.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends JpaRepository<Book, Integer> {

    Boolean existsByISBN(String ISBN);

    @Query(("SELECT b FROM Book b WHERE "
            + "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(b.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))"))
    Page<Book> serachBooksByKeyword(String keyword, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE "
            + "(:genre IS NULL OR LOWER(b.genre) LIKE LOWER(CONCAT('%', :genre, '%'))) AND "
            + "(:availability_status IS NULL OR b.availability_status = :availability_status)")
    Page<Book> findByAvailabilityStatusAndGenre(Boolean availability_status, String genre, Pageable pageable);



}
