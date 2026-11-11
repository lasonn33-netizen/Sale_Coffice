import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import ProductImage from '../common/ProductImage';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const available = product.is_available && product.stock_quantity > 0;

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <ProductImage
          className="product-card__image"
          src={product.image_url}
          alt={product.name}
        />
        <span className="product-card__status">{available ? t('stock') : t('outOfStock')}</span>
      </div>
      <div className="product-card__body">
        <div className="product-card__rating">★ 4.9 <span>(124)</span></div>
        <h2 className="product-card__title">{product.name}</h2>
        <p className="product-card__description">
          {product.description ? `${product.description.slice(0, 75)}${product.description.length > 75 ? '…' : ''}` : t('productFallback')}
        </p>
        <div className="product-card__footer">
          <span className="price">${Number(product.price).toFixed(2)}<small>{(Number(product.price) * 4000).toLocaleString()} KHR</small></span>
          <Link className="btn btn-outline-secondary btn-sm" to={`/product/${product.id}`}>{t('customize')}</Link>
          <button className="btn btn-primary btn-sm" type="button" onClick={() => addItem(product, 1)} disabled={!available}>
            {t('addCart')}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
