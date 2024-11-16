package com.taller.sistema_taller.model.PaymentManagement;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("CREDIT_CARD")
public class CreditCardPayment extends PaymentMethod {

    private String cardNumber;
    private String cardHolder;
    private String expirationDate;

    public CreditCardPayment(String cardNumber, String cardHolder, String expirationDate) {
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.expirationDate = expirationDate;
    }

    public CreditCardPayment() {
    }

    @Override
    public void processPayment(double amount) {
        dummyProcessPayment(amount);
    }

    @Override
    public void cancelPayment() {
        dummyCancelPayment();
    }

    private void dummyProcessPayment(double amount) {
        System.out.println("Processing payment of: " + amount);
        System.out.println("Using card number: " + cardNumber + ", holder: " + cardHolder + ", expiration: " + expirationDate);
    }

    private void dummyCancelPayment() {
        System.out.println("Payment cancellation process initiated for card: " + cardNumber);
    }
}
