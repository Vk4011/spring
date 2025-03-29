// src/main/java/com/example/pharma/repository/UserRepository.java
package com.example.pharma.repository;

import com.example.pharma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}