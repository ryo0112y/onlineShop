package com.example.onlineshopping.service;

import com.example.onlineshopping.model.Product;
import com.example.onlineshopping.payload.request.ProductRequest;
import com.example.onlineshopping.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    public void saveProduct(Product product) {
        productsRepository.save(product);
    }

    public Product save(ProductRequest productRequest){

        Product newProduct = new Product();
        newProduct.setName(productRequest.getName());
        newProduct.setDescription(productRequest.getDescription());
        double priceDouble = Double.parseDouble(productRequest.getPrice());
        newProduct.setPrice(priceDouble);
        newProduct.setImgUrl(productRequest.getImgUrl());
        String productCategory = productRequest.getCategory().toUpperCase();
        newProduct.setCategory(productCategory);
        int stockInt = Integer.parseInt(productRequest.getStock());
        newProduct.setStock(stockInt);

        return productsRepository.save(newProduct);
    }

    public List<Product> findAll(){
        return productsRepository.findAll();
    }

    public Product findProductById(Long id){
        return productsRepository.findProductById(id);
    }

}
