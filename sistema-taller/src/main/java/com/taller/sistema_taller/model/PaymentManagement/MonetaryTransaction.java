package com.taller.sistema_taller.model.PaymentManagement;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class MonetaryTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double amount;
    private LocalDate transactionDate;
    private String description;

    public MonetaryTransaction(double amount, String description) {
        this.amount = amount;
        this.description = description;
        this.transactionDate = LocalDate.now();
    }

    public MonetaryTransaction() {
        this.transactionDate = LocalDate.now();
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
