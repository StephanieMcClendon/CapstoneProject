package com.xpanxion.capstone.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Expense {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String expense_name;
    private double amount;
    private double total;
    private String description;

    @ManyToOne
    @JsonIgnore
    private User user;


}
