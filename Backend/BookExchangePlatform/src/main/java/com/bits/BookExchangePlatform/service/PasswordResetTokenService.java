package com.bits.BookExchangePlatform.service;

import com.bits.BookExchangePlatform.entity.PasswordResetToken;
import com.bits.BookExchangePlatform.entity.TokenVerification;
import com.bits.BookExchangePlatform.entity.Users;
import com.bits.BookExchangePlatform.repository.PasswordResetTokenRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenService {

    private final PasswordResetTokenRepo passwordResetTokenRepo;

    public void generatePasswordResetToken(Users users, String token)
    {
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, users);
        passwordResetTokenRepo.save(passwordResetToken);
    }

    public String validatePasswordResetToken(String token)
    {
        PasswordResetToken verifyPasswordResetToken = passwordResetTokenRepo.findByToken(token);
        if(verifyPasswordResetToken==null)
        {
            return "Invalid reset password token";
        }
        Users users = verifyPasswordResetToken.getUsers();
        Calendar calendar = Calendar.getInstance();
        if((verifyPasswordResetToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0)
        {
            return "Verification link expired! Please resend the link";
        }
        return "valid";
    }

    public Optional<Users> findUsersByPasswordToken(String passwordResetToken)
    {
        return Optional.ofNullable(passwordResetTokenRepo.findByToken(passwordResetToken).getUsers());
    }
}
