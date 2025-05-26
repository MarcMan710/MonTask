import React, { useState } from 'react';
// Assuming you have a signup function in your AuthContext
// import { useAuth } from '../../../contexts/AuthContext'; // Adjust the path as necessary

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // const { signup } = useAuth(); // Uncomment and use if you have signup in AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // In a real app, you would make an API call to your backend
      // to register the user.
      console.log('Attempting signup with:', { email, password });
      // Example: Simulate a successful signup
      // const result = await signup({ email, password });
      // if (!result.success) {
      //   // Handle signup failure (e.g., show error message from backend)
      //   setError(result.message || 'Signup failed.');
      // }
      // If successful, you might redirect the user or show a success message
      alert('Signup successful! (Simulated)'); // Replace with actual success handling
    } catch (err) {
      setError('An error occurred during signup.');
      console.error('Signup error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
        {/* Optional: Add a link back to the login page */}
        {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Already have an account? Login
        </a> */}
      </div>
    </form>
  );
};

export default SignupForm;
