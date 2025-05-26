import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // For default avatar
 
// Define available permissions (as descriptive strings for now)
const PERMISSIONS = {
  MANAGE_TEAM: 'Manage Team Members (Invite, Assign Roles, Remove)',
  CREATE_PROJECTS: 'Create New Projects',
  EDIT_ALL_PROJECTS: 'Edit All Project Details & Assign Users',
  DELETE_ANY_PROJECT: 'Delete Any Project',
  VIEW_ALL_CONTENT: 'View All Projects & Tasks',
  EDIT_ASSIGNED_PROJECTS: 'Edit Details of Assigned Projects',
  ASSIGN_USERS_TO_OWN_PROJECTS: 'Assign Users to Own/Managed Projects',
  CREATE_TASKS_IN_ASSIGNED_PROJECTS: 'Create Tasks in Assigned Projects',
  EDIT_ANY_TASK_IN_ASSIGNED_PROJECTS: 'Edit Any Task in Assigned Projects',
  DELETE_ANY_TASK_IN_ASSIGNED_PROJECTS: 'Delete Any Task in Assigned Projects',
  VIEW_ASSIGNED_CONTENT_ONLY: 'View Only Assigned Projects & Tasks',
};

// Define roles with their descriptions and associated permissions
const ROLES_CONFIG = [
  {
    name: 'Admin',
    description: 'Full access to all features and settings.',
    permissions: [
      PERMISSIONS.MANAGE_TEAM,
      PERMISSIONS.CREATE_PROJECTS,
      PERMISSIONS.EDIT_ALL_PROJECTS,
      PERMISSIONS.DELETE_ANY_PROJECT,
      PERMISSIONS.VIEW_ALL_CONTENT,
    ],
    badgeClasses: 'bg-purple-100 text-purple-700 border border-purple-300',
  },
  {
    name: 'Editor',
    description: 'Can manage projects they are assigned to and create/edit content within them.',
    permissions: [
      PERMISSIONS.VIEW_ASSIGNED_CONTENT_ONLY, // Or VIEW_ALL_CONTENT if they can see all but only edit assigned
      PERMISSIONS.EDIT_ASSIGNED_PROJECTS,
      PERMISSIONS.ASSIGN_USERS_TO_OWN_PROJECTS,
      PERMISSIONS.CREATE_TASKS_IN_ASSIGNED_PROJECTS,
      PERMISSIONS.EDIT_ANY_TASK_IN_ASSIGNED_PROJECTS,
      PERMISSIONS.DELETE_ANY_TASK_IN_ASSIGNED_PROJECTS,
    ],
    badgeClasses: 'bg-sky-100 text-sky-700 border border-sky-300',
  },
  {
    name: 'Viewer',
    description: 'Can only view projects and tasks they are assigned to. Cannot make changes.',
    permissions: [PERMISSIONS.VIEW_ASSIGNED_CONTENT_ONLY],
    badgeClasses: 'bg-gray-200 text-gray-700 border border-gray-400',
  },
];

// Mock initial team members (in a real app, this would come from an API)
const initialTeamMembers = [
  {
    id: 'tm1',
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    role: 'Admin',
    avatarUrl: 'https://via.placeholder.com/40/FFC0CB/000000?text=AW',
    onlineStatus: 'Online',
    lastLogin: '2024-03-12 10:05 AM',
    assignedTasks: ['Implement Login Page', 'Design Dashboard', 'Review API Specs', 'User Profile Setup', 'Finalize Documentation'],
  },
  {
    id: 'tm2',
    name: 'Bob The Builder',
    email: 'bob@example.com',
    role: 'Editor',
    avatarUrl: 'https://via.placeholder.com/40/ADD8E6/000000?text=BB',
    onlineStatus: 'Offline',
    lastLogin: '2024-03-11 14:30 PM',
    assignedTasks: ['Setup initial API routes', 'Develop CRUD operations'],
  },
  {
    id: 'tm3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Viewer',
    avatarUrl: null, // To test fallback
    onlineStatus: 'Online',
    lastLogin: '2024-03-10 09:00 AM',
    assignedTasks: [],
  },
];

const getStatusColor = (status) => {
  if (status === 'Online') return 'bg-green-500';
  if (status === 'Offline') return 'bg-gray-400';
  return 'bg-yellow-400'; // Default for other statuses like 'Away' or 'Pending'
};

