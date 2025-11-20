package com.example.todo_api.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WelcomeApi {
    @GetMapping("/")
    public ResponseEntity<Object> welcomeUser() {
        return ResponseEntity.ok().body(Map.of("Welcome", "To my Todo Api"));
    }
}
