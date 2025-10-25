package com.example.Task_Management.services.auth;

import com.example.Task_Management.dto.SignupRequest;
import com.example.Task_Management.dto.UserDto;

public interface AuthService {

    UserDto signupUser(SignupRequest signupRequest);
    boolean hasUserWithEmail(String email);
}
