package com.xpanxion.capstone.controller;


import com.xpanxion.capstone.model.Income;
import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.repository.IncomeRepository;
import com.xpanxion.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class IncomeController
{
    private final IncomeRepository incomeRepository;

    private UserRepository userRepository;

    @Autowired
    public IncomeController(IncomeRepository incomeRepository, UserRepository userRepository) {
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/income/{user_id}")
    public Income createIncome(@RequestBody Income income, @PathVariable Long user_id)
    {
        User user = this.userRepository.findById(user_id).get();
        income.setUser(user);
        return this.incomeRepository.save(income);
    }
    @GetMapping("/income/user/{user_id}") // http://localhost:8080/income/user/1
    public List<Income> getAllIncome(@PathVariable("user_id") Long user_id)
    {
        return this.incomeRepository.findByUserId(user_id);
    }

    @GetMapping("/income/{id}") // http://localhost:8080/income/1
    public Income getIncomeById(@PathVariable Long id)
    {
        return this.incomeRepository.findById(id).get();
    }

    @DeleteMapping("/income/{id}") // http://localhost:8080/api/v1/delete-income/1
    public void deleteIncomeById(@PathVariable Long id)
    {
        this.incomeRepository.deleteById(id);
        System.out.println("Deleted Income id " + id);
    }

    @PutMapping("/income/{id}") // http://localhost:8080/api/v1/update-income/1
    public Income updateIncomeById(@PathVariable Long id, @RequestBody Income incomeInput)
    {
        Income income = this.incomeRepository.findById(id).get();
        income.setIncome_source(incomeInput.getIncome_source());
        income.setAmount(incomeInput.getAmount());
        income.setFrequency(incomeInput.getFrequency());
        income.setDescription(incomeInput.getDescription());
        return this.incomeRepository.save(income);
    }

    }

