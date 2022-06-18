package com.example.onlineshopping.payload.request;

import lombok.Data;

@Data
public class ProductRequest {

    private String name;
    private String description;
    private String price;
    private String imgUrl;
    private String category;
    private String stock;

}
