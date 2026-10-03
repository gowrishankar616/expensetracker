package com.shankar.expensetracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shankar.expensetracker.dto.UserRequest;
import com.shankar.expensetracker.entity.User;
import com.shankar.expensetracker.exception.BadRequestException;
import com.shankar.expensetracker.exception.ResourceNotFoundException;
import com.shankar.expensetracker.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User createUser(UserRequest request) {

		if (userRepository.findByEmail(request.email()).isPresent()) {

			throw new BadRequestException("Email already exists: " + request.email());
		}

		User user = new User();

		user.setName(request.name());
		user.setEmail(request.email());

		return userRepository.save(user);
	}

	public List<User> getAllUsers() {

		return userRepository.findAll();
	}

	public User getUserById(Long id) {

		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User with ID " + id + " not found"));
	}

	public void deleteUser(Long id) {

		User user = getUserById(id);

		userRepository.delete(user);
	}
}
