package com.example.todo_api.repository;

import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.example.todo_api.models.Todo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Repository
public class TodoRepository {
    private final JdbcTemplate jdbcTemplate;
    private static final Logger log = LoggerFactory.getLogger(TodoRepository.class);

    @Autowired
    TodoRepository(JdbcTemplate inj) {
        this.jdbcTemplate = inj;
    }

    public Todo save(Todo todo) {
        String sql = "INSERT INTO todos (task, completed) VALUES (?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((connection) -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id", "created_at"});

            ps.setString(1, todo.getTask());
            ps.setBoolean(2, todo.isCompleted());
            return ps;
        }, keyHolder);

        Number generatedId = (Number) keyHolder.getKeys().get("id");
        if (generatedId != null) {
            todo.setId(generatedId.longValue());
        }

        Timestamp generatedTime = (Timestamp) keyHolder.getKeys().get("created_at");
        if (generatedTime != null) {
            todo.setCreated_at(generatedTime);
        }

        return todo;
    }

    public int deleteById(Long id) {
        String sql = "DELETE FROM todos WHERE id = ?";

        return jdbcTemplate.update(sql, id);
    }

    public int completeById(Long id) {
        String sql = "UPDATE todos SET completed = TRUE, completed_at = CURRENT_TIMESTAMP WHERE id = ?";

        return jdbcTemplate.update(sql, id);
    }

    public List<Todo> selectAll(int limit) {
        String sql = "SELECT * FROM todos ORDER BY id DESC LIMIT ?";
        return jdbcTemplate.query(
            sql,
            (rs, rowNum) -> new Todo(
                rs.getLong("id"),
                rs.getString("task"),
                rs.getBoolean("completed"),
                rs.getTimestamp("created_at"),
                rs.getTimestamp("completed_at")
            ),
            limit
        );
    }

    public List<Todo> selectAllAfter(Long lastId, int limit) {
        String sql = "SELECT * FROM todos WHERE id < ? ORDER BY id DESC LIMIT ?";
        return jdbcTemplate.query(
            sql,
            (rs, rowNum) -> new Todo(
                rs.getLong("id"),
                rs.getString("task"),
                rs.getBoolean("completed"),
                rs.getTimestamp("created_at"),
                rs.getTimestamp("completed_at")
            ),
            lastId,
            limit
        );
    }


    public Todo selectById(Long id) {
        try {
            String sql = "SELECT * FROM todos WHERE id = ?";
    
            Todo res = jdbcTemplate.queryForObject(
                sql,
                (rs, rowNum) -> {
                    System.out.println(rs);
                    return new Todo(
                        rs.getLong("id"),
                        rs.getString("task"),
                        rs.getBoolean("completed"),
                        rs.getTimestamp("created_at"),
                        rs.getTimestamp("completed_at")
                    );
                },
                id
            );
            return res;
        } catch (EmptyResultDataAccessException e) {
            log.warn("Todo with id {} not found in DB", id);
            return null;
        }
    }
    
    public void printConnectionStatus() {
        System.out.println("Repository is connected! JdbcTemplate object is: " + jdbcTemplate);
    }
}
