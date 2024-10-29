package com.mycompany.taller_v2.UserAccounts;

public class ClientAccount extends UserAccount {

    public ClientAccount(String name, String phone, AccessCredentials accessCredentials) {
        super(name, phone, accessCredentials);
    }

    public void authorizeDiagnostic(Diagnostic diagnostic) {
        // Logic to authorize diagnostic
    }

    public void requestInvoice() {
        // Logic to request an invoice
    }

    public void completeSatisfactionSurvey() {
        // Logic to complete the satisfaction survey
    }

    public String checkVehicleStatus() {
        // Logic to check the vehicle's status
        return null;
    }
}

