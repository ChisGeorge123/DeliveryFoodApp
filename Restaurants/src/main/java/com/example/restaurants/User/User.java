package com.example.restaurants.User;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

//import com.example.restaurants.Order;
import com.mongodb.lang.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    @Getter
    @Setter
    private String moderatorOfRestaurantTitle;

    @NotBlank
    @Size(max = 120)
    private String password;

    @DBRef
    private Set<Role> roles = new HashSet<>();

    @NotBlank
    @Size(max=200)
    private String adress;

    public User() {
    }

    public User(String username, String email, String password, String adress) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.adress=adress;

    }
    public User(String username, String email, String password, String adress,String moderatorOfRestaurantTitle) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.adress=adress;
        this.moderatorOfRestaurantTitle=moderatorOfRestaurantTitle;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }
}