package com.example.onlineshopping.service;

import com.example.onlineshopping.model.Order;
import com.example.onlineshopping.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    public Order findOrderById(Long id){
        return orderRepository.findOrderById(id);
    }

    public List<Order> findAll(){
        return orderRepository.findAll();
    }
}
