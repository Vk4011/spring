package com.example.pharma.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pharma.entity.MedicineInfo;
import com.example.pharma.repository.MedicineInfoRepository;

@RestController
@RequestMapping("/medicine")
public class MedicineInfoController {

    private final MedicineInfoRepository medicineInfoRepository;

    public MedicineInfoController(MedicineInfoRepository medicineInfoRepository) {
        this.medicineInfoRepository = medicineInfoRepository;
    }

    @GetMapping("/medicine_info")
    public List<MedicineInfo> getAllMedicineInfo() {
        return medicineInfoRepository.findAll();
    }
}