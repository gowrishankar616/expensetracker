# Expense Tracker

A full-stack Expense Tracker application built using **Java, Spring Boot, React.js, and MySQL**.
The application allows users to manage their expenses and categories through REST APIs and a responsive React frontend.

## 🚀 Technologies Used

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

### Frontend

* React.js
* HTML
* CSS
* JavaScript

### Database

* MySQL

### Tools

* Postman
* Git & GitHub
* Eclipse / VS Code

## ✨ Features

* Add new expenses
* View all expenses
* Update expense details
* Delete expenses
* Manage expense categories
* RESTful API integration
* MySQL database integration
* CRUD operations
* Exception handling
* Responsive React user interface
* Layered backend architecture

## 🏗️ Project Structure

```text
ExpenseTracker
│
├── backend
│   ├── src
│   │   └── main
│   │       ├── java
│   │       │   └── com.shankar.expensetracker
│   │       │       ├── controller
│   │       │       ├── service
│   │       │       ├── repository
│   │       │       ├── entity
│   │       │       ├── exception
│   │       │       └── ...
│   │       └── resources
│   │           └── application.properties
│   └── pom.xml
│
└── frontend
    ├── src
    ├── public
    ├── package.json
    └── ...
```

## 🔄 Application Flow

```text
React Frontend
      ↓
REST API
      ↓
Spring Boot Controller
      ↓
Service Layer
      ↓
Repository Layer
      ↓
MySQL Database
```

## 🗄️ Database

The application uses **MySQL** to store expense and category information.

Example database configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> Update the database name, username, and password according to your local MySQL configuration.

## ⚙️ Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

### 2. Open the Backend

Open the `backend` folder in **Eclipse** or **IntelliJ IDEA**.

### 3. Configure MySQL

Create a database in MySQL:

```sql
CREATE DATABASE expense_tracker;
```

Update `application.properties` with your MySQL username and password.

### 4. Run the Spring Boot Application

Run the main Spring Boot application class.

The backend will start on:

```text
http://localhost:8080
```

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

If your project uses Vite, use:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🔌 REST API

The backend provides REST APIs for managing expenses and categories.

### Expense APIs

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/expenses`      | Get all expenses  |
| GET    | `/expenses/{id}` | Get expense by ID |
| POST   | `/expenses`      | Add a new expense |
| PUT    | `/expenses/{id}` | Update an expense |
| DELETE | `/expenses/{id}` | Delete an expense |

### Category APIs

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | `/categories`      | Get all categories |
| POST   | `/categories`      | Add a category     |
| PUT    | `/categories/{id}` | Update a category  |
| DELETE | `/categories/{id}` | Delete a category  |

> Update the endpoint names above if your actual controller mappings are different.

## 🧪 API Testing

The REST APIs can be tested using **Postman**.

Example POST request:

```json
{
    "amount": 500,
    "description": "Grocery Shopping",
    "category": "Food"
}
```

## 🛡️ Exception Handling

The application includes centralized exception handling using:

* `BadRequestException`
* `ResourceNotFoundException`
* `GlobalExceptionHandler`
* `ErrorResponse`

This helps return meaningful error responses when invalid requests or resources are encountered.

## 📌 Key Concepts Used

* Object-Oriented Programming
* Spring Boot
* REST API development
* CRUD operations
* Spring Data JPA
* Hibernate
* MySQL
* React.js
* Exception Handling
* Layered Architecture
* API Testing with Postman

## 🎯 Future Improvements

* User authentication and authorization
* Expense filtering and searching
* Monthly and yearly expense reports
* Expense charts and dashboards
* Export expenses to PDF/Excel
* Improved authentication using Spring Security

## 👨‍💻 Author

**Gowri Shankar**

B.Tech | Java Full Stack

GitHub: `https://github.com/gowrishankar616`

## 📄 License

This project is created for learning and portfolio purposes.

