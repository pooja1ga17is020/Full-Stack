package com.bits.BookExchangePlatform.repository;


import com.bits.BookExchangePlatform.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findByEmail(String email);
    Optional<Users> findByEmailAndPassword(String email, String password);



}
