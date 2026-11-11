import React, { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '../api/users';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('បរាជ័យក្នុងការផ្ទុកអ្នកប្រើ');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole });
      toast.success('ប្ដូរតួនាទីដោយជោគជ័យ');
      fetchUsers();
    } catch (error) {
      toast.error('ប្ដូរតួនាទីបរាជ័យ');
    }
  };

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      await updateUser(userId, { is_active: !currentStatus });
      toast.success('ប្ដូរស្ថានភាពដោយជោគជ័យ');
      fetchUsers();
    } catch (error) {
      toast.error('ប្ដូរស្ថានភាពបរាជ័យ');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបអ្នកប្រើនេះទេ?')) {
      try {
        await deleteUser(id);
        toast.success('លុបដោយជោគជ័យ');
        fetchUsers();
      } catch (error) {
        toast.error('លុបបរាជ័យ');
      }
    }
  };

  if (loading) return <div className="text-center py-5">កំពុងផ្ទុក...</div>;

  return (
    <div>
      <h4 className="mb-4">គ្រប់គ្រងអ្នកប្រើ</h4>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ឈ្មោះអ្នកប្រើ</th>
                  <th>អ៊ីមែល</th>
                  <th>ឈ្មោះពេញ</th>
                  <th>តួនាទី</th>
                  <th>ស្ថានភាព</th>
                  <th>សកម្មភាព</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.full_name || '-'}</td>
                    <td>
                      <select
                        className="form-select form-select-sm d-inline-block w-auto"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="customer">Customer</option>
                      </select>
                    </td>
                    <td>
                      <span className={`badge ${user.is_active ? 'bg-success' : 'bg-danger'}`}>
                        {user.is_active ? 'សកម្ម' : 'បិទ'}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${user.is_active ? 'btn-outline-warning' : 'btn-outline-success'} me-2`}
                        onClick={() => handleToggleActive(user.id, user.is_active)}
                      >
                        {user.is_active ? 'បិទ' : 'បើក'}
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user.id)}>លុប</button>
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

export default Users;