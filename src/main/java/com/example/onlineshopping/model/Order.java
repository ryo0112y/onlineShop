package com.example.onlineshopping.model;

import lombok.Data;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @OneToMany
    private Set<OrderedProduct> orderedProducts = new HashSet<>();

    private String boughtAt;

    boolean isDone = false;

}
