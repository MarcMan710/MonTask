import React, { useState, useEffect } from 'react';
import TaskItem from '../components/features/tasks/TaskItem'; // Assuming you'll use TaskItem
import Input from '../components/common/Input'; // For date input
import Button from '../components/common/Button'; // For a potential "Clear Filters" button
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Placeholder data - in a real app, this would come from an API or state management
const initialTasks = [
  {
    id: 1,
    title: 'Design new logo',
    description: 'Create mockups for client review. Ensure all brand guidelines are met.',
    project: 'Project Alpha',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-03-15',
    category: 'Design',
    assignee: { name: 'Alice Wonderland', avatarUrl: 'https://via.placeholder.com/32/FFC0CB/000000?text=AW' }
  },
  {
    id: 2,
    title: 'Develop API endpoint for user authentication',
    description: 'User authentication endpoint. Needs JWT implementation.',
    project: 'Project Beta',
    status: 'To Do',
    priority: 'High',
    dueDate: '2024-03-20',
    category: 'Development',
    assignee: { name: 'Bob The Builder', avatarUrl: 'https://via.placeholder.com/32/ADD8E6/000000?text=BB' }
  },
  {
    id: 3,
    title: 'Write documentation for API',
    description: 'Document the new API. Include examples for each endpoint.',
    project: 'Project Alpha',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '2024-03-25',
    category: 'Documentation',
    assignee: { name: 'Charlie Brown', avatarUrl: null } // No avatar, will show initials or default
  },
  {
    id: 4,
    title: 'Test payment gateway integration',
    description: 'Ensure all payment methods work. Test with sandbox accounts.',
    project: 'Project Gamma',
    status: 'Completed',
    priority: 'High',
    dueDate: '2024-03-01',
    category: 'QA',
    assignee: { name: 'Diana Prince', avatarUrl: 'https://via.placeholder.com/32/FFFF00/000000?text=DP' }
  },
  {
    id: 5,
    title: 'Deploy to staging environment',
    description: 'Prepare for UAT. Coordinate with DevOps team.',
    project: 'Project Beta',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2024-03-18',
    category: 'Deployment',
    assignee: { name: 'Edward Scissorhands', avatarUrl: 'https://via.placeholder.com/32/808080/FFFFFF?text=ES' }
  },
  {
    id: 6,
    title: 'User feedback session planning',
    description: 'Gather feedback on new UI. Prepare questions and invite users.',
    project: 'Project Alpha',
    status: 'To Do',
    priority: 'Low',
    dueDate: '2024-04-01',
    category: 'UX Research',
    assignee: null // No assignee
  },
];

// Placeholder options for filters - these would also typically come from an API or be constants
const projectOptions = ['All', 'Project Alpha', 'Project Beta', 'Project Gamma'];
const statusOptions = ['All', 'To Do', 'In Progress', 'Completed', 'Overdue']; // Added Overdue
const priorityOptions = ['All', 'High', 'Medium', 'Low'];

