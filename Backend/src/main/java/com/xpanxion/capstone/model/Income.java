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
    private int amount;
    private int frequency;
    private String description;
    private Long user_id;

    @ManyToOne
    @JsonIgnore
    private User user;

}
