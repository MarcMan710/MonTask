# MonTask - Task Management Application

MonTask is a modern task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a comprehensive solution for managing projects and tasks with a beautiful and intuitive user interface.

## Features

- 🔐 User Authentication (Register, Login, Profile Management)
- 📋 Project Management
- ✅ Task Management with Drag-and-Drop
- 👥 Team Collaboration
- 📱 Responsive Design
- 🔒 Secure API with JWT Authentication
- 🐳 Docker Support

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Express Validator
- Bcrypt for Password Hashing

### Frontend
- React with Vite
- Tailwind CSS for Styling
- React Router for Navigation
- Axios for API Calls
- DnD Kit for Drag-and-Drop

## Prerequisites

- Node.js (v20 or higher)
- pnpm (v10 or higher)
- MongoDB (or Docker)
- Docker and Docker Compose (optional)

## Quick Start with Docker

1. Clone the repository:
```bash
git clone https://github.com/yourusername/montask.git
cd montask
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Manual Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file with the following variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/montask
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

4. Start the development server:
```bash
pnpm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file with the following variables:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
pnpm run dev
```

## Project Structure

```
montask/
├── backend/           # Backend API
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Custom middleware
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── server.js     # Entry point
│
├── frontend/         # Frontend application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── hooks/       # Custom hooks
│   │   ├── layouts/     # Layout components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   └── public/      # Static files
│
└── docker-compose.yml  # Docker configuration
```

## API Documentation

The API documentation is available at `/api-docs` when running the backend server.

### Main Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@montask.com or open an issue in the repository.