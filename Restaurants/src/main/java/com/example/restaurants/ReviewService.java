package com.example.restaurants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String caenId, String restaurantTitle) {
        Review review = new Review(reviewBody, restaurantTitle);
        reviewRepository.insert(review);
        mongoTemplate.update(Restaurant.class)
                .matching(Criteria.where("caenId").is(caenId))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }

    public List<Review> allReviews() {

        return reviewRepository.findAll();
    }
}
