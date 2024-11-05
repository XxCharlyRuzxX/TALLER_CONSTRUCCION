package com.taller.sistema_taller.model.UserAccounts;

public class UserAccount {
    private final Long userId;
    private String userName;
    private String userPhone;
    private final AccessCredentials accessCredentials;

    public UserAccount(Long userId, String userName, String phone, String email, String password) {
        this.userId = userId;
        this.userName = userName;
        this.userPhone = phone;
        this.accessCredentials = new AccessCredentials(email, password);
    }

    public void updateUserPhone(String newPhone) {
        this.userPhone = newPhone;
    }

    public String getUserName() {
        return userName;
    }

    public String getPhone() {
        return userPhone;
    }

    public void setUserName(String name) {
        this.userName = name;
    }

    public void setUserPhone(String phone) {
        this.userPhone = phone;
    }

    public AccessCredentials getAccessCredentials() {
        return accessCredentials;
    }

    public Long getUserId() {
        return userId;
    }

}
