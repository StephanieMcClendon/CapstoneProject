package com.xpanxion.capstone.repository;

import com.xpanxion.capstone.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income,Long>
{
    List<Income> findByUserId(Long user_id);
}
