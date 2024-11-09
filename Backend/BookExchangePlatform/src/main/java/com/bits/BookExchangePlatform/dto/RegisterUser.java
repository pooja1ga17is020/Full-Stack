package com.bits.BookExchangePlatform.dto;

import org.hibernate.annotations.NaturalId;

public record RegisterUser(String name,
                           String email,
                           String password) {


}
