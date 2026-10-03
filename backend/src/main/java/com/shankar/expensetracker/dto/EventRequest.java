package com.shankar.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;

public record EventRequest(
		
		@NotBlank(message = "Event name is required") 
		String eventName,

		@NotBlank(message = "Location is required") 
		String location

) {

}
