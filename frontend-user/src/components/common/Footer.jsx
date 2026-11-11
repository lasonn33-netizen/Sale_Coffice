import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, CoffeeIcon, FacebookIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from './Icons';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <Link className="brand brand--footer" to="/">
          <span className="brand__mark"><CoffeeIcon size={22} /></span>
          <span className="brand__name">Coffice</span>
        </Link>
        <p>{t('heroCopy')}</p>
        <div className="social-links">
          <a href="#" aria-label="Facebook"><FacebookIcon /></a>
          <a href="#" aria-label="Instagram"><InstagramIcon /></a>
        </div>
      </div>

      <div>
        <h3 className="footer-title">{t('quickLinks')}</h3>
        <nav className="footer-links">
          <Link to="/">{t('home')}</Link><Link to="/menu">{t('menu')}</Link>
          <Link to="/cart">{t('cart')}</Link><Link to="/orders">{t('orders')}</Link>
        </nav>
      </div>

      <div>
        <h3 className="footer-title">{t('information')}</h3>
        <nav className="footer-links">
          <a href="#">{t('aboutUs')}</a><a href="#">{t('privacy')}</a>
          <a href="#">{t('terms')}</a><a href="#">{t('customerSupport')}</a>
        </nav>
      </div>

      <div>
        <h3 className="footer-title">{t('contact')}</h3>
        <ul className="contact-list">
          <li><MapPinIcon size={18} /><span>ភ្នំពេញ, កម្ពុជា</span></li>
          <li><PhoneIcon size={18} /><a href="tel:+855067785719">+855 067785719</a></li>
          <li><MailIcon size={18} /><a href="mailto:lasonn33@gmail.com">lasonn33@gmail.com</a></li>
          <li><ClockIcon size={18} /><span>{t('everyDay')}</span></li>
        </ul>
      </div>
    </div>
    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} Coffice. {t('allRights')}</span>
      <span>{t('freshBrewed')}</span>
    </div>
  </footer>;
};

export default Footer;
