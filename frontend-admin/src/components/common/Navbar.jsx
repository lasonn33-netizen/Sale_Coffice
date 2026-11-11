import React from 'react';
import { FiBell, FiSearch } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const name = user?.full_name || user?.username || 'Admin';
  return (
    <header className="admin-topbar">
      <div className="admin-search"><FiSearch /><input aria-label="Search" placeholder="ស្វែងរក..." /></div>
      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Notifications"><FiBell /><span /></button>
        <div className="admin-profile">
          <div className="profile-avatar">{name.charAt(0).toUpperCase()}</div>
          <div><strong>{name}</strong><small>Administrator</small></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
