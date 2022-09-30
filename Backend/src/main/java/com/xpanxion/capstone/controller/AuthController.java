package com.xpanxion.capstone.controller;

import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1")
public class AuthController
{
    private UserRepository userRepository; //field injection (not recommended)

    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UserRepository userRepository, AuthenticationManager authenticationManager)
    {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        authenticate(user.getUsername(), user.getPassword());
        User loginUser = userRepository.findUserByUsername(user.getUsername());
        return new ResponseEntity<>(loginUser, OK);
    }



    private void authenticate(String username, String password)
    {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}
