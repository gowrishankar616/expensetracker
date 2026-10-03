package com.shankar.expensetracker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shankar.expensetracker.dto.ExpenseRequest;
import com.shankar.expensetracker.entity.Expense;
import com.shankar.expensetracker.service.ExpenseService;

import jakarta.validation.Valid;
import lombok.Data;

@RestController
@RequestMapping("/api/expenses")
@Data
public class ExpenseController {

	private final ExpenseService expenseService;

	@PostMapping
	public ResponseEntity<Expense> createExpense(@Valid @RequestBody ExpenseRequest request) {

		return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.createExpense(request));
	}

	@GetMapping
	public ResponseEntity<List<Expense>> getAllExpenses() {

		return ResponseEntity.ok(expenseService.getAllExpenses());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Expense> getExpense(@PathVariable Long id) {

		return ResponseEntity.ok(expenseService.getExpenseById(id));
	}

	@GetMapping("/event/{eventId}")
	public ResponseEntity<List<Expense>> getExpensesByEvent(@PathVariable Long eventId) {

		return ResponseEntity.ok(expenseService.getExpensesByEvent(eventId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody ExpenseRequest request) {

		return ResponseEntity.ok(expenseService.updateExpense(id, request));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {

		expenseService.deleteExpense(id);

		return ResponseEntity.noContent().build();
	}
}
