package com.example.onlineshopping.controller;

import com.example.onlineshopping.model.Cart;
import com.example.onlineshopping.model.Product;
import com.example.onlineshopping.model.User;
import com.example.onlineshopping.repository.UserRepository;
import com.example.onlineshopping.service.CartService;
import com.example.onlineshopping.service.ProductsService;
import com.example.onlineshopping.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000/")
public class CartController {

    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;
    @Autowired
    private ProductsService productsService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<?> getCart(@AuthenticationPrincipal UserDetails userDetails){
        User user = userService.findByUsername(userDetails.getUsername());
        return ResponseEntity.ok().body(user);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getMyCart(@PathVariable Long id) {
        User user = userService.findUserById(id);
        Set<Cart> carts = cartService.findAllCartsByUser(user.getUsername());
        return ResponseEntity.ok().body(carts);
    }

    @GetMapping("/add/{id}")
    public ResponseEntity<?> addCart(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {

        User user = userService.findByUsername(userDetails.getUsername());
        Product product = productsService.findProductById(id);

        Set<Cart> userCart = user.getCarts();

        boolean isExist = false;

        //TODO
        // Check if the product is already in the cart

        for(Cart cart:userCart) {
            if(cart.getProduct().getName() == product.getName()) {
                cart.setQuantity(cart.getQuantity() + 1);
                cartService.save(cart);
                isExist = true;
            }
        }

        if(!isExist) {
            Cart cart = new Cart();
            cart.setProduct(product);
            cart.setQuantity(1);
            cart.setUsername(user.getUsername());

            cartService.save(cart);

            userCart.add(cart);
            user.setCarts(userCart);
            userRepository.save(user);
        }



//        if(userCart.contains(product)){
//            Cart cart = cartService.findCartByProduct(product);
//            cart.setQuantity(cart.getQuantity() + 1);
//            cartService.save(cart);
//        }
//        else{
//            Cart cart = new Cart();
//            cart.setProduct(product);
//            cart.setQuantity(1);
//            cart.setUsername(user.getUsername());
//
//            cartService.save(cart);
//
//            userCart.add(cart);
//            user.setCarts(userCart);
//            userRepository.save(user);
//        }

        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/add/product/{id}")
    public ResponseEntity<?> addProductToCart(@PathVariable Long id) {
        Cart cart = cartService.findCartById(id);
        cart.setQuantity(cart.getQuantity() + 1);
        cartService.save(cart);
        return ResponseEntity.ok().body(cart);
    }

    @GetMapping("/remove/product/{id}")
    public ResponseEntity<?> removeProductToCart(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        User user = userService.findByUsername(userDetails.getUsername());
        Cart cart = cartService.findCartById(id);
        Set<Cart> cartUser = user.getCarts();

        if(cart.getQuantity() <= 1) {
            cartUser.remove(cart);
            userRepository.save(user);
        }
        else{
            cart.setQuantity(cart.getQuantity() - 1);
            cartService.save(cart);
        }

        return ResponseEntity.ok().body(user);
    }
//    @GetMapping("/test-add/{userId}/{productId}")
//    public ResponseEntity<?> testAddCart(@PathVariable Long userId, @PathVariable Long productId) {
//
//        User user = userService.findUserById(userId);
//        Product product = productsService.findProductById(productId);
//
//        Set<Cart> userCart = user.getCarts();
//
//        Cart cart = new Cart();
//        cart.setProduct(product);
//        cart.setQuantity(1);
//        cart.setUsername(user.getUsername());
//
//        cartService.save(cart);
//
//        userCart.add(cart);
//        user.setCarts(userCart);
//        userRepository.save(user);
//
//        return ResponseEntity.ok().body(user);
//    }


    @GetMapping("/user-cart/{id}")
    public ResponseEntity<?> getCartById(@PathVariable Long id){
        Cart cart = cartService.findCartById(1L);
        return ResponseEntity.ok().body(cart);
    }

    @GetMapping("/user-carts/{id}")
    public ResponseEntity<?> getCarts(@PathVariable Long id) {

        User user = userService.findUserById(id);
        Set<Cart> carts = cartService.getCarts(user);

        return ResponseEntity.ok().body(carts);
    }

//    @GetMapping("/add/{id}")
//    public ResponseEntity<?> addProduct(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
//        User myUser = userRepository.findByUsername(user.getUsername());
//        Product product = productsService.findProductById(id);
//        product.setStack(product.getStack() - 1);
//        product.setQuantity(product.getQuantity() + 1);
//        Cart myCart = cartService.findCartById(myUser.getId());
//        myCart.setProducts(product);
//
//        productsService.saveProduct(product);
//        userRepository.save(myUser);
//        return ResponseEntity.ok().body(myUser);
//    }
//
//    @GetMapping("/remove/{id}")
//    public ResponseEntity<?> removeProduct(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
//        User myUser = userRepository.findByUsername(user.getUsername());
//        Product product = productsService.findProductById(id);
//        product.setStack(product.getStack() + 1);
//        product.setQuantity(product.getQuantity() - 1);
//        Cart myCart = cartService.findCartById(myUser.getId());
//        myCart.setProducts(product);
//
//        productsService.saveProduct(product);
//        userRepository.save(myUser);
//        return ResponseEntity.ok().body(myUser);
//    }

//    @GetMapping("/add/{id}")
//    public ResponseEntity<?> addProduct(@AuthenticationPrincipal UserDetails user, @PathVariable Long id){
//        Cart cart = cartService.findCartByUser(user);
//        Product product = productsService.findProductById(id);
////
////        Cart myCart = cartService.findCartById(user.getId());
////        myCart.setProducts(product);
////
////        userRepository.save(user);
//        return ResponseEntity.ok().body(user);
//    }

    @PutMapping("/removeProduct")
    public ResponseEntity<?> removeProduct(){
        return null;
    }
}