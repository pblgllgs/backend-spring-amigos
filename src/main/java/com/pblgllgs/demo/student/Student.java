package com.pblgllgs.demo.student;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Student {

    private Long id;

    private String name;

    private String email;

    private Gender gender;
}
