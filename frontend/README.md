# MonTask Frontend

This is the frontend application for MonTask, built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time Updates
- 📱 Responsive Design
- 🎯 Drag-and-Drop Task Management
- 🔐 Protected Routes
- 🚀 Fast Development with Vite
- 🐳 Docker Support

## Prerequisites

- Node.js (v20 or higher)
- pnpm (v10 or higher)

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=http://localhost:5000/api
```

## Development

Start the development server:
```bash
pnpm run dev
```

The application will be available at http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable components
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── config/        # Configuration files
│   │   └── api.js
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   │   └── useAuth.js
│   ├── layouts/       # Layout components
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/         # Page components
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   └── Tasks.jsx
│   ├── services/      # API services
│   │   └── api.js
│   ├── styles/        # Global styles
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Root component
│   └── main.jsx       # Entry point
├── public/            # Public assets
└── index.html         # HTML template
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Components

### Authentication
- Login form with email/password
- Registration form
- Protected routes
- Authentication context

### Projects
- Project list view
- Project creation form
- Project details view
- Project management

### Tasks
- Task list with drag-and-drop
- Task creation form
- Task status management
- Task filtering and sorting

## State Management

The application uses React's built-in state management with hooks and context:

- `useAuth` - Authentication state
- `useProjects` - Projects state
- `useTasks` - Tasks state

## API Integration

API calls are handled through the `services/api.js` file, which includes:

- Axios instance configuration
- Request/response interceptors
- Authentication token management
- Error handling

## Styling

The application uses Tailwind CSS for styling with:

- Responsive design
- Dark mode support
- Custom components
- Utility-first approach

## Docker Support

Build and run the frontend using Docker:

```bash
# Build the image
docker build -t montask-frontend .

# Run the container
docker run -p 3000:3000 montask-frontend
```

Or use Docker Compose from the root directory:

```bash
docker-compose up frontend
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
