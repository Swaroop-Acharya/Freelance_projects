package com.CMS.Project.Login.Repository;

import com.CMS.Project.Login.Model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long>
{

    Optional<PasswordResetToken> findByToken(String token);
}
