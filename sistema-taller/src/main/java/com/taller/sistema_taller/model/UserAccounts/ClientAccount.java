package com.taller.sistema_taller.model.UserAccounts;

public class ClientAccount extends UserAccount {

    public ClientAccount(Long userId, String name, String phone, AccessCredentials accessCredentials) {
        super(userId, name, phone, accessCredentials);
    }

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
