package com.xpanxion.capstone.controller;

import com.xpanxion.capstone.model.Expense;
import com.xpanxion.capstone.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ExpenseController {
    private ExpenseRepository expenseRepository;
    @Autowired
    public ExpenseController(ExpenseRepository expenseRepository)
    {
        this.expenseRepository = expenseRepository;
    }


    @PostMapping("/expense") // http://localhost:8080/api/v1/create-expense
    public Expense createExpense(@RequestBody Expense expense)
    {
        return this.expenseRepository.save(expense);
    }

    @GetMapping("/expense") // http://localhost:8080/api/v1/expenses
    public List<Expense> getAllExpense()
    {
        return this.expenseRepository.findAll();
    }

    @GetMapping("/expense/{id}") // http://localhost:8080/api/v1/expense/1
    public Expense getExpenseById(@PathVariable Long id)
    {
        return this.expenseRepository.findById(id).get();
    }

    @DeleteMapping("/expense/{id}") // http://localhost:8080/api/v1/delete-expense/1
    public void deleteExpenseById(@PathVariable Long id)
    {
        this.expenseRepository.deleteById(id);
        System.out.println("Deleted Expense" + id);
    }

    @PutMapping("/expense/{id}") // http://localhost:8080/api/v1/update-expense/1
    public Expense updateExpenseById(@PathVariable Long id, @RequestBody Expense userInput) {
        Expense expense = this.expenseRepository.findById(id).get();

        expense.setExpense_name(userInput.getExpense_name());
        expense.setAmount(userInput.getAmount());
        expense.setFrequency(userInput.getFrequency());
        expense.setDescription(userInput.getDescription());

        return this.expenseRepository.save(expense);
    }
}
