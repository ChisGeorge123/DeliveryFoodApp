package com.example.restaurants;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document(collection = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    private String id;

    @NotBlank
    @Size(max = 20)
    private String orderNumber;

    @NotBlank
    @Size(max = 50)
    private String userName;

    @NotBlank
    @Size(max = 10)
    private String numberOfItems;


    @NotBlank
    @Size(max=20)
    private String restaurantTitle;

    @NotBlank
    @Size(max=20)
    private List<String> listOfItems;

    @NotBlank
    @Size(max=20)
    private String statusOrder;
    @NotBlank
    @Size(max=20)
    private String orderPrice;
    @NotBlank
    @Size(max=20)
    private List<String> listOfNumbersOfItems;
    @NotBlank
    @Size(max=20)
    private String orderDate;

    public Order(String id) {
        this.id=id;
    }

}