package com.CMS.Project.Pharmacist;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pharmacist")
public class PharamcistController {


    @GetMapping("/home")
    public String home()
    {
        return "Pharmacist home";
    }
}
