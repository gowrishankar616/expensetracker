package com.shankar.expensetracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shankar.expensetracker.dto.EventRequest;
import com.shankar.expensetracker.entity.Event;
import com.shankar.expensetracker.entity.User;
import com.shankar.expensetracker.exception.ResourceNotFoundException;
import com.shankar.expensetracker.repository.EventRepository;
import com.shankar.expensetracker.repository.UserRepository;

@Service
public class EventService {

	private final EventRepository eventRepository;
	private final UserRepository userRepository;

	public EventService(EventRepository eventRepository, UserRepository userRepository) {

		this.eventRepository = eventRepository;
		this.userRepository = userRepository;
	}

	public Event createEvent(EventRequest request) {

		Event event = new Event();

		event.setEventName(request.eventName());
		event.setLocation(request.location());

		return eventRepository.save(event);
	}

	public List<Event> getAllEvents() {

		return eventRepository.findAll();
	}

	public Event getEventById(Long id) {

		return eventRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Event with ID " + id + " not found"));
	}

	public Event addMember(Long eventId, Long userId) {

		Event event = getEventById(eventId);

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found"));

		event.getMembers().add(user);

		return eventRepository.save(event);
	}

	public Event removeMember(Long eventId, Long userId) {

		Event event = getEventById(eventId);

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found"));

		event.getMembers().remove(user);

		return eventRepository.save(event);
	}
}
