package com.pblgllgs.demo.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path="/api/v1/students")
public class StudentController {

    @GetMapping()
    public List<Student> getAllStudent(){
        List<Student> students = Arrays.asList(
                new Student(
                        1L,
                        "user",
                        "user@gmail.com",
                        Gender.MALE

                ),
                new Student(
                        2L,
                        "admin",
                        "admin@gmail.com",
                        Gender.FEMALE

                )
        );
        return students;
    }
}
