package com.mintly.mintlybackend.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mintly.mintlybackend.model.Expense;
import com.mintly.mintlybackend.service.ExpenseService;

import java.util.*;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    
    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> getAllExpenses(){
        System.out.println("Retrieving expenses");
        return expenseService.getAllExpenses();
    }
    
    @GetMapping("/{id}")
    public Optional<Expense> getExpensById(@PathVariable Long id){
        return expenseService.getExpenseById(id);
    }

    @GetMapping("/high-expenses")
    public List<Expense> getHighExpenses(@RequestParam("threshold") double threshold){
        return expenseService.getHighExpenses(threshold)
        .orElse(Collections.emptyList());
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense){
        System.out.println("Irum"+expense);
        return expenseService.addExpense(expense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expense){
        Expense updatedExpense =  expenseService.updateExpense(id, expense);
        if(updatedExpense != null){
            return ResponseEntity.ok(updatedExpense);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
    }
}
