// src/main/java/com/example/pharma/repository/MedicineRepository.java
package com.example.pharma.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pharma.entity.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findAll();
}