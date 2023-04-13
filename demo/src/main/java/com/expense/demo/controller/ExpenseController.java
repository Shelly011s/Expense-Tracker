package com.expense.demo.controller;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.expense.demo.model.Expense;
import com.expense.demo.repository.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    ExpenseRepo expRepo;
    @GetMapping("/expenses/{year}/{month}") //Get all expenses by a particular month
    public ResponseEntity<List<Expense>> getAllExpenses(@PathVariable("year") int year, @PathVariable("month") int month) {
        try {
            List<Expense> totalMonthlyExpenses = expRepo.getTotalMonthlyExpenses(year, month);
            return new ResponseEntity<>(totalMonthlyExpenses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/expense") //add an expense
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        try {
            Expense _expense = expRepo.save(expense);
            return new ResponseEntity<>(_expense, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/expense/{id}") //edit an expense
    public ResponseEntity<Expense> updateExpense(@PathVariable("id") long id, @RequestBody Expense expense) {
        Optional<Expense> expenseData = expRepo.findById(id);

        if (expenseData.isPresent()) {
            Expense _expense = expenseData.get();
            _expense.setType(expense.getType());
            _expense.setCategory(expense.getCategory());
            _expense.setAmount(expense.getAmount());
            return new ResponseEntity<>(expRepo.save(_expense), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/expense/{id}") //delete an expense
    public ResponseEntity<HttpStatus> deleteExpense(@PathVariable("id") long id) {
        try {
            expRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}