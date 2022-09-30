package com.xpanxion.capstone.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @ManyToOne
    @JsonIgnore
    private User user; // Foreign Key

}
