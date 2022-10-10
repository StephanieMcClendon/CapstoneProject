package com.xpanxion.capstone.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title; // new
    private double saveAmount;
    private double goalAmount;
    private int time_in_months;
    private double monthlyPayment; // new

    @ManyToOne
    @JsonIgnore
    private User user; // Foreign Key

}
