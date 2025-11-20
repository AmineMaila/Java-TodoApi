package com.example.todo_api.models;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class Todo {
    private long id;
    private String task;
    private boolean completed;
    private Timestamp created_at;
    private Timestamp completed_at = null;

    public Todo() {}

    public Todo(String task) {
        this.task = task;
    }

    public Todo(String task, boolean completed) {
        this.task = task;
        this.completed = completed;
    }

    public Todo(long id, String task, boolean completed, Timestamp created_at, Timestamp completed_at) {
        this.id = id;
        this.task = task;
        this.completed = completed;
        this.created_at = created_at;
        this.completed_at = completed_at;
    }
}