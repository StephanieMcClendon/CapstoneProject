package com.xpanxion.capstone.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private double saveAmount; // user wants to save this amount
    private double goalAmount; // target goal, if it matches this goal we win
    private int time_in_months;
    private LocalDate startDate;
    private LocalDate presentDate;

    @ManyToOne
    @JsonIgnore
    private User user; // Foreign Key

}
