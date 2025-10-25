package com.example.Task_Management.services.admin;


import com.example.Task_Management.dto.CommentDTO;
import com.example.Task_Management.dto.TaskDTO;
import com.example.Task_Management.dto.UserDto;

import java.util.List;

public interface AdminService {
    List<UserDto> getUsers();
    TaskDTO createTask(TaskDTO taskDTO);
    List<TaskDTO> getAllTasks();
    void deleteTask(Long id);
    TaskDTO getTaskById(Long id);
    TaskDTO updateTask(Long id,TaskDTO taskDTO);
    List<TaskDTO> searchTask(String taskStatus);
    CommentDTO createComment(Long taskId,String content);
    List<CommentDTO> getCommentsByTaskId(Long taskId);
}
