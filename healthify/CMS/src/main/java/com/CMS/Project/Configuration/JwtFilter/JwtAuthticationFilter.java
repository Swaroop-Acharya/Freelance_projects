package com.CMS.Project.Configuration.JwtFilter;

import com.CMS.Project.Login.Service.TokenBlacklistService;
import com.CMS.Project.Configuration.JwtUtil.JwtUtil;
import com.CMS.Project.Configuration.UserDetailsService.CustomeUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthticationFilter extends OncePerRequestFilter
{
    private final JwtUtil jwtUtil;
    private final CustomeUserDetailsService customeUserDetailService;

    private final TokenBlacklistService tokenBlacklistService;

    public JwtAuthticationFilter(JwtUtil jwtUtil, CustomeUserDetailsService customeUserDetailService, TokenBlacklistService tokenBlacklistService) {
        this.jwtUtil = jwtUtil;
        this.customeUserDetailService = customeUserDetailService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = request.getHeader("Authorization");

        if(token != null && token.startsWith("Bearer "))
        {
            token = token.substring(7);

            // Check if the token is blacklisted
            if (tokenBlacklistService.isTokenBlacklisted(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token is invalid or has been blacklisted");
                return;
            }

            String username = jwtUtil.extractUsername(token);

            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null)
            {
                UserDetails userDetails = customeUserDetailService.loadUserByUsername(username);

                if(jwtUtil.isTokenValid(token))
                {
                    UsernamePasswordAuthenticationToken authtoken = new UsernamePasswordAuthenticationToken(userDetails,
                            null,userDetails.getAuthorities());
                    authtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authtoken);
                }
            }
        }

        filterChain.doFilter(request,response);

    }
}
