package com.example.pharma.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "medicine_info")
public class MedicineInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(name = "precautions", length = 1000)
    private String precautions;
    
    @Column(name = "suggested_dosage")
    private String suggestedDosage;
    
    @Column(name = "best_time_to_take")
    private String bestTimeToTake;
    
    @Column(length = 500)
    private String uses;
}