function TeamMembers() {
  const [inviteEmail, setInviteEmail] = useState('');
  // Default to 'Viewer' role name
  const [newMemberRole, setNewMemberRole] = useState(ROLES_CONFIG.find(r => r.name === 'Viewer')?.name || ROLES_CONFIG[2].name);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [viewLayout, setViewLayout] = useState('list'); // 'list' or 'table'
  const [expandedPermissions, setExpandedPermissions] = useState({}); // { memberId: boolean }

  const handleInviteEmailChange = (event) => {
    setInviteEmail(event.target.value);
  };

  const handleSendInvitation = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    if (!newMemberRole) {
      alert('Please select a role for the new member.');
      return;
    }
    if (inviteEmail.trim() === '') {
      alert('Please enter an email address to send an invitation.');
      return;
    }
    // Basic email validation (can be improved)
    if (!/\S+@\S+\.\S+/.test(inviteEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    const newMember = {
      id: `user-${Date.now()}`, // Simple unique ID
      name: `Invited (${inviteEmail.split('@')[0]})`, // Placeholder name
      email: inviteEmail,
      role: newMemberRole,
      avatarUrl: null, // Default for new invites
      onlineStatus: 'Pending', // Default for new invites
      lastLogin: 'Pending Invitation', // Default for new invites
      assignedTasks: [],               // Default for new invites
    };

    setTeamMembers(prevMembers => [...prevMembers, newMember]);

    // In a real application, you would call an API to send the invitation
    console.log(`Sending invitation to: ${inviteEmail} with role: ${newMemberRole}`);
    alert(`Invitation sent to ${inviteEmail} with role ${newMemberRole}! (This is a mock action)`);
    setInviteEmail(''); // Clear the input field
    setNewMemberRole(ROLES_CONFIG.find(r => r.name === 'Viewer')?.name || ROLES_CONFIG[2].name); // Reset role selector
  };

  const handleRoleChange = (memberId, newRole) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    // In a real app, you would also call an API to update the role on the backend
    console.log(`Role for member ${memberId} changed to ${newRole}`);
    alert(`Role for ${teamMembers.find(m => m.id === memberId)?.name} updated to ${newRole}. (Mock action)`);
  };

  const togglePermissionsVisibility = (memberId) => {
    setExpandedPermissions(prev => ({ ...prev, [memberId]: !prev[memberId] }));
  };

  const selectedRoleForInviteConfig = ROLES_CONFIG.find(r => r.name === newMemberRole);


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Team Members</h1>

      {/* Invite Team Members Section */}
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Invite New Member</h2>
        <form onSubmit={handleSendInvitation} className="space-y-4">
          <div className="flex-grow">
            <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="inviteEmail"
              type="email"
              value={inviteEmail}
              onChange={handleInviteEmailChange}
              placeholder="member@example.com"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="inviteRole" className="block text-sm font-medium text-gray-700 mb-1">Assign Role</label>
            <select
              id="inviteRole"
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            >
              {ROLES_CONFIG.map(roleConfig => <option key={roleConfig.name} value={roleConfig.name}>{roleConfig.name}</option>)}
            </select>
          </div>
          {selectedRoleForInviteConfig && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md text-xs">
              <p className="font-semibold text-gray-700 mb-1">{selectedRoleForInviteConfig.name} Permissions:</p>
              <p className="text-gray-600 mb-2 italic">{selectedRoleForInviteConfig.description}</p>
              <ul className="list-disc list-inside pl-2 space-y-0.5 text-gray-500">
                {selectedRoleForInviteConfig.permissions.map((permission, index) => (
                  <li key={index}>{permission}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md w-full mt-3"
          >
            Send Invite
          </button>
        </form>
      </div>

      {/* Current Team Members List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Current Team</h2>
          <div className="flex space-x-2 mt-3 sm:mt-0">
            <button
              onClick={() => setViewLayout('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${
                viewLayout === 'list'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewLayout('table')}
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${
                viewLayout === 'table'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {teamMembers.length === 0 ? (
          <p className="text-gray-500">No team members yet. Invite someone using the form above!</p>
        ) : viewLayout === 'list' ? (
          // List View (Card-like)
          <ul className="space-y-4">
            {teamMembers.map(member => {
              const memberRoleConfig = ROLES_CONFIG.find(r => r.name === member.role);
              return (
              <li key={member.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  {/* Left side: Member Info + Activity */}
                  <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
                    {/* Member Info with Avatar */}
                    <div className="flex items-center mb-3">
                      <div className="relative mr-3">
                        {member.avatarUrl ? (
                          <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <FaUserCircle size={40} className="text-gray-400" />
                        )}
                        <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${getStatusColor(member.onlineStatus)}`} title={member.onlineStatus}></span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-semibold text-gray-800 mr-2">{member.name}</p>
                          {memberRoleConfig && (
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${memberRoleConfig.badgeClasses}`}>{member.role}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    {/* Activity Info */}
                    <div className="text-xs text-gray-600 space-y-1">
                      <p><span className="font-medium">Last Login:</span> {member.lastLogin || 'N/A'}</p>
                      <div>
                        <span className="font-medium">Tasks Assigned ({member.assignedTasks.length}):</span>
                        {member.assignedTasks.length > 0 ? (
                          <ul className="list-disc list-inside pl-4 mt-0.5 text-gray-500">
                            {member.assignedTasks.slice(0, 2).map((taskTitle, index) => <li key={index}>{taskTitle}</li>)}
                            {member.assignedTasks.length > 2 && <li className="text-gray-400">...and {member.assignedTasks.length - 2} more</li>}
                          </ul>
                        ) : (
                          <span className="text-gray-500 ml-1">None</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Right side: Role & Permissions */}
                  <div className="flex-shrink-0 w-full sm:w-auto md:w-2/5 lg:w-1/3">
                    <div className="mb-2">
                      <label htmlFor={`role-list-${member.id}`} className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        id={`role-list-${member.id}`}
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-full focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {ROLES_CONFIG.map(roleConfig => (
                          <option key={roleConfig.name} value={roleConfig.name}>{roleConfig.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button
                        onClick={() => togglePermissionsVisibility(member.id)}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                      >
                        {expandedPermissions[member.id] ? 'Hide' : 'Show'} Permissions
                      </button>
                      {expandedPermissions[member.id] && memberRoleConfig && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-700 border border-gray-200">
                          <p className="font-medium mb-1">{memberRoleConfig.description}</p>
                          <ul className="list-disc list-inside pl-2 space-y-0.5">
                            {memberRoleConfig.permissions.map((permission, index) => (
                              <li key={index}>{permission}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )})}
          </ul>
        ) : (
          // Table View
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.map(member => {
                  const memberRoleConfig = ROLES_CONFIG.find(r => r.name === member.role);
                  return (
                    <React.Fragment key={member.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap"> {/* Member Column */}
                          <div className="flex items-center">
                            <div className="relative flex-shrink-0 h-10 w-10">
                              {member.avatarUrl ? (
                                <img className="h-10 w-10 rounded-full object-cover" src={member.avatarUrl} alt={member.name} />
                              ) : (
                                <FaUserCircle size={40} className="text-gray-400" />
                              )}
                              <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-white ${getStatusColor(member.onlineStatus)}`} title={member.onlineStatus}></span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap"> {/* Role Column */}
                          <div className="flex items-center">
                            {memberRoleConfig && (
                              <span className={`hidden sm:inline-block px-2 py-0.5 text-xs font-medium rounded-full ${memberRoleConfig.badgeClasses} mr-2`}>{member.role}</span>
                            )}
                            <select
                              id={`role-table-${member.id}`}
                              value={member.role}
                              onChange={(e) => handleRoleChange(member.id, e.target.value)}
                              className="border border-gray-300 rounded-md px-2 py-1 text-xs w-full sm:w-auto focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              {ROLES_CONFIG.map(roleConfig => (
                                <option key={roleConfig.name} value={roleConfig.name}>{roleConfig.name}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.lastLogin || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.assignedTasks.length}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => togglePermissionsVisibility(member.id)}
                            className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none text-xs"
                          >
                            {expandedPermissions[member.id] ? 'Hide' : 'View'} Permissions
                          </button>
                          {/* Add other actions like 'Remove Member' here if needed */}
                        </td>
                      </tr>
                      {expandedPermissions[member.id] && memberRoleConfig && (
                        <tr className="bg-gray-50">
                          <td colSpan="5" className="px-6 py-3 text-xs text-gray-700">
                            <p className="font-semibold mb-1">{memberRoleConfig.name} Permissions:</p>
                            <p className="italic text-gray-600 mb-1">{memberRoleConfig.description}</p>
                            <ul className="list-disc list-inside pl-2 space-y-0.5">
                              {memberRoleConfig.permissions.map((permission, index) => (
                                <li key={index}>{permission}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamMembers;
