import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus, deleteOrder } from '../api/orders';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders({ status: filter || undefined });
      setOrders(data);
    } catch (error) {
      toast.error('បរាជ័យក្នុងការផ្ទុកកម្មង់');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success('ប្ដូរស្ថានភាពដោយជោគជ័យ');
      fetchOrders();
    } catch (error) {
      toast.error('ប្ដូរស្ថានភាពបរាជ័យ');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបកម្មង់នេះទេ?')) {
      try {
        await deleteOrder(id);
        toast.success('លុបដោយជោគជ័យ');
        fetchOrders();
      } catch (error) {
        toast.error('លុបបរាជ័យ');
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'warning',
      paid: 'success',
      cancelled: 'danger',
    };
    const labels = {
      pending: 'កំពុងរង់ចាំ',
      paid: 'បានបង់',
      cancelled: 'បានបោះបង់',
    };
    return <span className={`badge bg-${colors[status]}`}>{labels[status]}</span>;
  };

  if (loading) return <div className="text-center py-5">កំពុងផ្ទុក...</div>;

  return (
    <div>
      <h4 className="mb-4">គ្រប់គ្រងកម្មង់</h4>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="mb-3">
            <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="">ទាំងអស់</option>
              <option value="pending">កំពុងរង់ចាំ</option>
              <option value="paid">បានបង់</option>
              <option value="cancelled">បានបោះបង់</option>
            </select>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>លេខកូដ</th>
                  <th>អ្នកប្រើ</th>
                  <th>សរុប</th>
                  <th>ប្រភេទ</th>
                  <th>ស្ថានភាព</th>
                  <th>កាលបរិច្ឆេទ</th>
                  <th>សកម្មភាព</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td><code>{order.order_number}</code></td>
                    <td>{order.user?.username || order.user_id}</td>
                    <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                    <td>{order.order_type}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>
                      <select
                        className="form-select form-select-sm d-inline-block w-auto me-2"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="pending">កំពុងរង់ចាំ</option>
                        <option value="paid">បានបង់</option>
                        <option value="cancelled">បានបោះបង់</option>
                      </select>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(order.id)}>លុប</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;