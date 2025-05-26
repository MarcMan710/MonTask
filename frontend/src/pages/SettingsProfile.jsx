import React, { useState, useEffect } from 'react';

// Mock current user data (in a real app, this would come from context/API)
const mockCurrentUser = {
  name: 'Kemal Atmojo',
  email: 'kemal@example.com',
  bio: 'Software developer passionate about creating amazing web experiences.',
  avatarUrl: 'https://via.placeholder.com/150/007bff/FFFFFF?text=KA', // Placeholder avatar
};

// Mock current notification preferences
const mockNotificationPreferences = {
  emailOnNewTask: true,
  emailOnMention: true,
  inAppProjectUpdates: true,
  weeklySummaryEmail: false,
};

// Mock current app theme preference
const mockAppThemePreference = {
  theme: 'light', // 'light', 'dark', or potentially 'system'
};

function SettingsProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null); // For file object
  const [avatarPreview, setAvatarPreview] = useState(''); // For displaying preview

  // State for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for notification preferences
  const [emailOnNewTask, setEmailOnNewTask] = useState(true);
  const [emailOnMention, setEmailOnMention] = useState(true);
  const [inAppProjectUpdates, setInAppProjectUpdates] = useState(true);
  const [weeklySummaryEmail, setWeeklySummaryEmail] = useState(false);

  // State for app theme
  const [appTheme, setAppTheme] = useState('light');

  useEffect(() => {
    // Load current user data
    setName(mockCurrentUser.name);
    setEmail(mockCurrentUser.email);
    setBio(mockCurrentUser.bio);
    setAvatarPreview(mockCurrentUser.avatarUrl);

    // Load current notification preferences
    setEmailOnNewTask(mockNotificationPreferences.emailOnNewTask);
    setEmailOnMention(mockNotificationPreferences.emailOnMention);
    setInAppProjectUpdates(mockNotificationPreferences.inAppProjectUpdates);
    setWeeklySummaryEmail(mockNotificationPreferences.weeklySummaryEmail);

    // Load current app theme preference
    setAppTheme(mockAppThemePreference.theme);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Profile update submitted:', {
      name,
      email,
      bio,
      avatar: avatar ? avatar.name : 'No new avatar', // Or send the file object itself
    });
    alert('Profile updated successfully! (This is a mock action)');
    // Potentially clear avatar file input if needed, or update mockCurrentUser
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) { // Example: Basic length validation
      alert('New password must be at least 6 characters long.');
      return;
    }

    // In a real application, you would send this data to your backend for validation and update
    console.log('Password change submitted:', {
      currentPassword, // Send this for verification on the backend
      newPassword,
    });
    alert('Password changed successfully! (This is a mock action)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleNotificationPreferencesSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Notification preferences submitted:', {
      emailOnNewTask,
      emailOnMention,
      inAppProjectUpdates,
      weeklySummaryEmail,
    });
    alert('Notification preferences updated successfully! (This is a mock action)');
    // You might want to update mockNotificationPreferences if you were persisting this locally
    // or refetch from a real backend.
  };

  const handleThemeChange = (e) => {
    setAppTheme(e.target.value);
  };

  const handleThemeSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would save this preference (e.g., to localStorage or backend)
    // and apply the theme (e.g., by adding a class to the <html> or <body> tag)
    console.log('App theme preference submitted:', { appTheme });
    alert(`App theme set to ${appTheme}! (This is a mock action. You'd typically update a global state or apply a class to the body/html tag here.)`);
    // Update mock preference for demonstration
    mockAppThemePreference.theme = appTheme;
  };


  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings / Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={avatarPreview || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Avatar'}
            alt="Avatar Preview"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <label htmlFor="avatarUpload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm">
              Change Avatar
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Profile Information Section */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us a little about yourself..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition duration-150 ease-in-out"
        >
          Save Changes
        </button>
      </form>

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* Change Password Section */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Change Password</h2>
      <form onSubmit={handlePasswordChangeSubmit} className="space-y-6">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition duration-150 ease-in-out"
        >
          Change Password
        </button>
      </form>

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* Notification Preferences Section */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Notification Preferences</h2>
      <form onSubmit={handleNotificationPreferencesSubmit} className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
          <label htmlFor="emailOnNewTask" className="text-sm font-medium text-gray-700">
            Email me when I'm assigned a new task
          </label>
          <input
            id="emailOnNewTask"
            type="checkbox"
            checked={emailOnNewTask}
            onChange={(e) => setEmailOnNewTask(e.target.checked)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
          <label htmlFor="emailOnMention" className="text-sm font-medium text-gray-700">
            Email me when I'm @mentioned in a comment
          </label>
          <input
            id="emailOnMention"
            type="checkbox"
            checked={emailOnMention}
            onChange={(e) => setEmailOnMention(e.target.checked)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
          <label htmlFor="inAppProjectUpdates" className="text-sm font-medium text-gray-700">
            Show in-app notifications for project updates
          </label>
          <input
            id="inAppProjectUpdates"
            type="checkbox"
            checked={inAppProjectUpdates}
            onChange={(e) => setInAppProjectUpdates(e.target.checked)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
          <label htmlFor="weeklySummaryEmail" className="text-sm font-medium text-gray-700">
            Send me a weekly summary email
          </label>
          <input
            id="weeklySummaryEmail"
            type="checkbox"
            checked={weeklySummaryEmail}
            onChange={(e) => setWeeklySummaryEmail(e.target.checked)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-md transition duration-150 ease-in-out mt-6">
          Save Notification Preferences
        </button>
      </form>

      {/* Divider */}
      <hr className="my-8 border-gray-300" />

      {/* App Theme Section */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">App Theme</h2>
      <form onSubmit={handleThemeSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer">
            <input
              type="radio"
              name="appTheme"
              value="light"
              checked={appTheme === 'light'}
              onChange={handleThemeChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">Light Mode</span>
          </label>
          <label className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer">
            <input
              type="radio"
              name="appTheme"
              value="dark"
              checked={appTheme === 'dark'}
              onChange={handleThemeChange}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">Dark Mode</span>
          </label>
          {/* Optionally, add a 'System' preference later */}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-md transition duration-150 ease-in-out mt-6"
        >
          Save Theme Preference
        </button>
      </form>
    </div>
  );
}

export default SettingsProfile;
