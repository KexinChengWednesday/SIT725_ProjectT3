# SIT725 Task 8.2HD GoPick – Dockerised End-to-End Application #


## 1. Project Overview

GoPick is a shopping web application developed as part of a group project for SIT725.  
This repository contains an **individually dockerised end-to-end version** of the application, prepared as an **individual submission for SIT725 Task 8.2HD**.

The purpose of this repository is to demonstrate my personal ability to containerise a complete web application using Docker, including backend services, frontend rendering, and database integration.

**Note:**  
This Task 8.2HD submission was completed before the commencement of Sprint 2 of the group project.  
Therefore, it does not represent the final version of the group application.  
However, the version included in this repository already contains functional frontend and backend components, as well as database-backed features, and is sufficient to meet the practical requirements of Docker-based end-to-end deployment.

---

## 2. Branch Information

The default branch of this repository is **`kexin-docker`**.

This branch contains the fully dockerised version of the application and should be used for running and assessing the project for **SIT725 Task 8.2HD**.

---

## 3. Prerequisites

The following software is required to run this application:

- Docker Desktop (with Docker Compose v2)
- Git

No local installation of Node.js or MongoDB is required, as all dependencies are managed within Docker containers.

---

## 4. How to Run the Application (Docker)

### Step 1: Clone the repository

```bash
git clone https://github.com/KexinChengWednesday/SIT725_ProjectT3.git
cd SIT725_ProjectT3
```

### Step 2: Build and start the containers

```bash
docker compose up --build
```

This command builds the Docker images and starts both the application server and the MongoDB service.  
Please keep this terminal window running while the application is in use.

### Step 3: Seed initial data (run in a new terminal)

Open a new terminal window and navigate to the project directory:

```bash
cd SIT725_ProjectT3
docker compose exec app npm run seeddb
```

This step initialises sample data in MongoDB and must be executed **after** the containers are running.

### Step 4: Access the application

Open a web browser and navigate to:

```
http://localhost:3000
```

---

## 5. Student Identification Endpoint

To uniquely identify this individual submission, the following REST API endpoint has been implemented:

GET /api/student


Access via browser:

```
http://localhost:3000/api/student
```

Expected response:

```json
{
  "name": "Kexin Cheng",
  "studentId": "s224384754"
}
```

---

## 6. Database Functionality Verification

This application includes database-backed functionality implemented using MongoDB.

### Verification Steps

1. Open the application homepage.
2. Navigate to the **FAQ** page using the navigation menu.
3. At the bottom of the FAQ page, locate the feedback submission form.
4. Submit a feedback entry (input validation applies, such as non-empty message and valid email format).
5. Access the following API endpoint to retrieve stored feedback records:
GET /api/faq/faq-feedback

```
http://localhost:3000/api/faq/faq-feedback
```

The returned JSON response includes the newly submitted feedback entry, confirming that data has been successfully written to and read from MongoDB within the Dockerised environment.

**Note:**  
As this version of the application predates the final group project release, the database verification demonstrated here focuses on the FAQ feedback functionality, which corresponds to my individual development contribution involving MongoDB integration.

---

## 7. Submission Evidence

Screenshots demonstrating:
- The application running in Docker  
- The `/api/student` endpoint response  
- Successful database-backed functionality  

are included in the submitted PDF for **SIT725 Task 8.2HD**.
