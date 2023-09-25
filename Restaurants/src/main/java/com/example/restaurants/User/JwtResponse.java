package com.example.restaurants.User;

//import com.example.restaurants.Order;
import com.mongodb.lang.Nullable;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;
    private List<String> roles;
    private String adress;
    @Setter
    @Getter
    private String moderatorOfRestaurantTitle;
    public JwtResponse(String accessToken, String id, String username, String email, String adress, List<String> roles, String moderatorOfRestaurantTitle) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.adress=adress;
        this.moderatorOfRestaurantTitle=moderatorOfRestaurantTitle;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }
    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }
}
