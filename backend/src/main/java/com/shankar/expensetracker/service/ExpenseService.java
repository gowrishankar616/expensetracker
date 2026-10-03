package com.shankar.expensetracker.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.shankar.expensetracker.repository.ExpenseRepository;
import com.shankar.expensetracker.dto.ExpenseRequest;
import com.shankar.expensetracker.entity.Event;
import com.shankar.expensetracker.entity.Expense;
import com.shankar.expensetracker.entity.User;
import com.shankar.expensetracker.exception.ResourceNotFoundException;
import com.shankar.expensetracker.repository.EventRepository;
import com.shankar.expensetracker.repository.UserRepository;

@Service
public class ExpenseService {

	private final ExpenseRepository expenseRepository;
	private final EventRepository eventRepository;
	private final UserRepository userRepository;

	public ExpenseService(ExpenseRepository expenseRepository, EventRepository eventRepository,
			UserRepository userRepository) {

		this.expenseRepository = expenseRepository;
		this.eventRepository = eventRepository;
		this.userRepository = userRepository;
	}

	public Expense createExpense(ExpenseRequest request) {

		Event event = eventRepository.findById(request.eventId())
				.orElseThrow(() -> new ResourceNotFoundException("Event with ID " + request.eventId() + " not found"));

		User user = userRepository.findById(request.userId())
				.orElseThrow(() -> new ResourceNotFoundException("User with ID " + request.userId() + " not found"));

		Expense expense = new Expense();

		expense.setDescription(request.description());
		expense.setAmount(request.amount());
		expense.setCategory(request.category());
		expense.setExpenseDate(request.expenseDate());
		expense.setEvent(event);
		expense.setPaidBy(user);

		return expenseRepository.save(expense);
	}

	public List<Expense> getAllExpenses() {

		return expenseRepository.findAll();
	}

	public Expense getExpenseById(Long id) {

		return expenseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Expense with ID " + id + " not found"));
	}

	public List<Expense> getExpensesByEvent(Long eventId) {

		if (!eventRepository.existsById(eventId)) {

			throw new ResourceNotFoundException("Event with ID " + eventId + " not found");
		}

		return expenseRepository.findByEventId(eventId);
	}

	public Expense updateExpense(Long id, ExpenseRequest request) {

		Expense expense = getExpenseById(id);

		Event event = eventRepository.findById(request.eventId())
				.orElseThrow(() -> new ResourceNotFoundException("Event with ID " + request.eventId() + " not found"));

		User user = userRepository.findById(request.userId())
				.orElseThrow(() -> new ResourceNotFoundException("User with ID " + request.userId() + " not found"));

		expense.setDescription(request.description());
		expense.setAmount(request.amount());
		expense.setCategory(request.category());
		expense.setExpenseDate(request.expenseDate());
		expense.setEvent(event);
		expense.setPaidBy(user);

		return expenseRepository.save(expense);
	}

	public void deleteExpense(Long id) {

		Expense expense = getExpenseById(id);

		expenseRepository.delete(expense);
	}
}
