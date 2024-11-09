package com.bits.BookExchangePlatform.dto;

import lombok.Data;

@Data
public class PasswordReset {

    private String email;
    private String newPassword;
    private String confirmNewPassword;
}
