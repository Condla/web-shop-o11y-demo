package com.datahovel.webshop.repository;

import com.datahovel.webshop.model.Product;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {
    Product findByName(String name);
}
