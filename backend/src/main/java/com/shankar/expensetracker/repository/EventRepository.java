package com.shankar.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shankar.expensetracker.entity.Event;

public interface EventRepository extends JpaRepository<Event,Long>{

}
