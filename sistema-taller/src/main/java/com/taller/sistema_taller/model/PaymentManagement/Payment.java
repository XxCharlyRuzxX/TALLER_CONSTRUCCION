package com.taller.sistema_taller.model.PaymentManagement;

import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import java.util.Date;

public class Payment {
    private float amount;
    private String paymentMethod;
    private Date paymentDate;

    public Payment(float amount, String paymentMethod, Date paymentDate) {
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
    }

    public float calculateOutstandingBalance(ClientAccount client) {
        return 0.0f;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }
}
