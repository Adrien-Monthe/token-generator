#  To-Do List Backend API

This is the **backend service** for the To-Do List application, built with **Node.js**, **Express**, and **PostgreSQL**. It provides RESTful APIs for user authentication and task management.

---

##  Features

- 🔐 JWT-based user authentication
- 🧾 CRUD operations for tasks
- 📁 Organized MVC structure
- 🛡️ Middleware for route protection
- 🌱 Sequelize ORM for database interaction
- 🌐 CORS-enabled for frontend integration

---

##  Project Structure

```
todoapp_be
├──src
│  ├── config/      
│  │   └── database.js            
│  ├── middleware/
│  │   └── auth.js  
│  ├── task/
│  │   ├── model/task.js
│  │   ├── controller/taskController.js
│  │   └── routes/taskRoutes.js              
│  ├── user/
│  │   ├── model/user.js
│  │   ├── controller/user.controller.js
│  │   └── routes/user.routes.js 
│  └── server.js
├── .env.example
├── Dockerfile 
└── package.json              
```

---

## ⚙️ Environment Setup

Create a `.env` file in the `backend/` folder:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
```

---

## 🔧 Installation & Run

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server (development mode)

```bash
npm run dev
```

The server will start on: `http://localhost:3000`

---

## 🐘 Database

This app uses **PostgreSQL**. Make sure your DB is up and running with the credentials provided in `.env`.

The tables will be created automatically using Sequelize `sync()`.

---

## 🛠️ API Endpoints

### 🔐 Auth (No Token Required)

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get JWT   |

---

### ✅ Tasks (Requires Token)

All task routes are protected using JWT middleware.

| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | `/api/tasks`              | Get all tasks            |
| GET    | `/api/tasks/:id`          | Get a single task        |
| POST   | `/api/tasks`              | Create a new task        |
| PUT    | `/api/tasks`              | Update a task            |
| PUT    | `/api/tasks/:id/complete` | Mark a task as completed |
| DELETE | `/api/tasks/:id`          | Delete a task            |

> Provide the token in the `Authorization` header:  
> `Authorization: Bearer <token>`

---

## 🐳 Docker Support

### 🏗️ Build & Run with Docker Compose

```bash
cd ..
docker-compose up --build
```

This will:
- Start the backend on `http://localhost:3000`
- Connect to the PostgreSQL service

Make sure to update `.env` for Docker DB credentials.

---

## 🔐 Authentication Middleware

Requests to `/api/tasks/*` require a valid JWT.  
Middleware file: `middleware/auth.js`

If the token is missing or invalid, it returns `401 Unauthorized`.

---

## ✅ Todo

- [x] JWT Authentication
- [x] Task CRUD
- [ ] Swagger Documentation
- [ ] Unit tests (Jest or Mocha)

---

## 🧑‍💻 Author

Created by **Adrien Monthe**

---