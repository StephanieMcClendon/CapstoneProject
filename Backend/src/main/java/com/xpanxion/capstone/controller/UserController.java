package com.xpanxion.capstone.controller;

import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController
{
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/user")
    public User createUser(@RequestBody User user)
    {
        return this.userRepository.save(user);
    }

    @GetMapping("/user")
    public List<User> getAllUsers()
    {
        return this.userRepository.findAll();
    }
}
