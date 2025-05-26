import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
// The old inline MainLayout const definition should be removed.

// --- Page Components (Lazy Loaded) ---
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TaskManagement = React.lazy(() => import('./pages/TaskManagement'));
const CalendarView = React.lazy(() => import('./pages/CalendarView'));
const ProjectBoards = React.lazy(() => import('./pages/ProjectBoards'));
const TeamMembers = React.lazy(() => import('./pages/TeamMembers'));
const SettingsProfile = React.lazy(() => import('./pages/SettingsProfile'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// --- Loading Fallback ---
const LoadingFallback = () => <div>Loading page...</div>;

function App() {
  // Placeholder for authentication status. In a real app, this would come
  // from an authentication context or state management (e.g., useAuth() hook).
  // This will be used by ProtectedRoute internally for now.
  // const isAuthenticated = true; // This line can be removed as ProtectedRoute handles it

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public route for authentication */}
          {/* This route should ideally also prevent access if already authenticated */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes using DashboardLayout */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute 
                element={<DashboardLayout><Navigate to="/dashboard" replace /></DashboardLayout>} 
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute 
                element={<DashboardLayout><Dashboard /></DashboardLayout>} 
              />
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute 
                element={<DashboardLayout><TaskManagement /></DashboardLayout>} 
              />
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute 
                element={<DashboardLayout><CalendarView /></DashboardLayout>} 
              />
            } 
          />
          <Route 
            path="/projects" 
            element={
              <ProtectedRoute 
                element={<DashboardLayout><ProjectBoards /></DashboardLayout>} 
              />
            } 
          />
          <Route 
            path="/team" 
            element={
              <ProtectedRoute 
                element={<DashboardLayout><TeamMembers /></DashboardLayout>} 
              />
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute 
                element={<DashboardLayout><SettingsProfile /></DashboardLayout>} 
              />
            } 
          />

          {/* Catch-all 404 Not Found route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
