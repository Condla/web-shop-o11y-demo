package com.datahovel.webshop.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Float price;
    private String tag;
    private String pic_ref;
    public Product() {
    }
    public Product(String name, Float price, String tag, String pic_ref) {
        this.name = name;
        this.price = price;
        this.tag = tag;
        this.pic_ref = pic_ref;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Float getPrice() {
        return price;
    }
    public void setPrice(Float price) {
        this.price = price;
    }
    public String getTag() {
        return tag;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }
    public String getPic_ref() {
        return pic_ref;
    }
    public void setPic_ref(String pic_ref) {
        this.pic_ref = pic_ref;
    }
    

    
}
