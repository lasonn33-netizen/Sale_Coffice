import React, { useEffect, useState } from 'react';
import { getCategories, getProducts } from '../api/products';
import ProductCard from '../components/products/ProductCard';
import { useLanguage } from '../context/LanguageContext';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setLoading(true);
    setLoadError(false);
    Promise.all([
      getProducts({
        category_id: selectedCategory || undefined,
        search: search || undefined,
      }),
      getCategories(),
    ])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setCategories(categoryData);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [selectedCategory, search]);

  return (
    <section className="section menu-page">
      <div className="container">
        <div className="menu-heading">
          <span className="eyebrow">{t('exploreMenu')}</span>
          <h1>{t('artisanMenu')}</h1>
          <p>{t('artisanMenuCopy')}</p>
        </div>

        <div className="menu-filters">
          <button type="button" className={`menu-tab ${selectedCategory === '' ? 'active' : ''}`} onClick={() => setSelectedCategory('')}>
            {t('allCategories')}
          </button>
          {categories.map((category) => (
            <button type="button" className={`menu-tab ${String(selectedCategory) === String(category.id) ? 'active' : ''}`} onClick={() => setSelectedCategory(String(category.id))} key={category.id}>
              {category.name}
            </button>
          ))}
        </div>

        <div className="menu-search filter-bar">
          <input
            className="form-control"
            type="search"
            placeholder={t('searchProducts')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span className="menu-search-hint">{products.length} {t('productsFound')}</span>
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
          <div className="empty-state">
            <h2>{t('notFound')}</h2>
            <p>{t('tryAnother')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
