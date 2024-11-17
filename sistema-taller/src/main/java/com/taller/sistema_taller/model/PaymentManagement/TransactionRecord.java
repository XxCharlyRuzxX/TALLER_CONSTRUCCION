package com.taller.sistema_taller.model.PaymentManagement;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class TransactionRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    private LocalDate transactionDate;
    private double amount;
    private String description;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

    public TransactionRecord(double amount, String description, PaymentMethod paymentMethod) {
        this.transactionDate = LocalDate.now();
        this.amount = amount;
        this.description = description;
        this.paymentMethod = paymentMethod;
    }

    public TransactionRecord() {
        this.transactionDate = LocalDate.now();
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public double getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
