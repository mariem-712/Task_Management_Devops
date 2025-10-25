package com.example.Task_Management.services.admin;



import com.example.Task_Management.dto.CommentDTO;
import com.example.Task_Management.dto.TaskDTO;
import com.example.Task_Management.dto.UserDto;
import com.example.Task_Management.entities.Comment;
import com.example.Task_Management.entities.Task;
import com.example.Task_Management.entities.User;
import com.example.Task_Management.enums.TaskStatus;
import com.example.Task_Management.enums.UserRole;
import com.example.Task_Management.repositories.CommentRepository;
import com.example.Task_Management.repositories.TaskRepository;
import com.example.Task_Management.repositories.UserRepository;
import com.example.Task_Management.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService  {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final JwtUtil jwtUtil;
    private final CommentRepository commentRepository;

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().filter(user -> user.getUserRole()== UserRole.Employee)
                .map(User::getUserDto).collect(Collectors.toList());
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Optional<User> optionalUser = userRepository.findById(taskDTO.getEmployeeId());
        if (optionalUser.isPresent()) {
            Task task=new Task();
            task.setTitle(taskDTO.getTitle());
            task.setDescription(taskDTO.getDescription());
            task.setPriority(taskDTO.getPriority());
            task.setDueDate(taskDTO.getDueDate());
            task.setTaskStatus(TaskStatus.Inprogress);
            task.setUser(optionalUser.get());

            return taskRepository.save(task).getTaskDTO();
        }
        return null;
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream().sorted(Comparator.comparing(Task::getDueDate).
                reversed()).map(Task::getTaskDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteTask(Long id) {
         taskRepository.deleteById(id);
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        Optional<Task> optionalTask =taskRepository.findById(id);
        return optionalTask.map(Task::getTaskDTO).orElse(null);

    }

    @Override
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        Optional<Task> optionalTask =taskRepository.findById(id);
        Optional<User> optionalUser=userRepository.findById(taskDTO.getEmployeeId());
        if(optionalTask.isPresent() && optionalUser.isPresent()){
            Task existingTask = optionalTask.get();

            existingTask.setTitle(taskDTO.getTitle());
            existingTask.setDescription(taskDTO.getDescription());
            existingTask.setPriority(taskDTO.getPriority());
            existingTask.setDueDate(taskDTO.getDueDate());
            existingTask.setTaskStatus(setTaskStatus(String.valueOf(taskDTO.getTaskStatus())));
            existingTask.setUser(optionalUser.get());
            return taskRepository.save(existingTask).getTaskDTO();

        }
        return null;
    }

    @Override
    public List<TaskDTO> searchTask(String taskStatusStr) {
        TaskStatus taskStatus = TaskStatus.valueOf(taskStatusStr);
        return taskRepository.findAllByTaskStatus(taskStatus).stream()
                .sorted(Comparator.comparing(Task::getDueDate).reversed())
                .map(Task::getTaskDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CommentDTO createComment(Long taskId, String content) {
       Optional<Task> optionalTask= taskRepository.findById(taskId);
       User user = jwtUtil.getLoggedInUser();
       if (optionalTask.isPresent() && user != null){
           Comment comment = new Comment();
           comment.setCreatedAt(new Date());
           comment.setContent(content);
           comment.setUser(user);
           comment.setTask(optionalTask.get());
          return commentRepository.save(comment).getCommentDTo();
       }
       throw new EntityNotFoundException("user or task not found");
    }

    @Override
    public List<CommentDTO> getCommentsByTaskId(Long taskId) {
        return commentRepository.findAllByTaskId(taskId).stream()
                .map(Comment::getCommentDTo).collect(Collectors.toList());

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
