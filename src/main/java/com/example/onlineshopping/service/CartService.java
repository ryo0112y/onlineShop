package com.example.onlineshopping.service;

import com.example.onlineshopping.model.Cart;
import com.example.onlineshopping.model.Product;
import com.example.onlineshopping.model.User;
import com.example.onlineshopping.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CartService implements Serializable {

    @Autowired
    private CartRepository cartRepository;

    public Cart addCart(User user, Product product){
        Cart cart = new Cart();
        cart.setUsername(user.getUsername());
        cart.setQuantity(1);
        cart.setProduct(product);
        cartRepository.save(cart);
        return cart;
    }

    public Set<Cart> getCarts(User user) {
        Set<Cart> carts = cartRepository.findAllByUsername(user.getUsername());
        return carts;
    }

    public Cart save(Cart cart){
        return cartRepository.save(cart);
    }

    public Cart findCartById(Long id) {
        return cartRepository.findCartById(id);
    }

    public Set<Cart> findAllCartsByUser(String username) {
        return cartRepository.findAllByUsername(username);
    }

    public void deleteCart(Cart cart) {
        cartRepository.delete(cart);
    }

    public Cart findCartByProduct(Product product) {
        return cartRepository.findCartByProduct(product);
    }
}
