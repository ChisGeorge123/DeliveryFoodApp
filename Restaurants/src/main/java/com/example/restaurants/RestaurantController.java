package com.example.restaurants;

import com.example.restaurants.User.ResourceNotFoundException;
import com.example.restaurants.User.User;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants(){
        return new ResponseEntity<List<Restaurant>>(restaurantService.allRestaurants(),HttpStatus.OK);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/{caenId}")
    public ResponseEntity<Optional<Restaurant>> getSingleRestaurant(@PathVariable String caenId){
    return new ResponseEntity<Optional<Restaurant>>(restaurantService.singleRestaurant(caenId),HttpStatus.OK);
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/{caenId}")
    public ResponseEntity<Restaurant> updateRestaurant
            (@PathVariable String caenId, @RequestBody Restaurant restaurantDetails) {

        Restaurant restaurant = restaurantService.singleRestaurant(caenId)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not exist with id :" + caenId));
        restaurant.setBackdrops(restaurantDetails.getBackdrops());
        restaurant.setMenuPrices(restaurantDetails.getMenuPrices());
        restaurant.setMenu(restaurantDetails.getMenu());
        restaurant.setReleaseDate(restaurantDetails.getReleaseDate());
        restaurant.setPoster(restaurantDetails.getPoster());
        restaurant.setTitle(restaurantDetails.getTitle());
        restaurant.setTrailerLink(restaurantDetails.getTrailerLink());
        restaurant.setManagerIds(restaurantDetails.getManagerIds());
        Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return ResponseEntity.ok(updatedRestaurant);
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/{caenId}")
    public ResponseEntity<Map<String, Boolean>> deleteRestaurant
            (@PathVariable String caenId) {
        Restaurant restaurant = restaurantService.singleRestaurant(caenId)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not exist with id :" + caenId));
        restaurantRepository.delete(restaurant);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @CrossOrigin(origins = "*")
    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {

        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRestaurant);
    }
}

