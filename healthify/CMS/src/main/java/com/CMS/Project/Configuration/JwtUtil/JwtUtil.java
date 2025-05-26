package com.CMS.Project.Configuration.JwtUtil;


import com.CMS.Project.Admin.Model.Role;
import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.UserRepo;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtUtil
{

    private static final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    private final int jwtExpirationMs = 86400000;

    private final UserRepo userRepository;

    public JwtUtil(UserRepo userRepository)
    {
        this.userRepository = userRepository;
    }

    //GenerateToken
    public String generateToken(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        Set<Role> roles = user.get().getRoles();
        Long userId = user.get().getId();
        //add roles to the token
        return Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .claim("roles", roles.stream()
                        .map(role -> role.getName())
                        .collect(Collectors.joining(",")))
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(secretKey).compact();
    }

    //extract username
    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    //extract roles
    public Set<String> extractRoles(String token) {
        String rolesString = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token)
                .getBody().get("roles", String.class);

        return Set.of(rolesString);
    }

    // Extract User ID from the Token
    public Long extractUserId(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token)
                .getBody().get("userId", Long.class); // Extract userId from the token
    }

    //token validation
    public boolean isTokenValid(String token) {
        try {

            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
            return true;

        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

}
