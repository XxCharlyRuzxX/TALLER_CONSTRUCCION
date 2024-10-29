package com.mycompany.taller_v2.UserAccounts;


public class AccessCredentials {
    private String email;
    private String password;

    public AccessCredentials(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public boolean validateCredentials(String email, String password) {
        return this.email.equals(email) && this.password.equals(password);
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
    
    
    
    

}

