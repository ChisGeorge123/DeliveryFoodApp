package com.example.restaurants;

import com.example.restaurants.User.ResourceNotFoundException;
import com.example.restaurants.User.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.restaurants.OrderRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class OrderController {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    OrderService orderService;
    @CrossOrigin(origins = "*")
    @GetMapping("/orders")
    public List<Order> getAllOrders() {

        return orderService.allOrders();
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById
            (@PathVariable String id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not exist with id :" + id));

        return ResponseEntity.ok(order);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/orders/v1/{id}")
    public ResponseEntity<Optional<Order>> getSingleOrder(@PathVariable String id){
        return new ResponseEntity<Optional<Order>>(orderService.singleOrder(id), HttpStatus.OK);
    }
    @CrossOrigin(origins = "*")
    @PutMapping("/orders/{id}")
    public ResponseEntity<Order> updateOrder
            (@PathVariable String id, @RequestBody Order orderDetails) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not exist with id :" + id));
        order.setId(orderDetails.getId());
        order.setOrderNumber(orderDetails.getOrderNumber());
        order.setNumberOfItems(orderDetails.getNumberOfItems());
        order.setOrderDate(orderDetails.getOrderDate());
        order.setOrderPrice(orderDetails.getOrderPrice());
        order.setListOfItems(orderDetails.getListOfItems());
        order.setListOfNumbersOfItems(orderDetails.getListOfNumbersOfItems());
        order.setRestaurantTitle(orderDetails.getRestaurantTitle());
        order.setUserName(orderDetails.getUserName());
        order.setStatusOrder(orderDetails.getStatusOrder());
        Order updatedOrder = orderRepository.save(order);

        return ResponseEntity.ok(updatedOrder);
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser
            (@PathVariable String id) {

       Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("User not exist with id :" + id));

        orderRepository.delete(order);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {

        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }


}