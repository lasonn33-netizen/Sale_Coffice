import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getOrders } from '../api/orders';
import { getProducts } from '../api/products';
import { BagIcon, ReceiptIcon, StoreIcon, TruckIcon } from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';

const typeIcons = { dine_in: StoreIcon, takeaway: BagIcon, delivery: TruckIcon };

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [productNames, setProductNames] = useState({});
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();
  const statusLabels = { pending: t('pending'), paid: t('paid'), cancelled: t('cancelled') };
  const typeLabels = { dine_in: t('dineIn'), takeaway: t('takeaway'), delivery: t('delivery') };

  useEffect(() => {
    Promise.all([getOrders(), getProducts()])
      .then(([orderData, productData]) => {
        setOrders([...orderData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        setProductNames(Object.fromEntries(productData.map((product) => [product.id, product.name])));
      })
      .catch((error) => toast.error(error.response?.data?.detail || t('cannotLoadOrders')))
      .finally(() => setLoading(false));
  }, [t]);

  if (loading) return <div className="container empty-state">{t('loadingOrders')}</div>;

  return (
    <section className="section orders-page">
      <div className="container orders-container">
        <div className="section-heading">
          <div><span className="eyebrow">{t('orderHistory')}</span><h1>{t('myOrders')}</h1></div>
          <p>{t('orderHistoryCopy')}</p>
        </div>

        {!orders.length ? (
          <div className="orders-empty"><span><ReceiptIcon size={35} /></span><h2>{t('noOrders')}</h2><p>{t('ordersAppear')}</p><Link className="btn btn-primary" to="/menu">{t('startOrdering')}</Link></div>
        ) : (
          <div className="order-list">
            {orders.map((order) => {
              const TypeIcon = typeIcons[order.order_type] || BagIcon;
              return (
                <article className="order-card" key={order.id}>
                  <header className="order-card__header">
                    <div className="order-number"><span><ReceiptIcon size={20} /></span><div><small>{t('orderNumber')}</small><strong>{order.order_number}</strong></div></div>
                    <div className="order-meta"><span>{new Date(order.created_at).toLocaleString(language === 'km' ? 'km-KH' : 'en-US')}</span><span className={`order-status order-status--${order.status}`}>{statusLabels[order.status] || order.status}</span></div>
                  </header>
                  <div className="order-card__body">
                    <div className="order-type"><TypeIcon size={20} /><div><small>{t('receiveMethod')}</small><strong>{typeLabels[order.order_type] || order.order_type}{order.table_number ? ` · ${t('tableNumber')} ${order.table_number}` : ''}</strong></div></div>
                    <div className="order-lines">
                      {order.items.map((item) => (
                        <div className="order-line" key={item.id}><span>{productNames[item.product_id] || `ផលិតផល #${item.product_id}`} <small>× {item.quantity}</small></span><strong>${Number(item.subtotal).toFixed(2)}</strong></div>
                      ))}
                    </div>
                  </div>
                  <footer className="order-card__footer"><span>{t('orderTotal')}</span><strong>${Number(order.total_amount).toFixed(2)}</strong></footer>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderHistory;
