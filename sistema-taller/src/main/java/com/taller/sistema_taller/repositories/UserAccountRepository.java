package com.taller.sistema_taller.repositories;

import com.taller.sistema_taller.model.UserAccounts.AdminAccount;
import com.taller.sistema_taller.model.UserAccounts.ClientAccount;
import com.taller.sistema_taller.model.UserAccounts.UserAccount;
import com.taller.sistema_taller.model.UserAccounts.WorkerAccount;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    @Query("SELECT a FROM AdminAccount a")
    List<AdminAccount> findAllAdminAccounts();

    @Query("SELECT c FROM ClientAccount c")
    List<ClientAccount> findAllClientAccounts();

    @Query("SELECT w FROM WorkerAccount w")
    List<WorkerAccount> findAllWorkerAccounts();

    boolean existsByAccessCredentials_Email(String email);

    Optional<UserAccount> findByAccessCredentialsEmail(String email);

}

