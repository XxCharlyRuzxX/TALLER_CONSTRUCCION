package com.taller.sistema_taller.model.UserAccounts;

public class UserAccount {
    private final Long userId;
    private String name;
    private String phone;
    private final AccessCredentials accessCredentials;

    public UserAccount(Long userId, String name, String phone, AccessCredentials accessCredentials) {
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.accessCredentials = accessCredentials;
    }

    public void updatePhone(String newPhone) {
        this.phone = newPhone;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public AccessCredentials getAccessCredentials() {
        return accessCredentials;
    }

    public Long getUserId() {
        return userId;
    }

}
