package com.expense.demo.repository;

import java.time.LocalDate;
import java.util.List;

import com.expense.demo.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseRepo extends JpaRepository<Expense, Long> {
    //List<Expense> findByDate(LocalDate date);
    @Query("SELECT e FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<Expense>  getTotalMonthlyExpenses(@Param("year") int year, @Param("month") int month);
}
