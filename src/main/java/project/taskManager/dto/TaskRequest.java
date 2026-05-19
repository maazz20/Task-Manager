package project.taskManager.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter

public class TaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    @NotNull(message = "User ID is required")
    private Long userId;
}