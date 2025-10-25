package com.example.Task_Management.services.employee;


import com.example.Task_Management.dto.TaskDTO;
import com.example.Task_Management.entities.Task;
import com.example.Task_Management.entities.User;
import com.example.Task_Management.enums.TaskStatus;
import com.example.Task_Management.repositories.TaskRepository;
import com.example.Task_Management.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final TaskRepository taskRepository;
    private final JwtUtil jwtUtil;

    @Override
    public List<TaskDTO> getTasksByUserId() {
        User user = jwtUtil.getLoggedInUser();
        if (user != null) {
            return taskRepository.findAllByUserId(user.getId()).stream()
                    .sorted(Comparator.comparing(Task::getDueDate).reversed())
                    .map(Task::getTaskDTO)
                    .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("User not found");
    }

    @Override
    public TaskDTO updateTask(long id, String status) {
      Optional<Task> optionalTask= taskRepository.findById(id);
      if(optionalTask.isPresent()){
          Task existingTask =optionalTask.get();
          existingTask.setTaskStatus(setTaskStatus(status));
          return taskRepository.save(existingTask).getTaskDTO();

      }
        throw new EntityNotFoundException("Task not found");

    }

    private TaskStatus setTaskStatus(String status ){
        return switch (status){
            case "Pending"->TaskStatus.Pending;
            case "Inprogress"->TaskStatus.Inprogress;
            case "Completed"->TaskStatus.Completed;
            case "Deferred"->TaskStatus.Deferred;
            default -> TaskStatus.Cancelled;


        };
    }

}
