import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error('បរាជ័យក្នុងការផ្ទុកប្រភេទ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateCategory(editing.id, formData);
        toast.success('កែប្រែដោយជោគជ័យ');
      } else {
        await createCategory(formData);
        toast.success('បង្កើតដោយជោគជ័យ');
      }
      setShowModal(false);
      setEditing(null);
      setFormData({ name: '', description: '' });
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'ប្រតិបត្តិការបរាជ័យ');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបប្រភេទនេះទេ?')) {
      try {
        await deleteCategory(id);
        toast.success('លុបដោយជោគជ័យ');
        fetchCategories();
      } catch (error) {
        toast.error('លុបបរាជ័យ');
      }
    }
  };

  if (loading) return <div className="text-center py-5">កំពុងផ្ទុក...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>គ្រប់គ្រងប្រភេទ</h4>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setFormData({ name: '', description: '' }); setShowModal(true); }}>
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
                  <th>ការពិពណ៌នា</th>
                  <th>សកម្មភាព</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description || '-'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditing(cat); setFormData({ name: cat.name, description: cat.description || '' }); setShowModal(true); }}>កែ</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat.id)}>លុប</button>
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
                <h5>{editing ? 'កែប្រែប្រភេទ' : 'បន្ថែមប្រភេទ'}</h5>
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

export default Categories;