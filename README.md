# Task Management App

A full-stack task management application built with the MERN stack.  
Users can register, log in, and manage their tasks with a clean and modern UI.

---

## Features

- User authentication (JWT)
- Register and login
- Protected routes
- Create tasks
- View tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed / pending
- Clean UI with Tailwind CSS

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

---

## Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── package.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/arkharashi/task-management-app.git
cd task-management-app
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login

### Tasks

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

---

## Future Improvements

- Task filtering
- Search functionality
- Dark mode
- UI animations
- Drag & drop tasks

---

## Author

- Abdulrahman
