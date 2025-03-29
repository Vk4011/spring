package com.example.pharma.controller; // Updated to match PharmaApplication package

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api") // Ensure this is correct
public class DatabaseController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/db")
    public Map<String, String> checkDatabaseConnection() {
        Map<String, String> response = new HashMap<>();

        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class); // Ensures a valid DB connection
            response.put("connection", "Connection successfully");
            response.put("database", "PostgreSQL");
            response.put("db", "neonDB");
        } catch (Exception e) {
            response.put("connection", "Connection failed");
            response.put("error", e.getMessage());
        }

        return response;
    }
}
