import React from 'react';
import Sidebar from '../components/layout/Sidebar'; // Corrected path
// import Navbar from '../components/layout/Navbar'; // Placeholder for future Navbar

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      {/* <Navbar /> You would place Navbar here, potentially above the main content or within it */}
      <main className="flex-grow ml-64 p-6"> {/* ml-64 matches sidebar width (w-64 = 16rem = 256px) */}
        {/* Placeholder for a potential Navbar if it's part of the main content area flow */}
        {/* <div className="bg-white shadow-md p-4 mb-4">Navbar Placeholder</div> */}
        {children}
      </main>
      {/* Example: <DashboardFooter /> */}
    </div>
  );
};

export default DashboardLayout;
