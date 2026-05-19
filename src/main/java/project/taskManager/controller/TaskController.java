package project.taskManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import project.taskManager.dto.TaskRequest;
import project.taskManager.entity.Task;
import project.taskManager.service.TaskService;

@RestController
@RequestMapping("/tasks")

public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping

    public Task createTask(@Valid @RequestBody TaskRequest request) {

        return taskService.createTask(request);
    }

    @GetMapping("/{userId}")

    public List<Task> getTasksByUser(
            @PathVariable Long userId
    ) {

        return taskService.getTasksByUser(userId);
    }

    @PutMapping("/{id}")

    public Task updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request
    ) {

        return taskService.updateTask(id, request);
    }


    @PatchMapping("/{id}/complete")

    public Task markCompleted(@PathVariable Long id) {

        return taskService.markTaskCompleted(id);
    }

    @DeleteMapping("/{id}")

    public String deleteTask(@PathVariable Long id) {

        return taskService.deleteTask(id);
    }
}