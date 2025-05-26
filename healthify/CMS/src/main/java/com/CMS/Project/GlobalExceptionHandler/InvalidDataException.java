package com.CMS.Project.GlobalExceptionHandler;

public class InvalidDataException extends RuntimeException{
    public InvalidDataException(String message) {
        super(message);
    }
}
