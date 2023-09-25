package com.example.restaurants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @PostMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"), payload.get("caenId"), payload.get("restaurantTitle")), HttpStatus.CREATED);
    }
    @CrossOrigin(origins = "*")
    @GetMapping
    public List<Review> getAllReviews() {

        return reviewService.allReviews();
    }
}
