package com.taller.sistema_taller.model.UserAccounts;

import jakarta.persistence.Entity;

@Entity
public class ClientAccount extends UserAccount {

    public ClientAccount(Long userId, String userName, String phone, String email, String password) {
        super(userId, userName, phone, email, password);
    }

    public ClientAccount(){}

    public void authorizeDiagnostic() {

    }

    public void requestInvoice() {

    }

    public void completeSatisfactionSurvey() {

    }

    public String checkVehicleStatus() {

        return null;
    }
}
