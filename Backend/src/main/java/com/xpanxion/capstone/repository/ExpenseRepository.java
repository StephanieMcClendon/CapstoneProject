package com.xpanxion.capstone.repository;

import com.xpanxion.capstone.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>
{
    List<Expense> findExpenseByUserId(Long user_id);
}
