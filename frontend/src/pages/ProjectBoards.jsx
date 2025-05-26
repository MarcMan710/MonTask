import React, { useState } from 'react';

// Mock user data (in a real app, this would come from an API or global state)
const mockUsers = [
  { id: 'u1', name: 'Alice Wonderland' },
  { id: 'u2', name: 'Bob The Builder' },
  { id: 'u3', name: 'Charlie Brown' },
  { id: 'u4', name: 'Diana Prince' },
];

// Define project categories and their styles
const projectCategories = {
  WORK: { name: 'Work', classes: 'bg-blue-100 text-blue-700 border border-blue-300' },
  PERSONAL: { name: 'Personal', classes: 'bg-green-100 text-green-700 border border-green-300' },
  STUDY: { name: 'Study', classes: 'bg-yellow-100 text-yellow-700 border border-yellow-300' },
  URGENT: { name: 'Urgent', classes: 'bg-red-100 text-red-700 border border-red-300' },
};

function ProjectBoards() {
  const [projects, setProjects] = useState([
    // Sample initial projects (can be removed or fetched from an API)
    {
      id: 1,
      name: 'MonTask Frontend Development',
      tasks: [
        { id: 100, title: 'Implement Login Page', status: 'Completed' },
        { id: 101, title: 'Design Dashboard', status: 'In Progress' },
        { id: 102, title: 'Setup User Profile', status: 'To Do' },
      ],
      assignedUsers: ['u1'],
      category: 'WORK', // Added category
    },
    {
      id: 2,
      name: 'API Integration for MonTask',
      tasks: [{ id: 201, title: 'Setup initial API routes', status: 'Completed' }],
      assignedUsers: ['u1', 'u2'],
      category: 'WORK', // Added category
    },
  ]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState(Object.keys(projectCategories)[0]); // Default to the first category
  const [newTaskInputs, setNewTaskInputs] = useState({}); // Stores task input for each project: { projectId: 'task text' }
  const [selectedUserForProject, setSelectedUserForProject] = useState({}); // { projectId: 'userIdToAssign' }

  const handleProjectInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  const handleProjectCategoryChange = (event) => {
    setNewProjectCategory(event.target.value);
  };

  const handleTaskInputChange = (projectId, value) => {
    setNewTaskInputs(prev => ({ ...prev, [projectId]: value }));
  };

  const handleUserSelectionChange = (projectId, userId) => {
    setSelectedUserForProject(prev => ({ ...prev, [projectId]: userId }));
  };


  const handleAddProject = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    if (newProjectName.trim() === '') {
      alert('Project name cannot be empty.');
      return;
    }
    const newProject = {
      id: Date.now(), // Simple unique ID generator
      name: newProjectName.trim(),
      tasks: [], // Initialize with an empty tasks array
      assignedUsers: [], // Initialize with an empty assigned users array
      category: newProjectCategory, // Assign selected category
    };
    setProjects([...projects, newProject]);
    setNewProjectName(''); // Clear the input field
    setNewProjectCategory(Object.keys(projectCategories)[0]); // Reset category to default
  };

  const handleAddTask = (event, projectId) => {
    event.preventDefault();
    const taskTitle = (newTaskInputs[projectId] || '').trim();

    if (taskTitle === '') {
      alert('Task title cannot be empty.');
      return;
    }

    const newTask = {
      id: Date.now() + Math.random(), // More unique ID for tasks
      title: taskTitle,
      status: 'To Do', // Default status for new tasks
    };

    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.id === projectId ? { ...p, tasks: [...p.tasks, newTask] } : p
      )
    );
    setNewTaskInputs(prev => ({ ...prev, [projectId]: '' })); // Clear task input for this project
  };

  const handleAssignUserToProject = (event, projectId) => {
    event.preventDefault();
    const userIdToAssign = selectedUserForProject[projectId];

    if (!userIdToAssign) {
      alert('Please select a user to assign.');
      return;
    }

    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id === projectId) {
          // Ensure user is not already assigned (though dropdown should prevent this)
          if (!p.assignedUsers.includes(userIdToAssign)) {
            return { ...p, assignedUsers: [...p.assignedUsers, userIdToAssign] };
          }
        }
        return p;
      })
    );
    setSelectedUserForProject(prev => ({ ...prev, [projectId]: '' })); // Clear the selection for this project
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Project Boards</h1>
      <p className="text-lg text-gray-700 mb-6">Create and manage projects.</p>

      {/* Form to add a new project */}
      <form onSubmit={handleAddProject} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="text"
            value={newProjectName}
            onChange={handleProjectInputChange}
            placeholder="Enter new project name"
            className="border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={newProjectCategory}
            onChange={handleProjectCategoryChange}
            className="border border-gray-300 rounded-md sm:rounded-none px-4 py-2 w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(projectCategories).map(([key, cat]) => (
              <option key={key} value={key}>{cat.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none w-full sm:w-auto"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-r"
          >
            Add Project
          </button>
        </div>
      </form>

      {/* Display existing projects */}
      <h2 className="text-2xl font-semibold mb-4">Existing Projects</h2>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => {
            // Calculate progress
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(task => task.status === 'Completed').length;
            // Ensure progress is not NaN if totalTasks is 0
            const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            const categoryDetails = projectCategories[project.category] || { name: project.category, classes: 'bg-gray-100 text-gray-700 border border-gray-300' };

            return ( // Added hover effects and transition
            <div key={project.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in-out">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-semibold text-gray-800 mr-2 break-words">{project.name}</h3> {/* Project Name */}
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${categoryDetails.classes}`}>
                  {categoryDetails.name}
                </span>
              </div>

              {/* Progress Bar Section */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-blue-700">Project Progress</span>
                  <span className="text-xs font-medium text-blue-700">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-grow"> {/* This div will allow the content below to push the "Assign Users" to the bottom if cards have varying content height */}
                {/* Form to add a new task to this project */}
                <form onSubmit={(e) => handleAddTask(e, project.id)} className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newTaskInputs[project.id] || ''}
                      onChange={(e) => handleTaskInputChange(project.id, e.target.value)}
                      placeholder="Add a new task..."
                      className="border border-gray-300 rounded-l px-3 py-2 text-sm w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-2 text-sm rounded-r"
                    >
                      Add Task
                    </button>
                  </div>
                </form>

                {/* Display tasks for this project */}
                <div className="mt-2 mb-4"> {/* Added mb-4 for spacing */}
                  <h4 className="text-md font-medium text-gray-700 mb-2">Tasks:</h4>
                  {project.tasks.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 pl-4 max-h-32 overflow-y-auto"> {/* Added max-h and overflow for long task lists */}
                      {project.tasks.map(task => {
                        // Future: Add onClick to change task status or view details
                        return (
                          <li key={task.id} className="text-gray-600 text-sm">
                            {task.title} - <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{task.status}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No tasks in this project yet.</p>
                  )}
                </div>
              </div>

              {/* Assign Users Section */}
              <div className="mt-auto pt-4 border-t border-gray-200"> {/* mt-auto pushes this section to the bottom of the flex card */}
                <h4 className="text-md font-medium text-gray-700 mb-2">Team:</h4>
                {project.assignedUsers.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 pl-4 mb-3">
                    {project.assignedUsers.map(userId => {
                      const user = mockUsers.find(u => u.id === userId);
                      return (
                        <li key={userId} className="text-gray-600 text-sm">
                          {user ? user.name.split(' ')[0] : 'N/A'} {/* Displaying only first name for brevity in card */}
                          {/* Future: Add an unassign button here */}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 mb-3">No team members assigned.</p>
                )}

                {/* Form to assign a new user to this project */}
                <form onSubmit={(e) => handleAssignUserToProject(e, project.id)} className="mt-2">
                  <div className="flex items-center">
                    <select
                      value={selectedUserForProject[project.id] || ''}
                      onChange={(e) => handleUserSelectionChange(project.id, e.target.value)}
                      className="border border-gray-300 rounded-l px-3 py-2 text-sm w-full focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">-- Select User to Assign --</option>
                      {mockUsers
                        .filter(user => !project.assignedUsers.includes(user.id)) // Only show unassigned users
                        .map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <button
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-3 py-2 text-sm rounded-r"
                    >
                      Assign User
                    </button>
                  </div>
                </form>
              </div>
            </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No projects created yet. Add one above!</p>
      )}
    </div>
  );
}

export default ProjectBoards;
