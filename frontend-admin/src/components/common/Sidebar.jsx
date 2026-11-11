import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiCoffee, FiGrid, FiHome, FiLogOut, FiPackage, FiShoppingBag, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const menuItems = [
    { path: '/', label: 'ផ្ទាំងគ្រប់គ្រង', icon: <FiHome /> },
    { path: '/products', label: 'ផលិតផល', icon: <FiPackage /> },
    { path: '/categories', label: 'ប្រភេទ', icon: <FiGrid /> },
    { path: '/orders', label: 'ការបញ្ជាទិញ', icon: <FiShoppingBag /> },
    { path: '/users', label: 'អ្នកប្រើប្រាស់', icon: <FiUsers /> },
  ];
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand"><span><FiCoffee /></span><div><strong>Coffice</strong><small>ADMIN PANEL</small></div></div>
      <p className="sidebar-label">MENU</p>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            {item.icon}<span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-link" type="button" onClick={logout}><FiLogOut /><span>ចាកចេញ</span></button>
      </div>
    </aside>
  );
};

export default Sidebar;
