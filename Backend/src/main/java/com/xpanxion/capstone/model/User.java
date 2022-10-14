package com.xpanxion.capstone.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String role; // ROLE_USER, ROLE_ADMIN

    @OneToMany(mappedBy = "user")
    private List<Goal> goals;
    @OneToMany(mappedBy = "user")
    private List<Income> incomes;
    @OneToMany(mappedBy = "user")
    private List<Expense> expenses;
}
