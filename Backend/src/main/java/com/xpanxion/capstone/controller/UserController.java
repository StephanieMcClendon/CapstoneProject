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
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController
{

    private UserRepository userRepository; //field injection (not recommended)

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/create-user") // http://localhost:8080/api/v1/create-user
    public User createUser(@RequestBody User user)
    {
        return this.userRepository.save(user);
    }

    @GetMapping("/users") // http://localhost:8080/api/v1/users
    public List<User> getAllUsers()
    {
        return this.userRepository.findAll();
    }

    @GetMapping("/user/{id}") // http://localhost:8080/api/v1/user/1
    public User getUserById(@PathVariable Long id)
    {
        return this.userRepository.findById(id).get();
    }

    @DeleteMapping("/delete-user/{id}") // http://localhost:8080/api/v1/delete-user/1
    public void deleteUserById(@PathVariable Long id)
    {
        this.userRepository.deleteById(id);
        System.out.println("Deleted User id " + id);
    }

    @PutMapping("/update-user/{id}") // http://localhost:8080/api/v1/update-user/1
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
