import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { CartIcon, CloseIcon, CoffeeIcon, MenuIcon } from './Icons';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <header className="site-nav">
      <div className="container site-nav__inner">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="brand__mark"><CoffeeIcon size={22} /></span>
          <span className="brand__name">Coffice</span>
        </NavLink>

        <button className="nav-toggle" type="button" aria-label={t('openMenu')} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <CloseIcon size={25} /> : <MenuIcon size={25} />}
        </button>

        <nav className={`site-nav__links ${open ? 'open' : ''}`}>
          <NavLink className="site-nav__link" to="/" onClick={closeMenu}>{t('home')}</NavLink>
          <NavLink className="site-nav__link" to="/menu" onClick={closeMenu}>{t('menu')}</NavLink>
          <a className="site-nav__link" href="/#branches" onClick={closeMenu}>{t('branches')}</a>
          <a className="site-nav__link" href="/#about" onClick={closeMenu}>{t('aboutUs')}</a>
          {isAuthenticated && (
            <NavLink className="site-nav__link" to="/orders" onClick={closeMenu}>{t('orders')}</NavLink>
          )}
          <NavLink className="site-nav__link cart-link" to="/cart" onClick={closeMenu}>
            <CartIcon size={18} /> {t('cart')}
            {getTotalItems() > 0 && <span className="cart-count">{getTotalItems()}</span>}
          </NavLink>
          {isAuthenticated ? (
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleLogout}>{t('logout')}</button>
          ) : (
            <>
              <NavLink className="site-nav__link" to="/login" onClick={closeMenu}>{t('login')}</NavLink>
              <NavLink className="btn btn-primary btn-sm" to="/register" onClick={closeMenu}>{t('register')}</NavLink>
            </>
          )}
          <button
            className="btn btn-outline-secondary btn-sm language-toggle"
            type="button"
            onClick={toggleLanguage}
            aria-pressed={language === 'en'}
            aria-label={language === 'km' ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ'}
            title={language === 'km' ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ'}
          >
            {language === 'km' ? 'ខ្មែរ' : 'English'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
