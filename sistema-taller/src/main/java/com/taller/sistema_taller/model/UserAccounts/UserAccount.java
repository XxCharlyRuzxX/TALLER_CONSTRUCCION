package com.taller.sistema_taller.model.UserAccounts;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String userName;

    private String userPhone;

    @Embedded
    private AccessCredentials accessCredentials;

    public UserAccount(Long userId, String userName, String phone, String email, String password) {
        this.userId = userId;
        this.userName = userName;
        this.userPhone = phone;
        this.accessCredentials = new AccessCredentials(email, password);
    }

    public UserAccount() {
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
