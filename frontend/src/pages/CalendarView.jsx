import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button'; // Assuming Button component path
import { FaSun, FaMoon } from 'react-icons/fa'; // Icons for the toggle
import TaskItem from '../components/features/tasks/TaskItem'; // Import TaskItem

// Placeholder task data - in a real app, this would come from an API or global state
const allTasks = [
  { id: 1, title: 'Monthly Report Submission', description: 'Finalize and submit the report.', dueDate: '2024-03-28', status: 'To Do', category: 'Documentation' },
  { id: 2, title: 'Team Meeting - March Review', description: 'Discuss monthly progress.', dueDate: '2024-03-15', status: 'Completed', category: 'Meeting' },
  { id: 3, title: 'Weekly Sync - Project Alpha', description: 'Update on Project Alpha tasks.', dueDate: '2024-03-04', status: 'To Do', category: 'Meeting' }, // Assuming current week is around Mar 4-10 for demo
  { id: 4, title: 'Client Call - Project Beta', description: 'Discuss new requirements.', dueDate: '2024-03-07', status: 'In Progress', category: 'Client Relations' }, // Assuming current week
  { id: 5, title: 'Plan April Activities', description: 'Outline tasks for next month.', dueDate: '2024-03-25', status: 'To Do', category: 'Planning' },
  { id: 6, title: 'Fix Bug #123', description: 'Critical bug in payment module.', dueDate: '2024-04-02', status: 'To Do', category: 'Development' },
  { id: 7, title: 'Design User Profile Page', description: 'Mockups for new profile page.', dueDate: '2024-03-06', status: 'To Do', category: 'Design' }, // Assuming current week
  { id: 8, title: 'Write API Documentation', description: 'Document new endpoints.', dueDate: '2024-02-20', status: 'Completed', category: 'Documentation' }, // Previous month
];

