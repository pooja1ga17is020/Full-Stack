package com.bits.BookExchangePlatform.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int book_id;

    @Column(unique = true)
    private String ISBN;

    private String title;
    private String author;
    private String genre;
    private Boolean availability_status;
    private String bookCondition;

    private String description;

    private long price;
    private String image_url;

}
