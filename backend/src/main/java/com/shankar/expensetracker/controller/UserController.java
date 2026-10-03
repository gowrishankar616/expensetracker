package com.shankar.expensetracker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shankar.expensetracker.dto.UserRequest;
import com.shankar.expensetracker.entity.User;
import com.shankar.expensetracker.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

	private final UserService userService;



	@PostMapping
	public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {

		return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(request));
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {

		return ResponseEntity.ok(userService.getAllUsers());
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable Long id) {

		return ResponseEntity.ok(userService.getUserById(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {

		userService.deleteUser(id);

		return ResponseEntity.noContent().build();
	}
}
