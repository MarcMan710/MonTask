# MonTask Backend API

This is the backend API for the MonTask application, built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication
- 📝 Input Validation
- 🔒 Password Hashing
- 🎯 Error Handling
- 📚 MongoDB Integration
- 🐳 Docker Support

## Prerequisites

- Node.js (v20 or higher)
- pnpm (v10 or higher)
- MongoDB (or Docker)

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/montask
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

## Development

Start the development server:
```bash
pnpm run dev
```

The server will start at http://localhost:5000

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Projects

#### Get All Projects
```http
GET /api/projects
Authorization: Bearer <token>
```

#### Create Project
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Project Name",
  "description": "Project Description"
}
```

### Tasks

#### Get All Tasks
```http
GET /api/tasks?projectId=<projectId>
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "projectId": "<projectId>",
  "status": "todo"
}
```

## Project Structure

```
backend/
├── config/           # Configuration files
│   └── config.js    # Environment variables
├── controllers/      # Route controllers
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
├── middleware/       # Custom middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/          # Database models
│   ├── userModel.js
│   ├── projectModel.js
│   └── taskModel.js
├── routes/          # API routes
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── server.js        # Entry point
└── package.json     # Dependencies
```

## Error Handling

The API uses a centralized error handling mechanism. All errors are processed through the error middleware and return a consistent response format:

```json
{
  "status": "error",
  "message": "Error message",
  "stack": "Error stack (development only)"
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Input validation using express-validator
- CORS enabled with configurable origins
- Environment variables for sensitive data

## Docker Support

Build and run the backend using Docker:

```bash
# Build the image
docker build -t montask-backend .

# Run the container
docker run -p 5000:5000 montask-backend
```

Or use Docker Compose from the root directory:

```bash
docker-compose up backend
```

## Testing

Run tests:
```bash
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License. 