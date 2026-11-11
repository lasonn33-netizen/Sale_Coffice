import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/products';
import ProductCard from '../components/products/ProductCard';
import { ArrowRightIcon, CheckIcon } from '../components/common/Icons';
import { useLanguage } from '../context/LanguageContext';
import { MapPinIcon } from '../components/common/Icons';

const heroSlides = [
  { src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop', alt: 'កាហ្វេ latte ជាមួយ latte art' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop', alt: 'កាហ្វេស្រស់នៅ Coffice' },
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop', alt: 'ពែងកាហ្វេក្តៅ' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    getProducts({ limit: 4 })
      .then(setProducts)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow">{t('freshCoffee')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('heroTitle') }} />
            <p className="hero__copy">{t('heroCopy')}</p>
            <div className="hero__actions">
              <Link className="btn btn-primary btn-lg" to="/menu">{t('viewMenu')} <ArrowRightIcon size={18} /></Link>
              <Link className="btn btn-light btn-lg" to="/register">{t('register')}</Link>
            </div>
            <div className="trust-row">
              <span><CheckIcon size={17} /> {t('qualityBeans')}</span>
              <span><CheckIcon size={17} /> {t('freshlyMade')}</span>
              <span><CheckIcon size={17} /> {t('easyOrdering')}</span>
            </div>
          </div>
          <div className="hero-slider">
            {heroSlides.map((slide, index) => (
              <img
                className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
                src={slide.src}
                alt={slide.alt}
                key={slide.src}
              />
            ))}
            <div className="hero-slider__dots" aria-label={t('chooseImage')}>
              {heroSlides.map((slide, index) => (
                <button
                  className={index === activeSlide ? 'active' : ''}
                  type="button"
                  aria-label={`${t('chooseImage')} ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  key={slide.src}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container promo-banner">
        <div>
          <span className="promo-banner__tag">{t('promoTag')}</span>
          <h2>{t('promoTitle')}</h2>
          <p>{t('promoCopy')}</p>
        </div>
        <div className="promo-banner__action">
          <span>{t('specialPrice')}</span>
          <strong>$2.50 <small>(៛10,000)</small></strong>
          <Link className="btn btn-light" to="/menu">{t('viewMenu')} <ArrowRightIcon size={16} /></Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t('favourites')}</span>
              <h2>{t('popularProducts')}</h2>
            </div>
            <p>{t('favouritesCopy')}</p>
          </div>

          {loading ? (
            <div className="empty-state">{t('loadingMenu')}</div>
          ) : loadError ? (
            <div className="empty-state"><h2>{t('cannotLoadProducts')}</h2><p>{t('tryAgainLater')}</p></div>
          ) : products.length ? (
            <div className="product-grid">
              {products.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
          ) : (
            <div className="empty-state">{t('noProducts')}</div>
          )}
        </div>
      </section>

      <section className="container branches-section" id="branches">
        <div className="branches-copy">
          <span className="eyebrow">{t('branches')}</span>
          <h2>{t('branchesTitle')}</h2>
          <p>{t('branchesCopy')}</p>
          <div className="branch-list">
            <div className="branch-item"><MapPinIcon size={19} /><div><strong>{t('phnomPenh')}</strong><span>{t('bkkAddress')}</span></div></div>
            <div className="branch-item"><MapPinIcon size={19} /><div><strong>{t('toulKork')}</strong><span>{t('toulAddress')}</span></div></div>
            <div className="branch-item"><MapPinIcon size={19} /><div><strong>{t('siemReap')}</strong><span>{t('siemAddress')}</span></div></div>
          </div>
        </div>
        <div className="branches-image" id="about">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" alt={t('branchesTitle')} />
          <div><strong>Coffice Cambodia</strong><span>{t('everyDay')}</span></div>
        </div>
      </section>
    </>
  );
};

export default Home;
