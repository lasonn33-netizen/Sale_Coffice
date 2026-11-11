import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import ProductImage from '../components/common/ProductImage';

const galleryImages = [
  '/images/hero-latte.png',
  '/images/hero-iced-coffee.png',
  '/images/hero-pour-over.png',
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState('regular');
  const [sweetness, setSweetness] = useState('100%');
  const [milk, setMilk] = useState('whole');
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((error) => toast.error(error.response?.data?.detail || t('productNotFound')))
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading) return <div className="container py-5 text-center">{t('loadingProduct')}</div>;
  if (!product) return <div className="container py-5 text-center"><Link to="/menu">{t('backToMenu')}</Link></div>;

  const unavailable = !product.is_available || product.stock_quantity < 1;
  const images = [product.image_url, ...galleryImages].filter((image, index, list) => image && list.indexOf(image) === index);
  const sizeExtra = size === 'large' ? 0.5 : 0;
  const milkExtra = milk === 'oat' ? 0.6 : 0;
  const toppingExtra = toppings.reduce((total, topping) => total + ({ boba: 0.5, foam: 0.6, shot: 0.75 }[topping] || 0), 0);
  const customizedPrice = Number(product.price) + sizeExtra + milkExtra + toppingExtra;
  const optionSummary = [
    size === 'large' ? t('large') : t('regular'),
    `${sweetness} ${t('sweetness').toLowerCase()}`,
    milk === 'oat' ? t('oatMilk') : milk === 'condensed' ? t('condensedMilk') : t('wholeMilk'),
    ...toppings.map((topping) => ({ boba: t('boba'), foam: t('creamFoam'), shot: t('extraShot') }[topping])),
  ].join(' · ');
  const toggleTopping = (topping) => setToppings((current) => current.includes(topping)
    ? current.filter((value) => value !== topping)
    : [...current, topping]);

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-md-6">
          <div className="product-gallery">
            <ProductImage className="img-fluid rounded product-detail-image" src={images[activeImage]} alt={product.name} />
            <div className="product-gallery__thumbs" aria-label={t('chooseImage')}>
              {images.map((image, index) => (
                <button
                  type="button"
                  className={`product-gallery__thumb ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`${t('chooseImage')} ${index + 1}`}
                  aria-pressed={activeImage === index}
                  key={image}
                >
                  <ProductImage src={image} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <Link to="/menu" className="text-decoration-none">{t('backToMenu')}</Link>
          <h1 className="mt-3">{product.name}</h1>
          <p className="text-muted">{product.description || t('noDescription')}</p>
          <p className="fs-3 fw-bold text-primary">${customizedPrice.toFixed(2)}</p>
          <p>{t('left')}: {product.stock_quantity}</p>
          <div className="product-options">
            <div className="product-option"><strong>{t('size')}</strong><div className="option-buttons">
              <button type="button" className={size === 'regular' ? 'selected' : ''} onClick={() => setSize('regular')}>{t('regular')}</button>
              <button type="button" className={size === 'large' ? 'selected' : ''} onClick={() => setSize('large')}>{t('large')} +$0.50</button>
            </div></div>
            <div className="product-option"><strong>{t('sweetness')}</strong><div className="option-buttons">
              {['0%', '50%', '100%'].map((value) => <button type="button" className={sweetness === value ? 'selected' : ''} onClick={() => setSweetness(value)} key={value}>{value}</button>)}
            </div></div>
            <label className="product-option"><strong>{t('milk')}</strong><select className="form-select" value={milk} onChange={(event) => setMilk(event.target.value)}>
              <option value="whole">{t('wholeMilk')}</option><option value="condensed">{t('condensedMilk')}</option><option value="oat">{t('oatMilk')} +$0.60</option>
            </select></label>
            <div className="product-option"><strong>{t('toppings')}</strong><div className="topping-list">
              {[['boba', t('boba'), '$0.50'], ['foam', t('creamFoam'), '$0.60'], ['shot', t('extraShot'), '$0.75']].map(([value, label, price]) => (
                <label key={value}><input type="checkbox" checked={toppings.includes(value)} onChange={() => toggleTopping(value)} /> {label}<span>+{price}</span></label>
              ))}
            </div></div>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <input className="form-control quantity-input" type="number" min="1" max={product.stock_quantity} value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(product.stock_quantity, Number(event.target.value))))} />
            <button className="btn btn-primary" disabled={unavailable} onClick={() => addItem(product, quantity, { price: customizedPrice, summary: optionSummary })}>
              {unavailable ? t('soldOut') : t('addOrder')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
