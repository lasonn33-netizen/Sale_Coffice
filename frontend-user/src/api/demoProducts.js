const imageSources = [
  '/images/hero-latte.png',
  '/images/hero-iced-coffee.png',
  '/images/hero-pour-over.png',
];

export const demoProducts = [
  { id: 1, name: 'Kampot Palm Sugar Latte', description: 'Cambodian dark roast espresso mixed with natural Kampot palm sugar.', price: 2.5, stock_quantity: 20, is_available: true, image_url: imageSources[0], category_id: 1 },
  { id: 2, name: 'Phnom Penh Iced Milk Coffee', description: 'Traditional rich coffee with sweet local condensed milk.', price: 2.25, stock_quantity: 20, is_available: true, image_url: imageSources[1], category_id: 1 },
  { id: 3, name: 'Siem Reap Coconut Cold Brew', description: 'Slow-steeped cold brew with fresh sweet coconut water.', price: 2.75, stock_quantity: 20, is_available: true, image_url: imageSources[2], category_id: 2 },
  { id: 4, name: 'Classic Iced Americano', description: 'Double-shot espresso poured over clear ice and chilled water.', price: 2, stock_quantity: 20, is_available: true, image_url: imageSources[1], category_id: 2 },
  { id: 5, name: 'Caramel Macchiato', description: 'Fresh steamed milk with vanilla syrup and espresso.', price: 3.25, stock_quantity: 20, is_available: true, image_url: imageSources[0], category_id: 1 },
  { id: 6, name: 'Nitro Cold Brew', description: 'Velvety cold brew with a naturally smooth finish.', price: 3.5, stock_quantity: 20, is_available: true, image_url: imageSources[2], category_id: 2 },
  { id: 7, name: 'Matcha Cheese Cream Latte', description: 'Japanese matcha blended with fresh milk and cream cheese foam.', price: 3, stock_quantity: 20, is_available: true, image_url: imageSources[0], category_id: 3 },
  { id: 8, name: 'Butter Croissant', description: 'Flaky, buttery pastry baked fresh every morning.', price: 1.75, stock_quantity: 20, is_available: true, image_url: imageSources[2], category_id: 4 },
];

export const demoCategories = [
  { id: 1, name: 'Espresso & Coffee' },
  { id: 2, name: 'Cold Brew & Tea' },
  { id: 3, name: 'Khmer Specials' },
  { id: 4, name: 'Pastries & Bakery' },
];