function CalendarView() {
  const [viewMode, setViewMode] = useState('monthly'); // 'monthly' or 'weekly'
  const [tasksForView, setTasksForView] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
    // In a real app, this would open a modal to view/edit task details
    alert(`Viewing details for: ${task.title}\n(Implement task detail view/modal here)`);
  };

  const handleAddNewTask = () => {
    console.log('Add new task button clicked for current view:', viewMode);
    // In a real app, this would open a modal or form to add a new task, potentially pre-filling date based on view.
    alert(`Adding new task for ${viewMode} view.\n(Implement add task form/modal here)`);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-11

    if (viewMode === 'monthly') {
      const monthTasks = allTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getFullYear() === currentYear && taskDate.getMonth() === currentMonth;
      });
      setTasksForView(monthTasks);
    } else if (viewMode === 'weekly') {
      const currentDay = today.getDay(); // 0 (Sun) - 6 (Sat)
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - currentDay));
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

      const weekTasks = allTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
      });
      setTasksForView(weekTasks);
    }
  }, [viewMode]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);


  // Helper function to render the calendar grid
  const renderCalendarGrid = () => {
    const today = new Date(); // Base for current date context
    const currentActualDate = new Date(); // For 'isToday' comparison
    const isDark = theme === 'dark';

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (viewMode === 'monthly') {
      const year = today.getFullYear();
      const month = today.getMonth(); // 0-11

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      // getDay() returns 0 for Sunday, 1 for Monday, etc.
      const firstDayOfMonthStartOffset = new Date(year, month, 1).getDay();

      let dayCells = [];

      // Blank cells before the first day of the month
      for (let i = 0; i < firstDayOfMonthStartOffset; i++) {
        dayCells.push(<div key={`blank-start-${i}`} className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 h-24 sm:h-28"></div>);
      }

      // Cells for each day of the month
      for (let d = 1; d <= daysInMonth; d++) {
        const isCurrentDay = d === currentActualDate.getDate() && month === currentActualDate.getMonth() && year === currentActualDate.getFullYear();
        dayCells.push(
          <div key={`day-${d}`} className={`border border-gray-200 dark:border-gray-700 p-2 h-24 sm:h-28 overflow-hidden ${isCurrentDay ? (isDark ? 'bg-blue-700 ring-2 ring-blue-500' : 'bg-blue-100 ring-2 ring-blue-300') : (isDark ? 'bg-gray-900 hover:bg-gray-700' : 'bg-white hover:bg-gray-50')}`}>
            <span className={`text-sm font-medium ${isCurrentDay ? (isDark ? 'text-blue-300' : 'text-blue-600') : (isDark ? 'text-gray-300' : 'text-gray-700')}`}>{d}</span>
            {/* Placeholder for tasks/events on this day */}
            {/* <div className="text-xs mt-1 text-gray-500">Event...</div> */}
          </div>
        );
      }
      // Blank cells after the last day of the month to fill the grid
      const totalCells = firstDayOfMonthStartOffset + daysInMonth;
      const remainingCells = (7 - (totalCells % 7)) % 7;
      for (let i = 0; i < remainingCells; i++) {
        dayCells.push(<div key={`blank-end-${i}`} className="border border-gray-200 bg-gray-50 p-2 h-24 sm:h-28"></div>);
      }

      return (
        <div className="mt-6 bg-gray-200 dark:bg-gray-700 shadow-lg rounded-md">
          <div className="grid grid-cols-7">
            {dayHeaders.map(header => (
              <div key={header} className="text-center font-semibold py-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">{header}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px "> {/* Removed bg-gray-200 from here, parent has it */}
            {dayCells}
          </div>
        </div>
      );

    } else if (viewMode === 'weekly') {
      let weekDayCells = [];
      let startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday of the current week

      for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek);
        const isCurrentDay = dayDate.getDate() === currentActualDate.getDate() && dayDate.getMonth() === currentActualDate.getMonth() && dayDate.getFullYear() === currentActualDate.getFullYear();
        weekDayCells.push(
          <div key={`weekday-${i}`} className={`border border-gray-200 dark:border-gray-700 p-2 h-48 sm:h-64 overflow-hidden ${isCurrentDay ? (isDark ? 'bg-blue-700 ring-2 ring-blue-500' : 'bg-blue-100 ring-2 ring-blue-300') : (isDark ? 'bg-gray-900 hover:bg-gray-700' : 'bg-white hover:bg-gray-50')}`}>
            <span className={`text-sm font-medium ${isCurrentDay ? (isDark ? 'text-blue-300' : 'text-blue-600') : (isDark ? 'text-gray-300' : 'text-gray-700')}`}>{dayHeaders[i]} {dayDate.getDate()}</span>
            {/* Placeholder for tasks/events, potentially with hourly slots */}
          </div>
        );
        startOfWeek.setDate(startOfWeek.getDate() + 1);
      }
      return <div className="mt-6 grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 shadow-lg rounded-md">{weekDayCells}</div>;
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Calendar View</h1>
        <div className="flex items-center space-x-2">
          <Button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
          </Button>
          <div className="flex space-x-1"> {/* Wrapped view toggles for better grouping if needed */}
            <Button
              onClick={() => handleViewToggle('monthly')}
              className={`px-3 py-1.5 text-sm rounded ${viewMode === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              Monthly
            </Button>
            <Button
              onClick={() => handleViewToggle('weekly')}
              className={`px-3 py-1.5 text-sm rounded ${viewMode === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              Weekly
            </Button>
          </div>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300">
        Displaying: <span className="font-semibold">{viewMode === 'monthly' ? 'Monthly View' : 'Weekly View'}</span>
      </p>

      {/* Calendar Grid Placeholder */}
      {renderCalendarGrid()}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">This is a visual placeholder for the calendar grid. A full calendar component would offer more interactivity.</p>
      
      {/* Tasks shown by due date section */}
      <section className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Tasks Due This {viewMode === 'monthly' ? 'Month' : 'Week'}
          </h2>
          <Button
            onClick={handleAddNewTask}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded"
          >
            Add New Task
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Click on a task to view its details.</p>
        {tasksForView.length > 0 ? (
          <div className="space-y-4">
            {tasksForView.map(task => (
              <div key={task.id} onClick={() => handleTaskClick(task)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                <TaskItem task={task} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No tasks due in this period.</p>
        )}
      </section>
    </div>
  );
}

export default CalendarView;
