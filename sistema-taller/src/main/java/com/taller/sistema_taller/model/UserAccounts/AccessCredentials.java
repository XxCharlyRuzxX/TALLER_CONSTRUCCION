package com.taller.sistema_taller.model.UserAccounts;

import jakarta.persistence.Embeddable;

@Embeddable
public class AccessCredentials {
    private String email;
    private String password;

    public AccessCredentials(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public AccessCredentials() {
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean validateCredentials(String email, String password) {
        return this.email.equals(email) && this.password.equals(password);
    }

}
