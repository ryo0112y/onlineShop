package com.example.onlineshopping.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ordered_product")
@Data
public class OrderedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private int quantity;

}
