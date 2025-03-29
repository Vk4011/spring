package com.example.pharma.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class IndexController {

    @GetMapping("/status")
    public Map<String, String> index() {
        Map<String, String> response = new HashMap<>();
        response.put("server", "Server is running successfully");
        response.put("backend", "spring-boot");
        return response;
    }
}
