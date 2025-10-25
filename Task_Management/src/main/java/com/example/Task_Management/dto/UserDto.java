package com.example.Task_Management.dto;

import com.example.Task_Management.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRole userRole;

}
