package com.example.onlineshopping.controller;

import com.example.onlineshopping.model.Product;
import com.example.onlineshopping.payload.request.ProductRequest;
import com.example.onlineshopping.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000/")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @PostMapping("/add/product")
    public ResponseEntity<?> addProducts(@RequestBody ProductRequest request) {
        Product product = productsService.save(request);
        return ResponseEntity.ok().body(product);
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(){
        List<Product> products = productsService.findAll();
        return ResponseEntity.ok().body(products);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Product product = productsService.findProductById(id);
        return ResponseEntity.ok().body(product);
    }
    
}
