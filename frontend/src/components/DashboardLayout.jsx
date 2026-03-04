import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#121212' }}>
      <Sidebar />
      <div className="flex-1 ml-64 w-0 overflow-x-hidden">
        <div className="w-full min-h-screen p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
