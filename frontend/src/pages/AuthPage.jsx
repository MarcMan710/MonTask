import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FaGoogle, FaGithub } from 'react-icons/fa';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); // true for Login, false for Sign Up
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    // Add your login logic here
    console.log('Login attempt with:', { email, password });
    // Example: call an API, dispatch an action, etc.
    setTimeout(() => { // Simulate API call
      setIsLoading(false);
      if (email === "test@example.com" && password === "password") {
        setSuccessMessage('Login successful! Redirecting...');
        // Add redirection logic here
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }, 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    // Add your signup logic here
    console.log('Signup attempt with:', { email, password });
    // Example: call an API, dispatch an action, etc.
    setTimeout(() => { // Simulate API call
      setIsLoading(false);
      // Simulate a successful signup for demonstration
      setSuccessMessage('Signup successful! Please check your email to verify.');
      // setError('This email is already registered.'); // Example error
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setError(''); setSuccessMessage('');
    // Add your Google OAuth logic here
    console.log('Attempting Google Login');
    // Example: redirect to Google OAuth endpoint or use a library
  };

  const handleGitHubLogin = () => {
    setError(''); setSuccessMessage('');
    // Add your GitHub OAuth logic here
    console.log('Attempting GitHub Login');
    // Example: redirect to GitHub OAuth endpoint or use a library
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setError(''); // Clear errors when toggling mode
    setSuccessMessage(''); // Clear success messages
    // Optionally reset email and password fields
    // setEmail('');
    // setPassword('');
  };

  // Clear messages when input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error || successMessage) { setError(''); setSuccessMessage(''); }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error || successMessage) { setError(''); setSuccessMessage(''); }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">{isLoginMode ? 'Login' : 'Sign Up'}</h1>
        
        {/* Email/Password Form */}
        <form className="space-y-4" onSubmit={isLoginMode ? handleLogin : handleSignup}>
          {/* Error Message Display */}
          {error && (
            <div className="p-3 mb-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300" role="alert">
              {error}
            </div>
          )}
          {/* Success Message Display */}
          {successMessage && (
            <div className="p-3 mb-3 text-sm text-green-700 bg-green-100 rounded-lg border border-green-300" role="alert">
              {successMessage}
            </div>
          )}

          <Input // Keep existing Input for email
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
            aria-label="Email Address"
            disabled={isLoading}
          />
          <Input // Keep existing Input for password
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            aria-label="Password"
            disabled={isLoading}
          />
          <div className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className={`w-full text-white ${isLoginMode ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'} font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isLoginMode ? 'Login' : 'Sign Up')}
            </Button>
          </div>
        </form>

        {/* Toggle between Login and Sign Up */}
        <div className="mt-6 text-center">
          <button onClick={toggleMode} className="text-sm text-blue-500 hover:text-blue-700 hover:underline focus:outline-none">
            {isLoginMode
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </button>
        </div>

        {/* OAuth Separator */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4 mt-4">
          <Button onClick={handleGoogleLogin} className={`w-full bg-red-500 hover:bg-red-700 text-white flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
            <FaGoogle className="text-lg" />
            <span className="ml-2">Sign in with Google</span>
          </Button>
          <Button onClick={handleGitHubLogin} className={`w-full bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
            <FaGithub className="text-lg" />
            <span className="ml-2">Sign in with GitHub</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
