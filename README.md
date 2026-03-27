# Sessions Marketplace

This repository contains a full-stack implementation for **Sessions Marketplace**

The project demonstrates authentication, role-based access control,
session management, bookings, dashboards, and a minimal frontend.

---

## Features

### Backend
- JWT authentication
- Google OAuth login
- Role-based access (USER / CREATOR)
- Session marketplace
- Session booking system
- User & Creator dashboards
- Dockerized backend with PostgreSQL

### Frontend
- React (Vite) frontend
- JWT login and logout
- Sessions listing
- Session creation (CREATOR users)
- Booking flow

---

## Tech Stack

- Backend: Django, Django REST Framework
- Authentication: JWT (SimpleJWT), Google OAuth
- Database: PostgreSQL
- Frontend: React (Vite)
- Infrastructure: Docker, Docker Compose

---

## Project Structure

ahoum-assignment/
- backend/
  - users/
  - sessions/
  - bookings/
  - config/
  - Dockerfile
  - requirements.txt
  - .env.example
- frontend/
  - src/
  - package.json
- docker-compose.yml
- README.md

---

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose
- Node.js (for frontend)

---

## Backend Setup (Docker)

Clone the repository and move into the project directory:

git clone <repository-url>  
cd ahoum-assignment  

Create environment file:

cp backend/.env.example backend/.env  

Start backend and database:

docker-compose up --build  

In a new terminal, run migrations and create a superuser:

docker-compose exec backend python manage.py migrate  
docker-compose exec backend python manage.py createsuperuser  

Backend will be available at:

http://localhost:8000

Admin panel:

http://localhost:8000/admin/

---

## Frontend Setup

Move into the frontend directory:

cd frontend  

Install dependencies and start development server:

npm install  
npm run dev  

Frontend will be available at:

http://localhost:5173

---

## Authentication

JWT authentication is used.

Login endpoint:

POST /api/token/

Google OAuth login:

POST /api/users/google-login/

Logout is handled client-side by clearing the JWT token from localStorage.

---

## Sessions API

List public sessions:

GET /api/sessions/

Create session (CREATOR only):

POST /api/sessions/create/

---

## Bookings API

Book a session:

POST /api/bookings/book/<session_id>/

View my bookings:

GET /api/bookings/my/

View creator bookings:

GET /api/bookings/creator/

---

## Dashboards

User dashboard:

GET /api/users/dashboard/

Creator dashboard:

GET /api/sessions/creator/dashboard/

---

## Notes

- Environment variables are managed using a `.env` file
- Backend and PostgreSQL run fully inside Docker
- Frontend is intentionally minimal to demonstrate API integration
- This project is built for evaluation and learning purposes
