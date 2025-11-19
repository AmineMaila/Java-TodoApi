package com.example.todo_api.controllers;

import java.net.URI;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo_api.models.Todo;
import com.example.todo_api.services.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService svc;
    
    public TodoController(TodoService inj) {
        this.svc = inj;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getTodo(@PathVariable Long id) {
        Todo res = this.svc.getOneTodo(id);
        if (res == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @PostMapping
    public ResponseEntity<Todo> add(@RequestBody Todo todo) {
        Todo res = this.svc.createTodo(todo);
        return ResponseEntity
                .created(URI.create("/api/todos/" + res.getId()))
                .body(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!this.svc.deleteTodo(id))
            return (ResponseEntity.notFound().build());
        return (ResponseEntity.noContent().build());
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Void> complete(@PathVariable Long id) {
        if (!this.svc.completeTodo(id))
            return (ResponseEntity.notFound().build());
        return (ResponseEntity.noContent().build());
    }
}
