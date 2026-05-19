package project.taskManager.controller;


import project.taskManager.dto.LoginRequest;
import project.taskManager.dto.LoginResponse;
import project.taskManager.dto.RegisterRequest;
import project.taskManager.entity.User;
import project.taskManager.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")

    public User register (@Valid @RequestBody RegisterRequest request) {

        return userService.registerUser(request);
    }

    @PostMapping("/login")

    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        return userService.loginUser(request);
    }
}
