package com.mintly.mintlybackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.mintly.mintlybackend.repository.ExpenseRepository;
import com.mintly.mintlybackend.model.Expense;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest(classes = MintlyBackendApplication.class)
public class MintlyBackendApplicationTests {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Test
    void testSaveExpense() {
        Expense expense = new Expense();
        expense.setCategory("Test");
        expense.setAmount(100.0);
        expense.setDate("2024-11-12");
        expenseRepository.save(expense);

        assertNotNull(expenseRepository.findAll());
    }
}
