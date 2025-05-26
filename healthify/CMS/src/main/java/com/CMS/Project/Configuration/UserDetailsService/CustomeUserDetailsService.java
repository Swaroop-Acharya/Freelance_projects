package com.CMS.Project.Configuration.UserDetailsService;

import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.UserRepo;
import com.CMS.Project.Configuration.UserPrinciples.userPrinciples;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomeUserDetailsService implements UserDetailsService
{

    private final UserRepo userRepo;

   public CustomeUserDetailsService(UserRepo userRepo)
   {
       this.userRepo = userRepo;
   }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user1 = userRepo.findByUsername(username).orElseThrow(()-> new RuntimeException("user not found" + username));
        return new userPrinciples(user1);
    }
}
