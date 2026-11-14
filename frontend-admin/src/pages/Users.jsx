import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users';
import toast from 'react-hot-toast';
import { PERMISSIONS, hasPermission } from '../utils/permissions';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPermissions, setEditingPermissions] = useState(null);
  const [draftPermissions, setDraftPermissions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({
    username: '', email: '', full_name: '', password: '', role: 'staff', permissions: [],
  });
  const { user: currentUser } = useAuth();

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
      await updateUser(userId, { role: newRole, permissions: newRole === 'admin' ? [] : undefined });
      toast.success('ប្ដូរតួនាទីដោយជោគជ័យ');
      fetchUsers();
    } catch (error) {
      toast.error('ប្ដូរតួនាទីបរាជ័យ');
    }
  };

  const openPermissions = (user) => {
    setEditingPermissions(user);
    setDraftPermissions(user.permissions || []);
  };

  const togglePermission = (permission) => {
    setDraftPermissions((current) => current.includes(permission)
      ? current.filter((item) => item !== permission)
      : [...current, permission]);
  };

  const savePermissions = async () => {
    setSaving(true);
    try {
      await updateUser(editingPermissions.id, { permissions: draftPermissions });
      toast.success('រក្សាទុកសិទ្ធិដោយជោគជ័យ');
      setEditingPermissions(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'រក្សាទុកសិទ្ធិបរាជ័យ');
    } finally {
      setSaving(false);
    }
  };

  const updateCreateField = (event) => {
    const { name, value } = event.target;
    setCreateForm((current) => ({ ...current, [name]: value }));
  };

  const toggleCreatePermission = (permission) => {
    setCreateForm((current) => ({
      ...current,
      permissions: current.permissions.includes(permission)
        ? current.permissions.filter((item) => item !== permission)
        : [...current.permissions, permission],
    }));
  };

  const saveNewUser = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await createUser({
        ...createForm,
        permissions: createForm.role === 'admin' ? [] : createForm.permissions,
      });
      toast.success('បង្កើតអ្នកប្រើប្រាស់ដោយជោគជ័យ');
      setShowCreate(false);
      setCreateForm({ username: '', email: '', full_name: '', password: '', role: 'staff', permissions: [] });
      fetchUsers();
    } catch (error) {
      const validation = error.response?.data?.errors;
      const message = validation ? Object.values(validation).flat()[0] : error.response?.data?.message;
      toast.error(message || 'បង្កើតអ្នកប្រើប្រាស់បរាជ័យ');
    } finally {
      setSaving(false);
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
    <div className="users-page">
      <div className="page-heading">
        <div><span className="dashboard-eyebrow">ACCESS CONTROL</span><h1>គ្រប់គ្រងអ្នកប្រើប្រាស់</h1><p>កំណត់តួនាទី និងសិទ្ធិចូលប្រើប្រាស់តាមផ្នែក</p></div>
        <div className="page-heading__actions"><div className="permission-note"><strong>{users.length}</strong><span>អ្នកប្រើប្រាស់</span></div><button className="btn btn-primary add-user-button" disabled={!hasPermission(currentUser, 'users.manage')} onClick={() => setShowCreate(true)}>+ បន្ថែមអ្នកប្រើ</button></div>
      </div>

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
                  <th>សិទ្ធិ</th>
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
                        disabled={!hasPermission(currentUser, 'users.manage') || user.id === currentUser.id}
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
                      {user.role === 'admin' ? <span className="permission-badge permission-badge--all">សិទ្ធិទាំងអស់</span> : <button className="btn btn-sm btn-outline-primary" disabled={!hasPermission(currentUser, 'users.manage')} onClick={() => openPermissions(user)}>{(user.permissions || []).length} សិទ្ធិ · កំណត់</button>}
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${user.is_active ? 'btn-outline-warning' : 'btn-outline-success'} me-2`}
                        disabled={!hasPermission(currentUser, 'users.manage') || user.id === currentUser.id}
                        onClick={() => handleToggleActive(user.id, user.is_active)}
                      >
                        {user.is_active ? 'បិទ' : 'បើក'}
                      </button>
                      <button className="btn btn-sm btn-outline-danger" disabled={!hasPermission(currentUser, 'users.manage') || user.id === currentUser.id} onClick={() => handleDelete(user.id)}>លុប</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingPermissions && (
        <div className="permission-modal" role="dialog" aria-modal="true">
          <div className="permission-modal__card">
            <div className="permission-modal__header"><div><span className="dashboard-eyebrow">PERMISSIONS</span><h2>កំណត់សិទ្ធិ</h2><p>{editingPermissions.full_name || editingPermissions.username}</p></div><button className="btn-close" onClick={() => setEditingPermissions(null)} aria-label="បិទ" /></div>
            <div className="permission-grid">
              {PERMISSIONS.map((permission) => (
                <label className={`permission-option ${draftPermissions.includes(permission.key) ? 'is-selected' : ''}`} key={permission.key}>
                  <input type="checkbox" checked={draftPermissions.includes(permission.key)} onChange={() => togglePermission(permission.key)} />
                  <span><strong>{permission.label}</strong><small>{permission.group}</small></span>
                </label>
              ))}
            </div>
            <div className="permission-modal__footer"><button className="btn btn-light" onClick={() => setEditingPermissions(null)}>បោះបង់</button><button className="btn btn-primary" disabled={saving} onClick={savePermissions}>{saving ? 'កំពុងរក្សាទុក...' : 'រក្សាទុកសិទ្ធិ'}</button></div>
          </div>
        </div>
      )}

      {showCreate && (
        <div className="permission-modal" role="dialog" aria-modal="true">
          <div className="permission-modal__card create-user-card">
            <div className="permission-modal__header"><div><span className="dashboard-eyebrow">NEW ACCOUNT</span><h2>បន្ថែមអ្នកប្រើប្រាស់</h2><p>បង្កើត Staff ឬ Customer និងកំណត់សិទ្ធិភ្លាមៗ</p></div><button className="btn-close" onClick={() => setShowCreate(false)} aria-label="បិទ" /></div>
            <form onSubmit={saveNewUser}>
              <div className="create-user-fields">
                <div><label className="form-label">ឈ្មោះអ្នកប្រើ *</label><input className="form-control" name="username" value={createForm.username} onChange={updateCreateField} required /></div>
                <div><label className="form-label">អ៊ីមែល *</label><input className="form-control" type="email" name="email" value={createForm.email} onChange={updateCreateField} required /></div>
                <div><label className="form-label">ឈ្មោះពេញ</label><input className="form-control" name="full_name" value={createForm.full_name} onChange={updateCreateField} /></div>
                <div><label className="form-label">ពាក្យសម្ងាត់ *</label><input className="form-control" type="password" name="password" minLength="6" value={createForm.password} onChange={updateCreateField} required /></div>
                <div><label className="form-label">តួនាទី</label><select className="form-select" name="role" value={createForm.role} onChange={updateCreateField}><option value="staff">Staff</option><option value="customer">Customer</option><option value="admin">Admin</option></select></div>
              </div>
              {createForm.role !== 'admin' && <><div className="permission-section-title">សិទ្ធិចូលប្រើប្រាស់</div><div className="permission-grid permission-grid--compact">{PERMISSIONS.map((permission) => <label className={`permission-option ${createForm.permissions.includes(permission.key) ? 'is-selected' : ''}`} key={permission.key}><input type="checkbox" checked={createForm.permissions.includes(permission.key)} onChange={() => toggleCreatePermission(permission.key)} /><span><strong>{permission.label}</strong><small>{permission.group}</small></span></label>)}</div></>}
              <div className="permission-modal__footer"><button type="button" className="btn btn-light" onClick={() => setShowCreate(false)}>បោះបង់</button><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'កំពុងបង្កើត...' : 'បង្កើតអ្នកប្រើ'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;