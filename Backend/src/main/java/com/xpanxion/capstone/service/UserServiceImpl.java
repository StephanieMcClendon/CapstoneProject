package com.xpanxion.capstone.service;

import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.model.UserPrincipal;
import com.xpanxion.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserDetailsService
{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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
}
