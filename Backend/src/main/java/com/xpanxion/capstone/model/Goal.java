package com.xpanxion.capstone.model;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int saveAmount; // user wants to save this amount
    private int goalAmount; // target goal, if it matches this goal we win
    private int time_in_months;

    @ManyToOne
    private User user; // FK

    public Goal(Long id, int saveAmount, int goalAmount, int time_in_months, User user) {
        this.id = id;
        this.saveAmount = saveAmount;
        this.goalAmount = goalAmount;
        this.time_in_months = time_in_months;
        this.user = user;
    }

    public Goal(){
    }


}
