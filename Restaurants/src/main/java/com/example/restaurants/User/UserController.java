package com.example.restaurants.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.restaurants.User.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @CrossOrigin(origins = "*")
    @GetMapping("/users")
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById
            (@PathVariable String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not exist with id :" + id));

        return ResponseEntity.ok(user);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser
            (@PathVariable String id, @RequestBody User userDetails) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not exist with id :" + id));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        user.setAdress(userDetails.getAdress());
        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser
            (@PathVariable String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not exist with id :" + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/all")
    public MessageResponse allAccess() {
        return new MessageResponse("Server is up.....");
    }

    @CrossOrigin(origins = "*")

    @GetMapping("/greeting")
    @PreAuthorize("isAuthenticated()")
    public MessageResponse userAccess() {

        return new MessageResponse
                ("Congratulations! You are an authenticated user.");
    }
}