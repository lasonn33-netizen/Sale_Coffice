import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const AdminLayout = () => (
  <div className="admin-shell">
    <Sidebar />
    <div className="admin-content">
      <Navbar />
      <main className="admin-main"><Outlet /></main>
    </div>
  </div>
);

export default AdminLayout;
