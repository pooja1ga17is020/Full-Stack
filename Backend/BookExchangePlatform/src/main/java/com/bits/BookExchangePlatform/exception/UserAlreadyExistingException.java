package com.bits.BookExchangePlatform.exception;

public class UserAlreadyExistingException extends RuntimeException{

    public UserAlreadyExistingException(String message)
    {
        super(message);
    }
}
