package com.mintly.mintlybackend.service;


import org.springframework.stereotype.Service;

import com.mintly.mintlybackend.model.Expense;
import com.mintly.mintlybackend.repository.ExpenseRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;


    public ExpenseService(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    public Optional<Expense> getExpenseById(Long id){
        return expenseRepository.findById(id);
    }

    public void printExpenseById(Long id) {
        getExpenseById(id).ifPresent(expense -> System.out.println(expense.toString()));
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense expense){
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if(optionalExpense.isPresent()){
            Expense existingExpense = optionalExpense.get();
            existingExpense.setCategory(expense.getCategory());
            existingExpense.setAmount(expense.getAmount());
            existingExpense.setDate(expense.getDate());
            return expenseRepository.save(existingExpense);
        }else{
            System.out.println("Expense not found with id: {}"+ id);
            return null;
        }
    }
    // Using Java 8 lambda expression and stream.
    public Optional<List<Expense>> getHighExpenses(double threshold) {
        List<Expense> highExpenses =  expenseRepository.findAll().stream()
        .filter(expense -> expense.getAmount() > threshold)
        .collect(Collectors.toList());

        return Optional.of(highExpenses)
                  .filter(list -> !list.isEmpty());
    }   

    public void deleteExpense(Long id){
        expenseRepository.deleteById(id);
    }
}
