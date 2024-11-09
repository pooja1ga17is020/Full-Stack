package com.bits.BookExchangePlatform.event;

import com.bits.BookExchangePlatform.entity.Users;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {

    private Users users;
    private String applicationURL;

    public RegistrationCompleteEvent(Users users, String applicationURL) {
        super(users);
        this.users = users;
        this.applicationURL = applicationURL;
    }
}
