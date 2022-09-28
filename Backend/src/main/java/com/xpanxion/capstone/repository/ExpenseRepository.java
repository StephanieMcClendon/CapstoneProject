package com.xpanxion.capstone.repository;

import com.xpanxion.capstone.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
