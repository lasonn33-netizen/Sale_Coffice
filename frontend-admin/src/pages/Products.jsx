import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { getCategories } from '../api/categories';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock_quantity: 0,
    is_available: true,
    image_url: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      toast.error('បរាជ័យក្នុងការផ្ទុកទិន្នន័យ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        category_id: formData.category_id || null,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        toast.success('កែប្រែដោយជោគជ័យ');
      } else {
        await createProduct(data);
        toast.success('បង្កើតដោយជោគជ័យ');
      }
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', category_id: '', stock_quantity: 0, is_available: true, image_url: '' });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'ប្រតិបត្តិការបរាជ័យ');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបផលិតផលនេះទេ?')) {
      try {
        await deleteProduct(id);
        toast.success('លុបដោយជោគជ័យ');
        fetchData();
      } catch (error) {
        toast.error('លុបបរាជ័យ');
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category_id: product.category_id || '',
      stock_quantity: product.stock_quantity,
      is_available: product.is_available,
      image_url: product.image_url || '',
    });
    setShowModal(true);
  };

  if (loading) return <div className="text-center py-5">កំពុងផ្ទុក...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>គ្រប់គ្រងផលិតផល</h4>
        <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setFormData({ name: '', description: '', price: '', category_id: '', stock_quantity: 0, is_available: true, image_url: '' }); setShowModal(true); }}>
          + បន្ថែមថ្មី
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ឈ្មោះ</th>
                  <th>ប្រភេទ</th>
                  <th>តម្លៃ</th>
                  <th>ស្តុក</th>
                  <th>ស្ថានភាព</th>
                  <th>សកម្មភាព</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category?.name || '-'}</td>
                    <td>${parseFloat(product.price).toFixed(2)}</td>
                    <td>{product.stock_quantity}</td>
                    <td>
                      <span className={`badge ${product.is_available ? 'bg-success' : 'bg-danger'}`}>
                        {product.is_available ? 'មាន' : 'អស់'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEditModal(product)}>កែ</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}>លុប</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editingProduct ? 'កែប្រែផលិតផល' : 'បន្ថែមផលិតផល'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">ឈ្មោះ *</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ការពិពណ៌នា</label>
                    <textarea className="form-control" rows="2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">តម្លៃ *</label>
                        <input type="number" step="0.01" className="form-control" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">ស្តុក</label>
                        <input type="number" className="form-control" value={formData.stock_quantity} onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })} />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ប្រភេទ</label>
                    <select className="form-select" value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                      <option value="">ជ្រើសរើសប្រភេទ</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL រូបភាព</label>
                    <input type="text" className="form-control" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" checked={formData.is_available} onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })} />
                    <label className="form-check-label">មានលក់</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>បោះបង់</button>
                  <button type="submit" className="btn btn-primary">រក្សាទុក</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;