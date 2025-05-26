import React, { useState, useEffect } from 'react'; // Keep useState, useEffect
import TaskItem from '../components/features/tasks/TaskItem';
import { FaPlus } from 'react-icons/fa';
import UserProfileButton from '../components/layout/UserProfileButton';
// import { getTasks, getTaskSummary } from '../services/taskService'; // Example import

function Dashboard() {
  // --- Task State ---
  // In a real application, this data would be fetched from an API.
  // The initial state can be empty arrays or placeholder loading states.
  const [todaysTasks, setTodaysTasks] = useState([
    { id: 1, title: 'Morning Standup Meeting', description: 'Discuss daily progress.', dueDate: 'Today', status: 'Pending' },
    { id: 2, title: 'Work on Feature X', description: 'Implement the new user authentication flow.', dueDate: 'Today', status: 'In Progress' },
  ]);
  const [upcomingTasks, setUpcomingTasks] = useState([
    { id: 3, title: 'Client Demo Preparation', description: 'Prepare slides and demo script.', dueDate: 'Tomorrow', status: 'To Do' },
    { id: 4, title: 'Code Review for Feature Y', description: 'Review PR #123.', dueDate: 'Next Week', status: 'To Do' },
    { id: 5, title: 'Plan Q3 Roadmap', description: 'Outline key objectives for the next quarter.', dueDate: 'In 2 Weeks', status: 'To Do' },
  ]);
  // This could also be derived from a single 'allTasks' state
  const [allTasksForSummary, setAllTasksForSummary] = useState([
    // Initial summary tasks include today's and upcoming by default for the placeholder
    // Spread current initial values from the above useState calls for todaysTasks and upcomingTasks
    { id: 1, title: 'Morning Standup Meeting', description: 'Discuss daily progress.', dueDate: 'Today', status: 'Pending' },
    { id: 2, title: 'Work on Feature X', description: 'Implement the new user authentication flow.', dueDate: 'Today', status: 'In Progress' },
    { id: 3, title: 'Client Demo Preparation', description: 'Prepare slides and demo script.', dueDate: 'Tomorrow', status: 'To Do' },
    { id: 4, title: 'Code Review for Feature Y', description: 'Review PR #123.', dueDate: 'Next Week', status: 'To Do' },
    { id: 5, title: 'Plan Q3 Roadmap', description: 'Outline key objectives for the next quarter.', dueDate: 'In 2 Weeks', status: 'To Do' },
    // Additional tasks for summary
    { id: 6, title: 'Submit Expense Report', description: 'Last month expenses.', dueDate: 'Yesterday', status: 'Overdue' },
    { id: 7, title: 'Finalize Project Alpha', description: 'All tasks completed.', dueDate: 'Last Week', status: 'Completed' },
    { id: 8, title: 'Update Documentation', description: 'Reflect new API changes.', dueDate: 'Today', status: 'In Progress' },
    { id: 9, title: 'Onboard New Intern', description: 'Initial setup and intro.', dueDate: 'This Week', status: 'Completed' },
    { id: 10, title: 'Fix Critical Bug #789', description: 'Production issue reported.', dueDate: 'Yesterday', status: 'Overdue' },
    { id: 11, title: 'Research New Tech Stack', description: 'Explore options for next project.', dueDate: 'Next Month', status: 'To Do' },
  ]);

  // --- Data Fetching Effect ---
  useEffect(() => {
    // This effect would run once on component mount to fetch initial data.
    // console.log('Fetching task data from API...');
    // const loadTasks = async () => {
    //   try {
    //     // Example: Fetch all tasks for summary
    //     // const summaryData = await getTaskSummary(); // from taskService.js
    //     // setAllTasksForSummary(summaryData);

    //     // Example: Fetch today's and upcoming tasks separately or filter from all tasks
    //     // const todaysData = await getTasks({ type: 'today' }); // from taskService.js
    //     // setTodaysTasks(todaysData);
    //     // const upcomingData = await getTasks({ type: 'upcoming' }); // from taskService.js
    //     // setUpcomingTasks(upcomingData);

    //     // For now, we are using placeholder data initialized with useState.
    //     console.log('Using placeholder task data. API call examples are commented out.');
    //   } catch (error) {
    //     console.error('Failed to fetch tasks:', error);
    //     // Handle error state appropriately in UI
    //   }
    // };
    // loadTasks();

    // Correctly update allTasksForSummary if todaysTasks or upcomingTasks states change
    // This ensures the summary reflects the current state of these lists.
    // However, for the initial setup as per the prompt, we directly initialize allTasksForSummary
    // with the initial values of todaysTasks and upcomingTasks.
    // If setTodaysTasks or setUpcomingTasks were called later (e.g., after an API call),
    // a more robust solution would be to update allTasksForSummary accordingly,
    // or derive it directly from a single source of truth for all tasks.
    // For this step, the direct initialization of allTasksForSummary includes the placeholder data.
  }, []); // Empty dependency array means this runs once on mount

  // --- Task Summary Calculation ---
  // These could be memoized using useMemo if allTasksForSummary changes frequently
  // and the calculations were more complex.
  const completedCount = allTasksForSummary.filter(task => task.status === 'Completed').length;
  const inProgressCount = allTasksForSummary.filter(task => task.status === 'In Progress').length;
  const overdueCount = allTasksForSummary.filter(task => task.status === 'Overdue').length;

  // Mock current user - in a real app, this would come from auth context/state
  const currentUser = {
    name: 'Kemal Atmojo',
    email: 'kemal@example.com',
    avatarUrl: 'https://via.placeholder.com/40/007bff/FFFFFF?text=KA',
  };

  const handleQuickAddTask = () => {
    console.log('Quick Add Task button clicked. Implement modal/form opening here.');
  };

  const handleLogout = () => {
    console.log('User logged out');
    alert('Logout action triggered! (This is a mock action)');
  };

  return (
    <>
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <UserProfileButton user={currentUser} onLogout={handleLogout} />
        </header>

        <p className="mb-8 text-gray-600">Welcome to your dashboard! Here's a quick overview of your tasks.</p>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
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

        <button
          onClick={handleQuickAddTask}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center z-50 transition-transform duration-150 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Quick Add Task"
          title="Quick Add Task"
        >
          <FaPlus size={24} />
        </button>
    </>
  );
}

export default Dashboard;
