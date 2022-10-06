package com.xpanxion.capstone.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "income")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private double income_source;
    private double amount; // income amount we are using in angular
    private int frequency;
    private String description; // income name we are using in angular

    @ManyToOne
    @JsonIgnore
    private User user;

}
