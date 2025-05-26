package com.CMS.Project.Login.Controller;


import com.CMS.Project.Login.Dto.ResetPasswordRequest;
import com.CMS.Project.Login.Model.PasswordResetToken;
import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Login.Repository.PasswordResetTokenRepository;
import com.CMS.Project.Admin.Repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class EmailController
{
    private final JavaMailSender mailSender;
    private final UserRepo userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    public EmailController(JavaMailSender mailSender,
                           UserRepo userRepository,
                           PasswordResetTokenRepository tokenRepository,
                           PasswordEncoder passwordEncoder) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

//
//    @GetMapping("/send-email")
//            public String sendEmail()
//    {
//        try {
//            SimpleMailMessage message = new SimpleMailMessage();
//            message.setFrom("samkutty873@gmail.com");
//            message.setTo("yashodha.ramaradder@gmail.com");
//            message.setSubject("Test Email");
//            message.setText("This is a test email sent from Spring Boot.");
//            mailSender.send(message);
//            return "Email sent successfully";
//        } catch (Exception e)
//        {
//            return "Error sending email: " + e.getMessage();
//        }
//    }



    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        Optional<User> userOpt = userRepository.findByUsername(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOpt.get();

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(30));
        resetToken.setUser(user);
        tokenRepository.save(resetToken);

        String resetUrl = "http://localhost:8081/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Reset Your Password");
        message.setText("Click the link to reset your password: " + resetUrl);

        try {
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email");
        }

        return ResponseEntity.ok("Reset password link sent to your email.");
    }

    @GetMapping("/validate-reset-token")
    public ResponseEntity<String> validateResetToken(@RequestParam String token) {
        Optional<PasswordResetToken> resetTokenOpt = tokenRepository.findByToken(token);

        if (resetTokenOpt.isEmpty() || resetTokenOpt.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }

        return ResponseEntity.ok("Valid token");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> resetTokenOpt = tokenRepository.findByToken(request.getToken());

        if (resetTokenOpt.isEmpty() || resetTokenOpt.get().getExpiryDate().isBefore(LocalDateTime.now()))
        {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
        PasswordResetToken resetToken = resetTokenOpt.get();
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        tokenRepository.delete(resetToken); // Invalidate used token

        return ResponseEntity.ok("Password reset successful.");
    }
    //test by sam

}
