package com.example.todo_api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WelcomeApi {
    @GetMapping("/")
    public String welcomeUser() {
        return "Welcome To My Java Api!";
    }
}
