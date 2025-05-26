package com.CMS.Project.GlobalExceptionHandler;

import lombok.Data;

@Data
public class ApiResponse {
    private String message;
    private Object data;
    private int status;

    public ApiResponse(String message, Object data, int status) {
        this.message = message;
        this.data = data;
        this.status = status;
    }

}
