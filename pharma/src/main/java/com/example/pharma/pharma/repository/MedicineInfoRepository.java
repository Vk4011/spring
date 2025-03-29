package com.example.pharma.repository;

import com.example.pharma.entity.MedicineInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicineInfoRepository extends JpaRepository<MedicineInfo, Long> {
    List<MedicineInfo> findAll();
}