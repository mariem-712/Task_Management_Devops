package com.example.Task_Management.dto;

import com.example.Task_Management.enums.UserRole;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;
    private Long userId;
    private UserRole userRole;
}

