import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOrder, makePayment } from '../api/orders';
import { useCart } from '../context/CartContext';
import { ArrowRightIcon, BagIcon, CardIcon, CashIcon, StoreIcon, TruckIcon } from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';
import ProductImage from '../components/common/ProductImage';

const Checkout = () => {
  const { items, clearCart, getTotalPrice } = useCart();
  const [orderType, setOrderType] = useState('dine_in');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const orderTypes = [
    { value: 'dine_in', label: t('dineIn'), detail: t('dineInDetail'), icon: StoreIcon },
    { value: 'takeaway', label: t('takeaway'), detail: t('takeawayDetail'), icon: BagIcon },
    { value: 'delivery', label: t('delivery'), detail: t('deliveryDetail'), icon: TruckIcon },
  ];
  const paymentMethods = [
    { value: 'cash', label: t('cash'), icon: CashIcon },
    { value: 'card', label: t('card'), icon: CardIcon },
    { value: 'online', label: t('online'), icon: CardIcon },
  ];

  const submitOrder = async (event) => {
    event.preventDefault();
    if (!items.length) return;
    setSubmitting(true);
    try {
      const order = await createOrder({
        order_type: orderType,
        table_number: orderType === 'dine_in' && tableNumber ? Number(tableNumber) : null,
        items: items.map(({ base_product_id, product_id, quantity }) => ({ product_id: base_product_id || product_id, quantity })),
      });
      await makePayment(order.id, { amount: order.total_amount, payment_method: paymentMethod });
      clearCart();
      toast.success(t('orderSuccess'));
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.detail || t('orderFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return <div className="container empty-state"><h1 className="h2">{t('noItems')}</h1><Link className="btn btn-primary mt-3" to="/menu">{t('viewMenu')}</Link></div>;
  }

  return (
    <section className="section checkout-page">
      <div className="container">
        <div className="section-heading checkout-heading">
          <div><span className="eyebrow">{t('secureCheckout')}</span><h1>{t('confirmOrder')}</h1></div>
          <Link className="checkout-back" to="/cart">← {t('backToCart')}</Link>
        </div>

        <form className="checkout-grid" onSubmit={submitOrder}>
          <div className="checkout-form">
            <section className="checkout-card">
              <div className="checkout-step"><span>1</span><div><h2>{t('howReceive')}</h2><p>{t('chooseOption')}</p></div></div>
              <div className="choice-grid">
                {orderTypes.map(({ value, label, detail, icon: ChoiceIcon }) => (
                  <button className={`choice-card ${orderType === value ? 'active' : ''}`} type="button" aria-pressed={orderType === value} onClick={() => setOrderType(value)} key={value}>
                    <ChoiceIcon size={23} /><strong>{label}</strong><small>{detail}</small>
                  </button>
                ))}
              </div>
              {orderType === 'dine_in' && (
                <div className="table-field"><label className="form-label" htmlFor="table-number">{t('tableNumber')}</label><input id="table-number" className="form-control" type="number" min="1" placeholder="e.g. 12" value={tableNumber} onChange={(event) => setTableNumber(event.target.value)} /></div>
              )}
            </section>

            <section className="checkout-card">
              <div className="checkout-step"><span>2</span><div><h2>{t('paymentMethod')}</h2><p>{t('choosePayment')}</p></div></div>
              <div className="payment-grid">
                {paymentMethods.map(({ value, label, icon: PaymentIcon }) => (
                  <button className={`payment-option ${paymentMethod === value ? 'active' : ''}`} type="button" aria-pressed={paymentMethod === value} onClick={() => setPaymentMethod(value)} key={value}>
                    <PaymentIcon size={21} /><span>{label}</span><i />
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="order-review">
            <div className="checkout-card order-review__card">
              <h2>{t('itemSummary')}</h2>
              <div className="review-items">
                {items.map((item) => (
                  <div className="review-item" key={item.product_id}>
                    <ProductImage src={item.image_url} alt={item.name} />
                    <div><strong>{item.name}</strong><small>{t('quantity')} {item.quantity}</small></div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="review-totals"><div><span>{t('itemPrice')}</span><strong>${getTotalPrice().toFixed(2)}</strong></div><div><span>{t('service')}</span><strong>$0.00</strong></div></div>
              <div className="review-grand-total"><span>{t('total')}</span><strong>${getTotalPrice().toFixed(2)}</strong></div>
              <button className="btn btn-primary w-100 btn-lg" disabled={submitting}>{submitting ? t('ordering') : <>{t('orderNow')} <ArrowRightIcon size={18} /></>}</button>
              <p className="secure-note">🔒 {t('securePayment')}</p>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
