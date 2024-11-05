package com.taller.sistema_taller.dto;

public class UserDTO {
  private Long userId;
  private String name;
  private String phone;
  private String email;
  private String password; // Almacenar con seguridad

  public Long getUserId() {
      return userId;
  }
  public void setUserId(Long userId) {
      this.userId = userId;
  }
  public String getName() {
      return name;
  }
  public void setName(String name) {
      this.name = name;
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


