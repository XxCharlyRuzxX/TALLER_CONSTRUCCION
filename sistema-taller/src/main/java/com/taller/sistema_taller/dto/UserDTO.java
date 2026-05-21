package com.taller.sistema_taller.dto;

public class UserDTO {
  private Long userId;
  private String userName;
  private String phone;
  private String email;
  private String password;

  public Long getUserId() {
      return userId;
  }
  public void setUserId(Long userId) {
      this.userId = userId;
  }
  public String getUserName() {
      return userName;
  }
  public void setUserName(String userName) {
      this.userName = userName;
  }
  public String getPhone() {
      return phone;
  }
  public void setPhone(String phone) {
      this.phone = phone;
  }
  public String getEmail() {
      return email;
  }
  public void setEmail(String email) {
      this.email = email;
  }
  public String getPassword() {
      return password;
  }
  public void setPassword(String password) {
      this.password = password;
  }
}


