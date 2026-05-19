package project.taskManager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.taskManager.dto.TaskRequest;
import project.taskManager.entity.Task;
import project.taskManager.entity.User;
import project.taskManager.repository.TaskRepository;
import project.taskManager.repository.UserRepository;

// @Service

public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

        public Task createTask(TaskRequest request) {

                User user = userRepository.findById(request.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found"));

                Task task = new Task();

                task.setTitle(request.getTitle());
                task.setDescription(request.getDescription());
                task.setDueDate(request.getDueDate());

                task.setStatus("PENDING");

                task.setUser(user);

                return taskRepository.save(task);
        }

        public List<Task> getTasksByUser(Long userId) {

                return taskRepository.findByUserId(userId);
                }       

        public Task updateTask(Long id, TaskRequest request) {

                Task task = taskRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Task not found"));

                task.setTitle(request.getTitle());
                task.setDescription(request.getDescription());
                task.setDueDate(request.getDueDate());

                return taskRepository.save(task);
                }

        public Task markTaskCompleted(Long id) {

                Task task = taskRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Task not found"));

                task.setStatus("COMPLETED");

                return taskRepository.save(task);
        }


        public String deleteTask(Long id) {

                Task task = taskRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Task not found"));

                taskRepository.delete(task);

                return "Task Deleted Successfully";
        }
}