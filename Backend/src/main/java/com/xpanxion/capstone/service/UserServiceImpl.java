package com.xpanxion.capstone.service;

import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.model.UserPrincipal;
import com.xpanxion.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserDetailsService
{

    private UserRepository userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Autowired


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = this.userRepository.findUserByUsername(username);
        if (user == null)
        {
            throw new UsernameNotFoundException("No username found with -> " + username);
        }
        else
        {
            this.userRepository.save(user);
            UserPrincipal userPrincipal = new UserPrincipal(user);
            System.out.println("Found valid username");
            return userPrincipal;
        }
    }

    public User register(String username, String password, String firstName, String lastName, String email, String phoneNumber)
    {
        User user = new User();
        user.setPassword(encodePassword(password));
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        this.userRepository.save(user);
        return user;

    }

    private String encodePassword(String password)
    {
        return bCryptPasswordEncoder.encode(password);
    }


}
