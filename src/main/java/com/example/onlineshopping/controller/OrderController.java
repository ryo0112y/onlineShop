package com.example.onlineshopping.controller;

import com.example.onlineshopping.model.*;
import com.example.onlineshopping.repository.OrderedProductRepository;
import com.example.onlineshopping.service.CartService;
import com.example.onlineshopping.service.OrderService;
import com.example.onlineshopping.service.ProductsService;
import com.example.onlineshopping.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductsService productsService;

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderedProductRepository orderedProductRepository;

    @GetMapping("/payment")
    public ResponseEntity<?> payment(@AuthenticationPrincipal UserDetails userDetails) {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        User user = userService.findByUsername(userDetails.getUsername());

        Set<Cart> userCart = cartService.findAllCartsByUser(user.getUsername());
//        Set<Cart> orderedCarts = new HashSet<>();

        Order order = new Order();
        Set<OrderedProduct> orderedProducts = new HashSet<>();

        for(Cart cart:userCart) {

            OrderedProduct product = new OrderedProduct();

            product.setPrice(cart.getProduct().getPrice());
            product.setQuantity(cart.getQuantity());
            product.setName(cart.getProduct().getName());

            orderedProductRepository.save(product);

            orderedProducts.add(product);

            cart.setUsername(cart.getUsername() + ": Checked");
            cartService.save(cart);
        }

        order.setUser(user);
        order.setOrderedProducts(orderedProducts);
        order.setBoughtAt(dtf.format(now));
        orderService.saveOrder(order);

        user.setCarts(null);
        userService.save(user);

        return ResponseEntity.ok().body(order);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getOrderByUserId(@PathVariable Long id) {
        Order order = orderService.findOrderById(id);
        return ResponseEntity.ok().body(order);
    }

    @GetMapping("/get/list")
    public ResponseEntity<?> getAllOrders() {
        List<Order> orders = orderService.findAll();
        return ResponseEntity.ok().body(orders);
    }

}
