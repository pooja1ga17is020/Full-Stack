package com.bits.BookExchangePlatform.service;

import com.bits.BookExchangePlatform.dto.LoginUser;
import com.bits.BookExchangePlatform.dto.RegisterUser;
import com.bits.BookExchangePlatform.entity.Users;

import java.util.Optional;

public interface UserService {

    Users UserRegistration(RegisterUser registerUser);

    Optional<Users> findByEmail(String email);

    void saveUserToken(Users users, String verificationToken);

    String validateToken(String token);

    String getUserByEmailAndPassword(LoginUser loginUser); //login

    void createPasswordResetToken(Users users, String passwordResetToken);

    String validatePasswordResetToken(String token);

    Users findUsersByPasswordToken(String token);

    void changePassword(Users users, String newPassword);
}
