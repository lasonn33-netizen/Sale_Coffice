import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import ProductImage from '../common/ProductImage';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { t } = useLanguage();
  return (
    <div className="d-flex gap-3 align-items-center py-3 border-bottom">
      <ProductImage className="cart-thumb rounded" src={item.image_url} alt={item.name} />
      <div className="flex-grow-1"><h2 className="h6 mb-1">{item.name}</h2>{item.options?.summary && <div className="cart-item-options">{item.options.summary}</div>}<div className="text-muted">${Number(item.price).toFixed(2)}</div></div>
      <input aria-label={`${t('quantityFor')} ${item.name}`} className="form-control quantity-input" type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.product_id, Number(event.target.value))} />
      <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
      <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.product_id)}>{t('remove')}</button>
    </div>
  );
};

export default CartItem;
