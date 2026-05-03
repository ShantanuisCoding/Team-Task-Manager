# Team Task Manager (Full Stack Assignment)

## 📌 Overview

This project is a full-stack Team Task Management application where users can create projects, assign tasks, and track progress with role-based access.

It is designed as a simplified collaboration tool similar to Trello/Asana, focusing on clean architecture and core functionality.

---

## 🚀 Live Application

* Frontend: [Link](https://team-task-manager-production-ab2f.up.railway.app/)
* Backend API: [Link](https://team-task-manager-production-dbef.up.railway.app/)

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* Axios
* React Router

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB (Mongoose)

**Authentication**

* JWT (JSON Web Token)
* Bcrypt (password hashing)

**Deployment**

* Railway

---

## ✨ Features

### 1. Authentication

* User signup and login
* Password hashing using bcrypt
* JWT-based authentication

### 2. Project Management

* Create projects
* Add/remove members
* Role-based access (Admin / Member)

### 3. Task Management

* Create tasks within projects
* Assign tasks to users
* Update task status:

  * Todo
  * In Progress
  * Done

### 4. Dashboard

* Total tasks
* Tasks by status
* Overdue tasks

---

## 🔐 Role-Based Access Control

**Admin**

* Create and manage projects
* Add or remove members
* Create, update, and delete tasks

**Member**

* View assigned tasks
* Update task status

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/ShantanuisCoding/Team-Task-Manager.git
cd team-task-manager
```

---

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints (Sample)

**Auth**

* POST `/api/auth/signup`
* POST `/api/auth/login`

**Projects**

* GET `/api/projects`
* POST `/api/projects`

**Tasks**

* GET `/api/tasks/:projectId`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

**Dashboard**

* GET `/api/dashboard`

---

## 📁 Project Structure

```
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 └── server.js

frontend/
 ├── src/
 │   ├── pages/
 │   ├── components/
 │   ├── services/
 │   └── App.jsx
```

---

## 🚀 Deployment

The application is deployed using Railway with separate services for backend and frontend.

### Backend Deployment

1. Push backend code to GitHub
2. Create a new project on Railway
3. Select "Deploy from GitHub repo"
4. Set the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Ensure start script in `package.json`:

```bash
npm start
```

---

### Frontend Deployment

1. Push frontend code to GitHub
2. Create a new project on Railway
3. Select frontend directory
4. Add environment variable:

```env
VITE_API_URL=https://your-backend-url/api
```

5. Build and start commands:

```bash
npm install && npm run build
npm run preview
```

---

### Notes

* Backend uses dynamic port (`process.env.PORT`)
* Frontend communicates with backend using environment variables
* CORS is enabled to allow frontend-backend interaction

---

## 🎥 Demo Video

[Link](https://drive.google.com/file/d/1qacS6okhyaXYzQRliJC6ftHclb2FF5m5/view?usp=sharing)

---

## 💡 Key Design Decisions

* JWT used for stateless authentication
* Role-based access implemented at project level
* Separate frontend and backend for scalability
* RESTful API design for simplicity and clarity

---

## 🚧 Future Improvements

* Optimistic UI updates
* Improved UI/UX design
* Pagination and filtering
* Real-time updates using WebSockets

---

## 👤 Author

Shantanu
