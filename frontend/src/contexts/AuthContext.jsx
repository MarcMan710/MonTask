import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // In a real application, you would check localStorage, cookies,
  // or make an API call here to determine the initial auth state.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user details if needed

  // Example: Check for a token in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd validate the token with your backend
      // and fetch user details. For this example, we'll just assume
      // the presence of a token means authenticated.
      setIsAuthenticated(true);
      // setUser(... fetch user details ...);
    }
  }, []);

  const login = async (credentials) => {
    // In a real app, you would make an API call to your backend
    // to authenticate the user.
    console.log('Attempting login with:', credentials);
    // Example: Simulate a successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeToken = 'fake-auth-token'; // Replace with actual token from backend
        localStorage.setItem('authToken', fakeToken);
        setIsAuthenticated(true);
        setUser({ name: 'Test User' }); // Replace with actual user data
        console.log('Login successful');
        resolve({ success: true });
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    // In a real app, you would clear the token from localStorage/cookies
    // and potentially invalidate the session on the backend.
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
    console.log('Logged out');
  };

  // You might also add a signup function here

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
