import React from 'react';
import { Navigate } from 'react-router-dom';

// import { useAuth } from '../../hooks/useAuth'; // Uncomment when useAuth is implemented

const ProtectedRoute = ({ element: ComponentElement, ...rest }) => {
  // const { isAuthenticated } = useAuth(); // Use this once useAuth is fully integrated
  const isAuthenticated = true; // Placeholder: Replace with actual auth check

  if (!isAuthenticated) {
    // Redirect them to the /auth page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth" replace />;
  }

  return ComponentElement;
};

export default ProtectedRoute;
