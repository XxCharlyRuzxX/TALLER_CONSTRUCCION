package com.taller.sistema_taller.model.UserAccounts;

public class UserAccount {
    private final Long userId;
    private String userName;
    private String phone;
    private final AccessCredentials accessCredentials;

    public UserAccount(Long userId, String userName, String phone, AccessCredentials accessCredentials) {
        this.userId = userId;
        this.userName = userName;
        this.phone = phone;
        this.accessCredentials = accessCredentials;
    }

    public void updatePhone(String newPhone) {
        this.phone = newPhone;
    }

    public String getUserName() {
        return userName;
    }

    public String getPhone() {
        return phone;
    }

    public void setUserName(String name) {
        this.userName = name;
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
