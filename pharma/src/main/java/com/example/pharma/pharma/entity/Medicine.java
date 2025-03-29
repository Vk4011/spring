// src/main/java/com/example/pharma/entity/Medicine.java
package com.example.pharma.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "medicine")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String storeName;
    private String storeNumber;
    private String storeLocation;
    private Integer quantity;
    private Double price;
    private Double discount;
    private Double finalPrice;
    private String expiryDate;
}