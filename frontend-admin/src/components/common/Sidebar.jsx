import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiCoffee, FiGrid, FiHome, FiLogOut, FiPackage, FiShoppingBag, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const menuItems = [
    { path: '/', label: 'ផ្ទាំងគ្រប់គ្រង', icon: <FiHome /> },
    { path: '/products', label: 'ផលិតផល', icon: <FiPackage />, permission: 'products.view' },
    { path: '/categories', label: 'ប្រភេទ', icon: <FiGrid />, permission: 'categories.view' },
    { path: '/orders', label: 'ការបញ្ជាទិញ', icon: <FiShoppingBag />, permission: 'orders.view' },
    { path: '/users', label: 'អ្នកប្រើប្រាស់', icon: <FiUsers />, permission: 'users.view' },
  ];
  const visibleItems = menuItems.filter((item) => !item.permission || hasPermission(user, item.permission));
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand"><span><FiCoffee /></span><div><strong>Coffice</strong><small>ADMIN PANEL</small></div></div>
      <p className="sidebar-label">MENU</p>
      <nav className="sidebar-nav">
        {visibleItems.map((item) => (
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
