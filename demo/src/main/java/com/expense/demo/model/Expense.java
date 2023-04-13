package com.expense.demo.model;

import jakarta.persistence.*; // for Spring Boot 3
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expense")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "category")
    private String category;

    @Column(name = "type")
    private String type;

    @Column(name = "amount")
    private Integer amount;

    public LocalDate getDate() {
        return date;
    }

    @Column(name = "date")
    @CreationTimestamp
    private LocalDate date;

    public Expense() {

    }

    public Expense(String category, String type, Integer amount) {
        this.category = category;
        this.type = type;
        this.amount = amount;
        this.date = getDate();
    }

    public long getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Expense [id=" + id + ", category=" + category + ", type=" + type + ", amount=" + amount + "]";
    }
}