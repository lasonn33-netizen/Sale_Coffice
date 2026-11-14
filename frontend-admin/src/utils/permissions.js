export const PERMISSIONS = [
  { key: 'products.view', label: 'មើលផលិតផល', group: 'ផលិតផល' },
  { key: 'products.manage', label: 'បង្កើត និងកែប្រែផលិតផល', group: 'ផលិតផល' },
  { key: 'categories.view', label: 'មើលប្រភេទ', group: 'ប្រភេទ' },
  { key: 'categories.manage', label: 'បង្កើត និងកែប្រែប្រភេទ', group: 'ប្រភេទ' },
  { key: 'orders.view', label: 'មើលការបញ្ជាទិញ', group: 'ការបញ្ជាទិញ' },
  { key: 'orders.manage', label: 'ប្តូរស្ថានភាព និងលុបការបញ្ជាទិញ', group: 'ការបញ្ជាទិញ' },
  { key: 'users.view', label: 'មើលអ្នកប្រើប្រាស់', group: 'អ្នកប្រើប្រាស់' },
  { key: 'users.manage', label: 'គ្រប់គ្រងអ្នកប្រើប្រាស់ និងសិទ្ធិ', group: 'អ្នកប្រើប្រាស់' },
];

export const hasPermission = (user, permission) =>
  user?.role === 'admin' || user?.permissions?.includes(permission);
