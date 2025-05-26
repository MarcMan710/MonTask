import React, { useState, useEffect, useRef } from 'react';
import TaskItem from '../components/features/tasks/TaskItem';
import { FaPlus, FaUserCircle } from 'react-icons/fa'; // Import icons
import Sidebar from '../components/layout/Sidebar'; // Import the Sidebar component
import UserDropdown from '../components/layout/UserDropdown'; // Import the UserDropdown component

function Dashboard() {
  // Placeholder data for "Today's Tasks" and "Upcoming Tasks" sections
  const todaysTasks = [
    { id: 1, title: 'Morning Standup Meeting', description: 'Discuss daily progress.', dueDate: 'Today', status: 'Pending' },
    { id: 2, title: 'Work on Feature X', description: 'Implement the new user authentication flow.', dueDate: 'Today', status: 'In Progress' },
  ];

  const upcomingTasks = [
    { id: 3, title: 'Client Demo Preparation', description: 'Prepare slides and demo script.', dueDate: 'Tomorrow', status: 'To Do' },
    { id: 4, title: 'Code Review for Feature Y', description: 'Review PR #123.', dueDate: 'Next Week', status: 'To Do' },
    { id: 5, title: 'Plan Q3 Roadmap', description: 'Outline key objectives for the next quarter.', dueDate: 'In 2 Weeks', status: 'To Do' },
  ];

  // Placeholder data for the Task Summary.
  // In a real app, this would likely be derived from a comprehensive list of all tasks.
  // For demonstration, we're creating a separate list here.
  const allTasksForSummary = [
    ...todaysTasks,
    ...upcomingTasks,
    { id: 6, title: 'Submit Expense Report', description: 'Last month expenses.', dueDate: 'Yesterday', status: 'Overdue' },
    { id: 7, title: 'Finalize Project Alpha', description: 'All tasks completed.', dueDate: 'Last Week', status: 'Completed' },
    { id: 8, title: 'Update Documentation', description: 'Reflect new API changes.', dueDate: 'Today', status: 'In Progress' },
    { id: 9, title: 'Onboard New Intern', description: 'Initial setup and intro.', dueDate: 'This Week', status: 'Completed' },
    { id: 10, title: 'Fix Critical Bug #789', description: 'Production issue reported.', dueDate: 'Yesterday', status: 'Overdue' },
    { id: 11, title: 'Research New Tech Stack', description: 'Explore options for next project.', dueDate: 'Next Month', status: 'To Do' },
  ];

  const completedCount = allTasksForSummary.filter(task => task.status === 'Completed').length;
  const inProgressCount = allTasksForSummary.filter(task => task.status === 'In Progress').length;
  const overdueCount = allTasksForSummary.filter(task => task.status === 'Overdue').length;
  // Note: 'Pending' and 'To Do' could also be summarized if needed, e.g., as "Pending Tasks".

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container (button + menu)

  // Mock current user - in a real app, this would come from auth context/state
  const currentUser = {
    name: 'Kemal Atmojo',
    email: 'kemal@example.com',
    avatarUrl: 'https://via.placeholder.com/40/007bff/FFFFFF?text=KA', // Placeholder avatar URL
    // avatarUrl: null, // Test fallback
  };

  const handleQuickAddTask = () => {
    console.log('Quick Add Task button clicked. Implement modal/form opening here.');
    // In a real application, this would typically open a modal or navigate to a task creation form.
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    console.log('User logged out');
    setIsUserDropdownOpen(false);
    // Add actual logout logic (e.g., clear token, redirect to login page)
    alert('Logout action triggered! (This is a mock action)');
  };

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow ml-64 p-6"> {/* ml-64 matches sidebar width */}
        {/* Header Section with Title and User Avatar */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleUserDropdown}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              aria-expanded={isUserDropdownOpen}
              aria-haspopup="true"
              id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              {currentUser.avatarUrl ? (
                <img
                  className="h-10 w-10 rounded-full border-2 border-transparent hover:border-blue-400 transition-colors"
                  src={currentUser.avatarUrl}
                  alt="User avatar"
                />
              ) : (
                <FaUserCircle size={36} className="text-gray-500 hover:text-blue-500 transition-colors" />
              )}
            </button>
            {isUserDropdownOpen && (
              <UserDropdown user={currentUser} onLogout={handleLogout} />
            )}
          </div>
        </header>

        <p className="mb-8 text-gray-600">Welcome to your dashboard! Here's a quick overview of your tasks.</p>

        {/* Task Summary Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Task Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-green-700">Completed</h3>
              <p className="text-4xl font-bold text-green-800 mt-2">{completedCount}</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-blue-700">In Progress</h3>
              <p className="text-4xl font-bold text-blue-800 mt-2">{inProgressCount}</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-red-700">Overdue</h3>
              <p className="text-4xl font-bold text-red-800 mt-2">{overdueCount}</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"> {/* Increased mb for FAB spacing */}
          {/* Today's Tasks Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Today’s Tasks</h2>
            {todaysTasks.length > 0 ? (
              <div className="space-y-4">
                {todaysTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No tasks scheduled for today. Great job!</p>
            )}
          </section>

          {/* Upcoming Tasks Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upcoming Tasks</h2>
            {upcomingTasks.length > 0 ? (
              <div className="space-y-4">
                {upcomingTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming tasks. Looks like you're all caught up!</p>
            )}
          </section>
        </div>

        {/* You can add more dashboard widgets and content here */}

        {/* Quick Add Task FAB - its fixed positioning is relative to viewport */}
        <button
          onClick={handleQuickAddTask}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center z-50 transition-transform duration-150 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Quick Add Task"
          title="Quick Add Task"
        >
          <FaPlus size={24} />
        </button>
      </main>
    </div>
  );
}

export default Dashboard;
