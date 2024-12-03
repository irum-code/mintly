
# Mintly - Expense Tracker

Mintly is a web-based application for tracking personal expenses. This project uses **React** for the frontend and **Spring Boot** for the backend, offering a simple, intuitive user experience for managing daily expenses.

---

## Features

- **Add Expense**: Record new expenses with category, date, and amount.
- **Expense History**: View, edit, and delete expenses in a paginated table.
- **Dashboard**: Visualize expenses by category using bar charts.
- **RESTful APIs**: Backend powered by Spring Boot, integrated with a lightweight H2 database.

---

## Setup Instructions

### Prerequisites
- **Node.js** (for frontend)
- **Java 17+** (for backend)
- **Maven** (for dependency management)

### Frontend Setup
1. Navigate to the frontend directory:

   cd mintly-frontend



1. Install dependencies:
    
    
    npm install
    
    
2. Start the React development server:
    
    
    npm start
    
   
    

### Backend Setup

1. Navigate to the backend directory:
    
   
    cd mintly-backend
   
    
    
2. Build the project:
    
    
    mvn clean install
    
    
    
3. Run the application:
    
    
    ./mvnw spring-boot:run
    
   
    

### Accessing the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000/)
- **Backend**: [http://localhost:8080](http://localhost:8080/)

---

## API Endpoints

### Expense Management

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/expenses` | Fetch all expenses |
| POST | `/api/expenses` | Add a new expense |
| PUT | `/api/expenses/{id}` | Update an existing expense |
| DELETE | `/api/expenses/{id}` | Delete an expense |

---

## License

This project is licensed under the [MIT License](https://www.notion.so/LICENSE).
