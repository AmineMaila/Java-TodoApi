package com.example.todo_api.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todo_api.models.Todo;
import com.example.todo_api.repository.TodoRepository;

@Service
public class TodoService {
    private final TodoRepository todoRepo;

    public TodoService(TodoRepository inj) {
        this.todoRepo = inj;
    }

    public Todo createTodo(Todo todo) {
        this.todoRepo.save(todo);
        return todo;
    }

    public boolean deleteTodo(Long id) {
        return this.todoRepo.deleteById(id) > 0;
    }

    public List<Todo> getTodosWithCursor(Long cursor, int limit) {
        if (cursor == null)
            return this.todoRepo.selectAll(limit);
        return this.todoRepo.selectAllAfter(cursor, limit);
    }

    public Todo getOneTodo(Long id) {
        return this.todoRepo.selectById(id);
    }

    public boolean completeTodo(Long id) {
        return this.todoRepo.completeById(id) > 0;
    }
}
