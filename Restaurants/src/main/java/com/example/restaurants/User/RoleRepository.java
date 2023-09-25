package com.example.restaurants.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.restaurants.User.ERole;
import com.example.restaurants.User.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}