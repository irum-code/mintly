package com.mintly.mintlybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mintly.mintlybackend.model.Expense;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>{
    
}

