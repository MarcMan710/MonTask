import React from 'react';
import Navbar from '../Navbar'; // Assuming you have a Navbar component
import Sidebar from '../Sidebar'; // Assuming you have a Sidebar component

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
