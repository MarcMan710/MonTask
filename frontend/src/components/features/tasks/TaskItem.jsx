import React from 'react';
import { FaEdit, FaCheckCircle, FaUserCircle } from 'react-icons/fa';

// Helper to get priority color styling
const getPriorityClasses = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-700 border border-red-300';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    case 'low': return 'bg-green-100 text-green-700 border border-green-300';
    default: return 'bg-gray-100 text-gray-700 border border-gray-300';
  }
};

// Helper to get category color styling (can be more sophisticated)
const getCategoryClasses = (category) => {
  // For demo, using a simple switch. A more dynamic approach might involve hashing or a predefined map.
  if (!category) return 'bg-gray-100 text-gray-600 border border-gray-300';
  switch (category.toLowerCase()) {
    case 'design': return 'bg-purple-100 text-purple-700 border border-purple-300';
    case 'development': return 'bg-blue-100 text-blue-700 border border-blue-300';
    case 'documentation': return 'bg-indigo-100 text-indigo-700 border border-indigo-300';
    case 'qa': return 'bg-pink-100 text-pink-700 border border-pink-300';
    case 'deployment': return 'bg-teal-100 text-teal-700 border border-teal-300';
    case 'ux research': return 'bg-orange-100 text-orange-700 border border-orange-300';
    default: return 'bg-gray-100 text-gray-600 border border-gray-300';
  }
};

function TaskItem({ task }) {
  if (!task) return null;

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent card click if actions are inside a clickable card
    console.log('Edit task:', task.id);
    // Implement task editing logic (e.g., open a modal with task details)
    alert(`Edit action for task: "${task.title}" (ID: ${task.id})`);
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    console.log('Complete task:', task.id);
    // Implement task completion logic (e.g., update status to 'Completed')
    alert(`Mark as complete action for task: "${task.title}" (ID: ${task.id})`);
    // This would typically involve calling a function passed via props to update the task state
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow border border-gray-200 cursor-grab">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-semibold text-gray-800 break-words mr-2">{task.title}</h3>
        {task.assignee && (
          task.assignee.avatarUrl ? (
            <img
              src={task.assignee.avatarUrl}
              alt={task.assignee.name || 'Assignee'}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-gray-300 flex-shrink-0"
              title={task.assignee.name || 'Assigned to'}
            />
          ) : (
             <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs sm:text-sm font-semibold border-2 border-gray-300 flex-shrink-0" title={task.assignee.name || 'Assigned to'}>
              {task.assignee.name ? task.assignee.name.substring(0, 2).toUpperCase() : <FaUserCircle size={16} />}
            </div>
          )
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {task.priority && (
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityClasses(task.priority)}`}>
            {task.priority}
          </span>
        )}
        {task.category && (
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryClasses(task.category)}`}>
            {task.category}
          </span>
        )}
      </div>

      <div className="flex justify-end items-center space-x-1.5 pt-2 border-t border-gray-100 mt-2">
        <button onClick={handleEdit} className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100 transition-colors" title="Edit Task" aria-label="Edit Task"> <FaEdit size={14} /> </button>
        <button onClick={handleComplete} className="text-gray-400 hover:text-green-600 p-1 rounded-full hover:bg-gray-100 transition-colors" title="Mark as Complete" aria-label="Mark as Complete"> <FaCheckCircle size={14} /> </button>
      </div>
    </div>
  );
}

export default TaskItem;