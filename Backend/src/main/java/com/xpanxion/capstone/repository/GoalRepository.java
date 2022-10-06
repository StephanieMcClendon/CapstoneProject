package com.xpanxion.capstone.repository;

import com.xpanxion.capstone.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long>
{
    List<Goal> findGoalsByUserId(Long user_id);

}
