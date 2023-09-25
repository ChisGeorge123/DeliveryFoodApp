package com.example.restaurants;

import com.example.restaurants.User.User;
import com.mongodb.lang.Nullable;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "restaurants")
@Data
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class Restaurant {
    @Id
    private ObjectId id;
    private String caenId;
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;
    private List<String> menu;
    private List<String> menuPrices;
    private List<String> backdrops;
    @DocumentReference
    private List<Review> reviewIds;
    private List<String> managerIds;
}
