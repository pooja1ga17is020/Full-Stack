package com.bits.BookExchangePlatform.controller;

import com.bits.BookExchangePlatform.dto.LoginUser;
import com.bits.BookExchangePlatform.dto.PasswordReset;
import com.bits.BookExchangePlatform.dto.RegisterUser;
import com.bits.BookExchangePlatform.entity.TokenVerification;
import com.bits.BookExchangePlatform.entity.Users;
import com.bits.BookExchangePlatform.event.RegistrationCompleteEvent;
import com.bits.BookExchangePlatform.event.RegistrationCompleteEventListener;
import com.bits.BookExchangePlatform.repository.TokenVerificationRepo;
import com.bits.BookExchangePlatform.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:5173")
public class UsersController {

    private final UserService userService;
    private final ApplicationEventPublisher publisher;
    private final TokenVerificationRepo tokenRepo;
    private final RegistrationCompleteEventListener listener;

    @PostMapping("/register")
    public String saveUser(@RequestBody RegisterUser registerUser, final HttpServletRequest request)
    {
        Users users = userService.UserRegistration(registerUser);
        publisher.publishEvent(new RegistrationCompleteEvent(users, applicationURL(request)));
        return " Please check you email for registration";
    }

    private String applicationURL(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }

    @GetMapping("/verifyEmail")
    public String verifyUserEmail(@RequestParam("token") String token)
    {
        TokenVerification verifyToken = tokenRepo.findByToken(token);
        if(verifyToken.getUsers().getIsEmailVerified())
        {
            return "Email has already been verified. Please go ahead and login";
        }
        String result = userService.validateToken(token);
        if(result.equalsIgnoreCase("Valid"))
        {
            return "Email verified successfully. Please login ";
        }
        return "Invalid token verification";
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUsers(@RequestBody LoginUser loginUser)
    {
       return ResponseEntity.ok(userService.getUserByEmailAndPassword(loginUser));
    }

    @PostMapping("/password-reset-request")
    public String resetPasswordRequest(@RequestBody PasswordReset passwordReset,
                                       final HttpServletRequest request) throws MessagingException, UnsupportedEncodingException
    {
        Optional<Users> users = userService.findByEmail(passwordReset.getEmail());
        String passwordResetURL = "";
        if(users.isPresent())
        {
            String passwordResetToken = UUID.randomUUID().toString();
            userService.createPasswordResetToken(users.get(), passwordResetToken);
            passwordResetURL = emailLinkForPasswordReset(users.get(), applicationURL(request),passwordResetToken);
        }
        return passwordResetURL;
    }

    private String emailLinkForPasswordReset(Users users, String applicationUrl, String passwordResetToken)
            throws MessagingException, UnsupportedEncodingException {

        String url = applicationUrl+"/api/user/reset-password?token="+passwordResetToken;
       // listener.sendPasswordResetVerificationEmail(url);
       // log.info("Click this link to reset your password : {}",url);
        return url;
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody PasswordReset passwordReset, @RequestParam("token") String token)
    {
        String result = userService.validatePasswordResetToken(token);
        if(!result.equalsIgnoreCase("valid"))
        {
            return "Invalid token";
        }
        Optional<Users> users = Optional.ofNullable(userService.findUsersByPasswordToken(token));
        if(users.isPresent())
        {
            userService.changePassword(users.get(), passwordReset.getNewPassword());
            return "Password reset successfully";
        }
        return "Invalid token";
    }

}