// Define statuses for Kanban columns. You might want to customize this.
const kanbanColumns = [
  { id: 'To Do', title: 'To Do' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Completed', title: 'Completed' }];

// Helper component for rendering sortable task items
function SortableTaskItem({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 100 : 'auto', // Ensure dragged item is on top
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* We render TaskItem directly; if TaskItem itself needs drag styles, pass isDragging */}
      <TaskItem task={task} />
    </div>
  );
}

function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks); // Made tasks state updatable
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [filters, setFilters] = useState({
    project: 'All',
    status: 'All',
    priority: 'All',
    dueDate: '',
    searchTerm: '',
  });
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [activeTask, setActiveTask] = useState(null); // For DragOverlay

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    let currentTasks = [...tasks];

    if (filters.project && filters.project !== 'All') {
      currentTasks = currentTasks.filter(task => task.project === filters.project);
    }
    if (filters.searchTerm) {
      const lowercasedSearchTerm = filters.searchTerm.toLowerCase();
      currentTasks = currentTasks.filter(task =>
        task.title.toLowerCase().includes(lowercasedSearchTerm) ||
        (task.description && task.description.toLowerCase().includes(lowercasedSearchTerm))
        // Add other fields to search if needed, e.g., task.project.toLowerCase().includes(lowercasedSearchTerm)
      );
    }
    if (filters.status && filters.status !== 'All') {
      currentTasks = currentTasks.filter(task => task.status === filters.status);
    }
    if (filters.priority && filters.priority !== 'All') {
      currentTasks = currentTasks.filter(task => task.priority === filters.priority);
    }
    if (filters.dueDate) {
      currentTasks = currentTasks.filter(task => task.dueDate === filters.dueDate);
    }

    setFilteredTasks(currentTasks);
  }, [filters, tasks]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      project: 'All',
      status: 'All',
      priority: 'All',
      dueDate: '',
      searchTerm: '',
    });
  };

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  function handleDragStart(event) {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null); // Clear active task for DragOverlay

    if (!over) {
      return;
    }

    const activeTaskId = active.id; // This is task.id

    // Determine the target column ID
    // over.id could be a column ID or another task's ID if dropped on a task
    let targetColumnId = null;

    // Check if 'over' is a column itself
    if (kanbanColumns.some(col => col.id === over.id)) {
      targetColumnId = over.id;
    } else if (over.data.current?.sortable?.containerId) {
      // If dropped on a task, get its container (column) ID
      targetColumnId = over.data.current.sortable.containerId;
    }

    if (targetColumnId) {
      const taskToMove = tasks.find(t => t.id === activeTaskId);
      // Only update if the status is actually changing
      if (taskToMove && taskToMove.status !== targetColumnId) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === activeTaskId ? { ...task, status: targetColumnId } : task
          )
        );
      }
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Task Management</h1>

      {/* Filters Section */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        {/* Search Bar */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search tasks by title or description..."
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filter by Project */}
          <div>
            <label htmlFor="project-filter" className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <select id="project-filter" name="project" value={filters.project} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              {projectOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          {/* Filter by Status */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select id="status-filter" name="status" value={filters.status} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              {statusOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          {/* Filter by Priority */}
          <div>
            <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select id="priority-filter" name="priority" value={filters.priority} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              {priorityOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          {/* Filter by Due Date */}
          <div>
            <label htmlFor="dueDate-filter" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <Input type="date" id="dueDate-filter" name="dueDate" value={filters.dueDate} onChange={handleFilterChange} className="w-full" />
          </div>
        </div>
        <div className="mt-4">
            <Button onClick={clearFilters} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Clear Filters</Button>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="mb-6 flex justify-end space-x-2">
        <Button
          onClick={() => handleViewToggle('list')}
          className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          List View
        </Button>
        <Button
          onClick={() => handleViewToggle('kanban')}
          className={`px-4 py-2 rounded ${viewMode === 'kanban' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Kanban View
        </Button>
      </div>

      {/* Task Display Section (Conditional) */}
      <div>
        {viewMode === 'list' && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            {filteredTasks.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        {task.description && <div className="text-xs text-gray-500">{task.description}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          task.priority === 'Low' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignedTo || 'N/A'}</td> {/* Placeholder for Assigned To */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No tasks match the current filters or search. Try adjusting your criteria or adding new tasks!</p>
            )}
          </div>
        )}

        {viewMode === 'kanban' && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kanbanColumns.map(column => {
                const tasksInColumn = filteredTasks.filter(task => task.status === column.id);
                const taskIdsInColumn = tasksInColumn.map(task => task.id);

                return (
                  <div key={column.id} className="bg-gray-100 p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">{column.title}</h3>
                    <SortableContext
                      items={taskIdsInColumn}
                      strategy={verticalListSortingStrategy}
                      id={column.id} // Important: ID for the droppable column
                    >
                      <div className="space-y-3 min-h-[200px]">
                        {tasksInColumn.map(task => (
                          <SortableTaskItem key={task.id} task={task} />
                        ))}
                        {tasksInColumn.length === 0 && (
                          <p className="text-sm text-gray-400 italic">No tasks in this stage.</p>
                        )}
                      </div>
                    </SortableContext>
                  </div>
                );
              })}
            </div>
            <DragOverlay>
              {activeTask ? <TaskItem task={activeTask} /> : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
}
export default TaskManagement;
