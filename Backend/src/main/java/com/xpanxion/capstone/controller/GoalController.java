package com.xpanxion.capstone.controller;

import com.xpanxion.capstone.model.Goal;
import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.repository.GoalRepository;
import com.xpanxion.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GoalController {

    private GoalRepository goalRepository;

    private UserRepository userRepository;
    // dependency injection  > field injection (@Autowired)


    @Autowired
    public GoalController(GoalRepository goalRepository, UserRepository userRepository)
    {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/goals/user/{user_id}")
    public List<Goal> listGoals(@PathVariable("user_id") Long user_id)
    {
        return this.goalRepository.findGoalsByUserId(user_id);
    }

    @GetMapping("/goals/{id}")
    public Goal listGoal(@PathVariable Long id)
    {
        return this.goalRepository.findById(id).get();
    }

    // link to user id
    @PostMapping("/goals/{user_id}")
    public Goal createGoal(@RequestBody Goal goal, @PathVariable("user_id") Long user_id)
    {
        User user = this.userRepository.findById(user_id).get();
        goal.setUser(user);
        return this.goalRepository.save(goal);
    }

    @DeleteMapping("/goals/{id}")
    public void deleteGoal(@PathVariable Long id){
        Goal goal = this.goalRepository.findById(id).get();
        this.goalRepository.deleteById(id);
    }

    // link to user id
    @PutMapping("/goals/{id}")
    public Goal updateGoal(@RequestBody Goal inputGoal, @PathVariable Long id){
        Goal goal = this.goalRepository.findById(id).get();
        goal.setGoalAmount(inputGoal.getGoalAmount());
        goal.setSaveAmount(inputGoal.getSaveAmount());
        goal.setTime_in_months(inputGoal.getTime_in_months());
        goal.setMonthlyPayment(inputGoal.getMonthlyPayment());
        goal.setTitle(inputGoal.getTitle());
        Goal updatedGoal = this.goalRepository.save(goal);
        return updatedGoal;
    }
}
