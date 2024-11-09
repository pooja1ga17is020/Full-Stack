package com.bits.BookExchangePlatform.event;

import com.bits.BookExchangePlatform.entity.Users;
import com.bits.BookExchangePlatform.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

    private final UserService userService;
    private Users users;
    private final JavaMailSender mailSender;

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        users = event.getUsers();
        String verificationToken = UUID.randomUUID().toString();
        String url = event.getApplicationURL()+"/api/user/verifyEmail?token="+verificationToken;
        userService.saveUserToken(users, verificationToken);
        try
        {
            sendVerificationEmail(url);
        }
        catch(MessagingException | UnsupportedEncodingException e)
        {
            throw new RuntimeException(e);
        }
        log.info("Click here to verify your email : {}", url);

    }

    public void sendVerificationEmail(String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "Email Verification";
        String senderName = "User Registration Service";
        String mailContent = "<p> Hi, " + users.getName() + ", </p>" +
                "<p>Thank you for registering with us," + "" +
                "Please, follow the link below to complete your registration.</p>" +
                "<a href=\"" + url + "\">Verify your email to activate your account</a>" +
                "<p> Thank you <br> Users Registration Service";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("poojanarasimhamurthy10@gmail.com", senderName);
        messageHelper.setTo(users.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }

//    public void sendPasswordResetVerificationEmail(String url) throws MessagingException, UnsupportedEncodingException {
//        String subject = "Password reset email verification";
//        String senderName = "User Registration Service";
//        String mailContent = "<p> Hi, "+ users.getName()+ ", </p>" +
//                "<p> Please follow the link to reset your password.</p>" +
//                "<a href=\"" +url+ "\">Reset password</a>"+
//                "<p> Users Registration Service";
//        MimeMessage message = mailSender.createMimeMessage();
//        var messageHelper = new MimeMessageHelper(message);
//        messageHelper.setFrom("poojanarasimhamurthy10@gmail.com", senderName);
//        messageHelper.setTo(users.getEmail());
//        messageHelper.setSubject(subject);
//        messageHelper.setText(mailContent, true);
//        mailSender.send(message);
//    }


}
