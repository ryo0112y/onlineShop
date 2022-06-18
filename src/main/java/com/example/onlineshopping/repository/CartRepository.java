package com.example.onlineshopping.repository;

import com.example.onlineshopping.model.Cart;
import com.example.onlineshopping.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findCartById(Long id);
    Cart findCartByProduct(Product product);
    Set<Cart> findAllByUsername(String username);
}
