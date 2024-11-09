package com.bits.BookExchangePlatform.repository;

import com.bits.BookExchangePlatform.entity.TokenVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenVerificationRepo extends JpaRepository<TokenVerification,Long> {

    TokenVerification findByToken(String token);
}
