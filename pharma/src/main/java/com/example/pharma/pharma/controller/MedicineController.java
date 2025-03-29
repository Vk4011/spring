// src/main/java/com/example/pharma/controller/MedicineController.java
package com.example.pharma.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pharma.entity.Medicine;
import com.example.pharma.repository.MedicineRepository;

@RestController
@RequestMapping("/api/pharma")
public class MedicineController {
    
    private final MedicineRepository medicineRepository;

    public MedicineController(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @GetMapping("/medicine")
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }
}