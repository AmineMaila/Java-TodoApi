package com.example.todo_api;

import org.springframework.context.annotation.Bean;
import com.example.todo_api.repository.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApiApplication.class, args);
	}

	@Bean
	public CommandLineRunner testDataBaseConnection(TodoRepository repo) {
		return args -> {
			System.out.println("----------------------------------------");
            System.out.println("APP STARTED. Testing Repository...");
            repo.printConnectionStatus(); 
            System.out.println("----------------------------------------");
		};
	}

}
