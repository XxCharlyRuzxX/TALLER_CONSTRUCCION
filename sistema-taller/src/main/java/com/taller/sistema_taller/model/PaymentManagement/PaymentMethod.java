package com.taller.sistema_taller.model.PaymentManagement;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "payment_type")
public abstract class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public abstract void processPayment(double amount);

    public abstract void cancelPayment();

    public Long getId() {
        return id;
    }
}
