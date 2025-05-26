import React from 'react';
import { FaHome, FaTasks, FaCalendarAlt, FaUsers, FaCog } from 'react-icons/fa';
// import { Link, useLocation } from 'react-router-dom'; // Uncomment if using React Router

const Sidebar = () => {
  // const location = useLocation(); // Uncomment if using React Router for active state

  const navItems = [
    { name: 'Home', icon: <FaHome size={20} />, path: '/dashboard' },
    { name: 'Tasks', icon: <FaTasks size={20} />, path: '/tasks' },
    { name: 'Calendar', icon: <FaCalendarAlt size={20} />, path: '/calendar' },
    { name: 'Teams', icon: <FaUsers size={20} />, path: '/teams' },
    { name: 'Settings', icon: <FaCog size={20} />, path: '/settings/profile' },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-gray-100 flex flex-col p-4 shadow-lg z-40">
      <div className="text-2xl font-bold mb-10 px-2 py-3 border-b border-gray-700">
        MonTask
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              {/* Replace <a> with <Link> from react-router-dom if you have routing setup */}
              <a
                href={item.path} // In a real app, use Link to={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`Navigate to ${item.path}`);
                  // For demo: alert(`Navigating to ${item.name}`);
                }}
                className={`flex items-center py-2.5 px-3 rounded-md text-sm hover:bg-gray-700 hover:text-white transition-colors duration-150 ease-in-out
                  ${false /* location.pathname === item.path ? 'bg-gray-700 text-white' : '' */}`} // Basic active state example
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">© {new Date().getFullYear()} MonTask</p>
      </div>
    </div>
  );
};

export default Sidebar;