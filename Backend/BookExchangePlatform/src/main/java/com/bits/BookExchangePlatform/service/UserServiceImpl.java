package com.bits.BookExchangePlatform.service;

import com.bits.BookExchangePlatform.dto.LoginUser;
import com.bits.BookExchangePlatform.dto.RegisterUser;
import com.bits.BookExchangePlatform.entity.TokenVerification;
import com.bits.BookExchangePlatform.entity.Users;
import com.bits.BookExchangePlatform.exception.UserAlreadyExistingException;
import com.bits.BookExchangePlatform.exception.UserNotFoundException;
import com.bits.BookExchangePlatform.repository.TokenVerificationRepo;
import com.bits.BookExchangePlatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final TokenVerificationRepo tokenRepo;
    private final PasswordResetTokenService passwordResetTokenService;

    @Override
    public Users UserRegistration(RegisterUser registerUser) {
        Optional<Users> users = this.findByEmail(registerUser.email());
        if(users.isPresent())
        {
            throw new UserAlreadyExistingException(registerUser.email() + " already exists");
        }
        var user = new Users();
        user.setName(registerUser.name());
        user.setEmail(registerUser.email());
        user.setPassword(passwordEncoder.encode(registerUser.password()));
        return userRepo.save(user);
    }

    @Override
    public Optional<Users> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public void saveUserToken(Users users, String verificationToken) {
        var verifyToken = new TokenVerification(verificationToken,users);
        tokenRepo.save(verifyToken);

    }

    @Override
    public String validateToken(String token) {

        TokenVerification verifyToken = tokenRepo.findByToken(token);
        if(verifyToken==null)
        {
            return "Invalid token";
        }
        Users users = verifyToken.getUsers();
        Calendar calendar = Calendar.getInstance();
        if((verifyToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0)
        {
            tokenRepo.delete(verifyToken);
            return "Token expired";
        }
        users.setIsEmailVerified(true);
        userRepo.save(users);
        return "Valid";

    }


    @Override
    public String getUserByEmailAndPassword(LoginUser loginUser) {
        String msg = "";
        Users users = userRepo.findByEmail(loginUser.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Unable to find the user. Please register first"));
        if(users!=null)
        {
            String password = loginUser.getPassword();
            String encodedPassword = users.getPassword();
            Boolean isPasswordMatches = passwordEncoder.matches(password, encodedPassword);
            if(isPasswordMatches)
            {
                Optional<Users> user =
                        userRepo.findByEmailAndPassword(loginUser.getEmail(), encodedPassword);
                if(user.isPresent())
                {
                    return "Login Success";
                }
                else {
                    return "Login failed";
                }
            }
            else{
                return "Password does not match";
            }
        }
        else {
            return "Email not exists";
        }
    }

    @Override
    public void createPasswordResetToken(Users users, String passwordResetToken) {
        passwordResetTokenService.generatePasswordResetToken(users, passwordResetToken);
    }


    @Override
    public String validatePasswordResetToken(String token) {
       return passwordResetTokenService.validatePasswordResetToken(token);
    }

    @Override
    public Users findUsersByPasswordToken(String token) {
        return passwordResetTokenService.findUsersByPasswordToken(token).get();
    }

    @Override
    public void changePassword(Users users, String newPassword) {
        users.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(users);
    }


}
