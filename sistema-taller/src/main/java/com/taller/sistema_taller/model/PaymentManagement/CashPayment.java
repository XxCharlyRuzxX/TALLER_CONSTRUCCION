package com.taller.sistema_taller.model.PaymentManagement;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("CASH")
public class CashPayment extends PaymentMethod {

    public CashPayment() {
    }

    @Override
    public void processPayment(double amount) {
        System.out.println("Processing cash payment of: " + amount);
    }

    @Override
    public void cancelPayment() {
        System.out.println("Cash payment cancelled.");
    }
}
