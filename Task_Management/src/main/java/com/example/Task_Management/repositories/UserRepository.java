package com.example.Task_Management.repositories;

import com.example.Task_Management.entities.User;
import com.example.Task_Management.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {


    Optional<User> findByEmail(String username);

    Optional<User> findByUserRole(UserRole userRole);

}
