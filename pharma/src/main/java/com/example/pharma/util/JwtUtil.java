package com.example.pharma.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;

public class JwtUtil {
    // Use a valid Base64-encoded secret key (replace with your own)
    private static final String SECRET_STRING = "dGhpcy1pcy1hLXRlc3Qtc2VjcmV0LWtleS13aXRoLTY0LWNoYXJhY3RlcnM="; // Base64 encoded
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET_STRING.getBytes());
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days

    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }
}