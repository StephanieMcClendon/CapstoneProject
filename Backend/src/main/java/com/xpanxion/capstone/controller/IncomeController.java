package com.xpanxion.capstone.controller;


import com.xpanxion.capstone.model.Income;
import com.xpanxion.capstone.model.User;
import com.xpanxion.capstone.repository.IncomeRepository;
import com.xpanxion.capstone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class IncomeController
{
    private final IncomeRepository incomeRepository;
     @Autowired
     public IncomeController(IncomeRepository  incomeRepository) {// http://localhost:8080/api/v1/add-income
            this.incomeRepository = incomeRepository;
        }

        @PostMapping("add /income")
        public Income createIncome(@RequestBody Income income)
        {
            return this.incomeRepository.save(income);
        }

        @GetMapping("/income") // http://localhost:8080/api/v1/income
        public List<Income> getAllIncome()
        {
            return this.incomeRepository.findAll();
        }
    @GetMapping("/income/{id}") // http://localhost:8080/api/v1/income/1
    public Income getIncomeById(@PathVariable Long id)
    {
        return this.incomeRepository.findById(id).get();
    }

    @DeleteMapping("/delete-income/{id}") // http://localhost:8080/api/v1/delete-income/1
    public void deleteIncomeById(@PathVariable Long id)
    {
        this.incomeRepository.deleteById(id);
        System.out.println("Deleted Income id " + id);
    }

    @PutMapping("/update-income/{id}") // http://localhost:8080/api/v1/update-income/1
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

