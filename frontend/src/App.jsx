import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// --- Layouts ---
// This is a conceptual MainLayout. You would create this component in, for example,
// src/components/layout/MainLayout.jsx or src/layouts/MainLayout.jsx
// It would typically include common UI elements like Navbar, Sidebar, etc.
const MainLayout = ({ children }) => (
  <div>
    {/* Example: <Navbar /> */}
    <main>{children}</main>
    {/* Example: <Footer /> */}
  </div>
);

// --- Page Components (Lazy Loaded) ---
// This improves initial load time by only loading the code for the page when it's needed.
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TaskManagement = React.lazy(() => import('./pages/TaskManagement'));
const CalendarView = React.lazy(() => import('./pages/CalendarView'));
const ProjectBoards = React.lazy(() => import('./pages/ProjectBoards'));
const TeamMembers = React.lazy(() => import('./pages/TeamMembers'));
const SettingsProfile = React.lazy(() => import('./pages/SettingsProfile'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage')); // You'll need to create this page

// --- Loading Fallback ---
// Displayed while lazy-loaded components are being fetched.
const LoadingFallback = () => <div>Loading page...</div>;

function App() {
  // Placeholder for authentication status. In a real app, this would come
  // from an authentication context or state management (e.g., useAuth() hook).
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public route for authentication */}
          <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" replace />} />

          {/* Routes that use the MainLayout and might require authentication */}
          {/* A more robust solution would involve a <ProtectedRoute> component */}
          <Route path="/" element={isAuthenticated ? <MainLayout><Navigate to="/dashboard" replace /></MainLayout> : <Navigate to="/auth" replace />} />
          <Route path="/dashboard" element={isAuthenticated ? <MainLayout><Dashboard /></MainLayout> : <Navigate to="/auth" replace />} />
          <Route path="/tasks" element={isAuthenticated ? <MainLayout><TaskManagement /></MainLayout> : <Navigate to="/auth" replace />} />
          <Route path="/calendar" element={isAuthenticated ? <MainLayout><CalendarView /></MainLayout> : <Navigate to="/auth" replace />} />
          <Route path="/projects" element={isAuthenticated ? <MainLayout><ProjectBoards /></MainLayout> : <Navigate to="/auth" replace />} />
          <Route path="/team" element={isAuthenticated ? <MainLayout><TeamMembers /></MainLayout> : <Navigate to="/auth" replace />} />
          <Route path="/settings" element={isAuthenticated ? <MainLayout><SettingsProfile /></MainLayout> : <Navigate to="/auth" replace />} />

          {/* Catch-all 404 Not Found route */}
          {/* You would create NotFoundPage.jsx in src/pages/ */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
