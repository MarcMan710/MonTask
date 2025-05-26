import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import UserDropdown from './UserDropdown'; // The existing menu component

const UserProfileButton = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Centralized logout handler for this component
  const handleLogout = () => {
    setIsDropdownOpen(false); // Close dropdown first
    if (onLogout) {
      onLogout(); // Call the passed-in onLogout prop
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    // Or render a login button, or null, depending on desired behavior
    return <div className="text-gray-500">Loading user...</div>; 
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        id="user-menu-button" // Consider making ID more unique if multiple instances
      >
        <span className="sr-only">Open user menu</span>
        {user.avatarUrl ? (
          <img
            className="h-10 w-10 rounded-full border-2 border-transparent hover:border-blue-400 transition-colors"
            src={user.avatarUrl}
            alt="User avatar"
          />
        ) : (
          <FaUserCircle size={36} className="text-gray-500 hover:text-blue-500 transition-colors" />
        )}
      </button>
      {isDropdownOpen && (
        <UserDropdown user={user} onLogout={handleLogout} /> // Pass the new handleLogout
      )}
    </div>
  );
};

export default UserProfileButton;
