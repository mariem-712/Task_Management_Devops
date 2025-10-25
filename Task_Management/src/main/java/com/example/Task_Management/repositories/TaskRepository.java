package com.example.Task_Management.repositories;


import com.example.Task_Management.entities.Task;
import com.example.Task_Management.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {


    List<Task> findAllByUserId(Long id);

    List<Task> findAllByTaskStatus(TaskStatus taskStatus);
}
