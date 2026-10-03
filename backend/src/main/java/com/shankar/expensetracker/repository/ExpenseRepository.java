package com.shankar.expensetracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shankar.expensetracker.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense,Long>{

	List<Expense> findByEventId(Long eventId);
}
