package com.shankar.expensetracker.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
	 @ExceptionHandler(ResourceNotFoundException.class)
	    public ResponseEntity<ErrorResponse> handleNotFound(
	            ResourceNotFoundException ex,
	            HttpServletRequest request) {

	        ErrorResponse response = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.NOT_FOUND.value(),
	                "Not Found",
	                ex.getMessage(),
	                request.getRequestURI()
	        );

	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body(response);
	    }


	    @ExceptionHandler(BadRequestException.class)
	    public ResponseEntity<ErrorResponse> handleBadRequest(
	            BadRequestException ex,
	            HttpServletRequest request) {

	        ErrorResponse response = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.BAD_REQUEST.value(),
	                "Bad Request",
	                ex.getMessage(),
	                request.getRequestURI()
	        );

	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body(response);
	    }


	    @ExceptionHandler(MethodArgumentNotValidException.class)
	    public ResponseEntity<Map<String, String>> handleValidation(
	            MethodArgumentNotValidException ex) {

	        Map<String, String> errors = new HashMap<>();

	        ex.getBindingResult()
	                .getFieldErrors()
	                .forEach(error ->
	                        errors.put(
	                                error.getField(),
	                                error.getDefaultMessage()
	                        )
	                );

	        return ResponseEntity
	                .badRequest()
	                .body(errors);
	    }


	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<ErrorResponse> handleGenericException(
	            Exception ex,
	            HttpServletRequest request) {

	        ErrorResponse response = new ErrorResponse(
	                LocalDateTime.now(),
	                HttpStatus.INTERNAL_SERVER_ERROR.value(),
	                "Internal Server Error",
	                ex.getMessage(),
	                request.getRequestURI()
	        );

	        return ResponseEntity
	                .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(response);
	    }

}
