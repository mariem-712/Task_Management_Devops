package com.example.Task_Management.services.auth;

import com.example.Task_Management.dto.SignupRequest;
import com.example.Task_Management.dto.UserDto;
import com.example.Task_Management.entities.User;
import com.example.Task_Management.enums.UserRole;
import com.example.Task_Management.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount() {
        Optional<User> optionalUser = userRepository.findByUserRole(UserRole.Admin);
        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setEmail("admin@test.com");
            user.setName("admin");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setUserRole(UserRole.Admin);
            userRepository.save(user);
            System.out.println("Admin account created ");
        } else {
            System.out.println("Admin account already exists");
        }
    }
    @Override
    public UserDto signupUser(SignupRequest signupRequest){
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.Employee);
     User createdUser= userRepository.save(user);
     return createdUser.getUserDto();

    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
