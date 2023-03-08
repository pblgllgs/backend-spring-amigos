package com.pblgllgs.demo.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/v1/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudent(){
        return studentService.getAllStudents();
    }

    @PostMapping
    public void addStudent(@RequestBody Student student){
        studentService.addStudent(student);
    }

    @DeleteMapping("/{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId){
        studentService.deleteStudent(studentId);
    }
}