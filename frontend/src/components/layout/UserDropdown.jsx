import React from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Uncomment if using React Router for navigation

const UserDropdown = ({ user, onLogout }) => {
  // If no user prop is passed, you might want to return null or a default state
  if (!user) {
    // This is a fallback, ideally the parent component ensures 'user' is always provided
    // or handles the case where there's no logged-in user (e.g., by not rendering the avatar button).
    return null;
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-md shadow-xl z-50 border border-gray-200 ring-1 ring-black ring-opacity-5">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-800 truncate">{user.name || 'User'}</p>
        <p className="text-xs text-gray-500 truncate">{user.email || 'No email'}</p>
      </div>
      <ul className="py-1">
        <li>
          {/* Replace <a> with <Link> from react-router-dom if you have routing setup */}
          <a
            href="/settings/profile" // In a real app, use Link to="/settings/profile"
            onClick={(e) => { e.preventDefault(); console.log('Navigate to Profile'); /* alert('Navigate to Profile'); */ }}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <FaUserCircle className="mr-3 text-gray-500" aria-hidden="true" /> Profile
          </a>
        </li>
        <li>
          <a
            href="/settings" // In a real app, use Link to="/settings"
            onClick={(e) => { e.preventDefault(); console.log('Navigate to Settings'); /* alert('Navigate to Settings'); */ }}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <FaCog className="mr-3 text-gray-500" aria-hidden="true" /> Settings
          </a>
        </li>
        <li>
          <button
            onClick={onLogout}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <FaSignOutAlt className="mr-3 text-gray-500" aria-hidden="true" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;