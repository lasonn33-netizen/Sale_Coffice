import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Cart = () => {
  const { items, getTotalPrice } = useCart();
  const { t } = useLanguage();
  if (!items.length) {
    return <div className="container empty-state"><div style={{ fontSize: '3rem' }}>🛒</div><h1 className="h2">{t('emptyCart')}</h1><p>{t('emptyCartCopy')}</p><Link className="btn btn-primary mt-3" to="/menu">{t('viewMenu')}</Link></div>;
  }
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading"><div><span className="eyebrow">{t('yourOrder')}</span><h1>{t('yourCart')}</h1></div><p>{items.length} {t('itemsInOrder')}</p></div>
        <div className="row g-4">
          <div className="col-lg-8 card"><div className="card-body">{items.map((item) => <CartItem key={item.product_id} item={item} />)}</div></div>
          <div className="col-lg-4"><div className="card shadow-sm"><div className="card-body"><h2 className="h3 mb-3">{t('orderSummary')}</h2><div className="d-flex justify-content-between fs-5 mb-4"><span className="text-muted">{t('total')}</span><strong>${getTotalPrice().toFixed(2)}</strong></div><Link className="btn btn-primary w-100" to="/checkout">{t('checkout')} →</Link></div></div></div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
