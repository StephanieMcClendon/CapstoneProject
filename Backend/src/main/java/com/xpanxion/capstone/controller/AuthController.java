package com.xpanxion.capstone.controller;

import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.repository.UserRepository;
import com.xpanxion.capstone.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController
{
    private UserRepository userRepository; //field injection (not recommended)

    private UserServiceImpl userService;

    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UserRepository userRepository, UserServiceImpl userService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }



    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        authenticate(user.getUsername(), user.getPassword());
        User loginUser = userRepository.findUserByUsername(user.getUsername());
        return new ResponseEntity<>(loginUser, OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user)
    {
        User registerUser = this.userService.register(user.getUsername(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhoneNumber());
        this.userRepository.save(registerUser);
        return new ResponseEntity<>(registerUser, OK);
    }

    private void authenticate(String username, String password)
    {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}
