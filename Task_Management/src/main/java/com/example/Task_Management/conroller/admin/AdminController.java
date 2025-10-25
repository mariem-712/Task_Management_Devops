package com.example.Task_Management.conroller.admin;

import com.example.Task_Management.dto.CommentDTO;
import com.example.Task_Management.dto.TaskDTO;
import com.example.Task_Management.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(adminService.getUsers());
    }


    @PostMapping("/createTask")
    public ResponseEntity<TaskDTO>createTask (@RequestBody TaskDTO taskDTO){
        TaskDTO createdtaskDTO = adminService.createTask(taskDTO);
        if(createdtaskDTO == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdtaskDTO);
    }

    @GetMapping("/tasks")
    public ResponseEntity<?> getAllTasks(){
        return ResponseEntity.ok(adminService.getAllTasks());
    }


    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        adminService.deleteTask(id);
        return ResponseEntity.ok(null);

    }

    @GetMapping("/oneTask/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id){
      return   ResponseEntity.ok(adminService.getTaskById(id));
    }

    @PutMapping("/updateTask/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id , @RequestBody TaskDTO taskDTO){
        TaskDTO updatedTask = adminService.updateTask(id,taskDTO);
        if(updatedTask==null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/search/{taskStatus}")
    public ResponseEntity<List<TaskDTO>> searchTask(@PathVariable String taskStatus){
        return ResponseEntity.ok(adminService.searchTask(taskStatus));
    }

    @PostMapping("/createComment/{taskId}")
    public ResponseEntity<CommentDTO>createComment (@PathVariable Long taskId,@RequestParam String content){
        CommentDTO createdCommentDTO = adminService.createComment(taskId,content);
        if(createdCommentDTO == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCommentDTO);
    }

    @GetMapping("/comments/{taskId}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long taskId){
        return ResponseEntity.ok(adminService.getCommentsByTaskId(taskId));
    }


}
