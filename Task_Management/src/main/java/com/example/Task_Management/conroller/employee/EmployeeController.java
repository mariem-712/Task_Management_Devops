package com.example.Task_Management.conroller.employee;


import com.example.Task_Management.dto.TaskDTO;
import com.example.Task_Management.services.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {


    private final EmployeeService employeeService;
    
    
    @GetMapping("/dashboard")
    public ResponseEntity<List<TaskDTO>> getTaskByUserId(){
       return ResponseEntity.ok(employeeService.getTasksByUserId());
    }

    @GetMapping("/updateTask/{id}/{status}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id,@PathVariable String status){
        TaskDTO updatedTaskDTO = employeeService.updateTask(id,status);
        if(updatedTaskDTO == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedTaskDTO);
    }

}
