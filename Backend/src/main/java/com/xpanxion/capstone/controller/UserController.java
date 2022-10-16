package com.xpanxion.capstone.controller;

import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.repository.UserRepository;
import net.bytebuddy.implementation.auxiliary.AuxiliaryType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@CrossOrigin(origins = "http://webudget1.s3-website-us-east-1.amazonaws.com")
public class UserController
{
    private UserRepository userRepository; //field injection (not recommended)

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/users") // http://localhost:8080/api/v1/create-user
    public User createUser(@RequestBody User user)
    {
        return this.userRepository.save(user);
    }

    @GetMapping("/users") // http://localhost:8080/api/v1/users
    public List<User> getAllUsers()
    {
        return this.userRepository.findAll();
    }

    @GetMapping("/users/{id}") // http://localhost:8080/api/v1/user/1
    public User getUserById(@PathVariable Long id)
    {
        return this.userRepository.findById(id).get();
    }

    @DeleteMapping("/users/{id}") // http://localhost:8080/api/v1/delete-user/1
    public void deleteUserById(@PathVariable Long id)
    {
        this.userRepository.deleteById(id);
        System.out.println("Deleted User id " + id);
    }

    @PutMapping("/users/{id}") // http://localhost:8080/api/v1/update-user/1
    public User updateUserById(@PathVariable Long id, @RequestBody User userInput)
    {
        User user = this.userRepository.findById(id).get();

        user.setFirstName(userInput.getFirstName());
        user.setLastName(userInput.getLastName());
        user.setUsername(userInput.getUsername());
        user.setPassword(userInput.getPassword());
        user.setEmail(userInput.getEmail());
        user.setPhoneNumber(userInput.getPhoneNumber());
        user.setRole(userInput.getRole());

        return this.userRepository.save(user);
    }





}
