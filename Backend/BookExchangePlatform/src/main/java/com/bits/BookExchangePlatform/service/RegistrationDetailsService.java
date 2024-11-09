package com.bits.BookExchangePlatform.service;

import com.bits.BookExchangePlatform.config.RegistrationDetails;
import com.bits.BookExchangePlatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationDetailsService implements UserDetailsService {

    private final UserRepository userRepo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepo.findByEmail(email)
                .map(RegistrationDetails::new)
                .orElseThrow( () -> new UsernameNotFoundException("User not found"));
    }
}
