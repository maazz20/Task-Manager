# Task Manager Application

A full stack Task Manager application built using:

- Spring Boot
- MySQL
- React
- Tailwind CSS

This application allows users to:
- Register/Login
- Create tasks
- View tasks
- Mark tasks as completed
- Delete tasks
- Track due dates

---

# Tech Stack

## Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- Hibernate
- Maven

## Frontend
- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS

---

# Features

## Authentication
- User Registration
- User Login
- BCrypt Password Encryption
- User Session using localStorage

## Task Management
- Create Tasks
- View User-Specific Tasks
- Mark Tasks as Completed
- Delete Tasks
- Due Date Tracking

## Frontend Features
- Dashboard UI
- Dynamic Rendering
- React Routing
- Logout Functionality
- Responsive Layout

## Backend Features
- REST APIs
- Layered Architecture
- DTOs
- Validation
- Exception Handling
- JPA Relationships

---

# Project Structure

## Backend Structure

src/main/java/project/taskManager

├── controller
├── service
├── repository
├── entity
├── dto
├── config
├── exception

---

## Frontend Structure

src

├── pages
├── services
├── components

---

# API Endpoints

## Authentication APIs

### Register User
POST /auth/register

### Login User
POST /auth/login

---

## Task APIs

### Create Task
POST /tasks

### Get Tasks By User
GET /tasks/{userId}

### Update Task
PUT /tasks/{id}

### Mark Task Completed
PATCH /tasks/{id}/complete

### Delete Task
DELETE /tasks/{id}

---

# Database Schema

## Users Table

| Column | Type |
|---|---|
| id | Long |
| name | String |
| email | String |
| password | String |

---

## Task Table

| Column | Type |
|---|---|
| id | Long |
| title | String |
| description | String |
| status | String |
| dueDate | LocalDate |
| user_id | FK |

---

# Installation & Setup

## Backend Setup

### 1. Clone Repository

```bash
git clone <repository-url>
