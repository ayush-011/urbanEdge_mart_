// Categories derived from dummyjson.com product categories
export const categories = [
  { id: 'beauty', name: 'Beauty', icon: '💄', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop', count: 0 },
  { id: 'fragrances', name: 'Fragrances', icon: '🌸', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop', count: 0 },
  { id: 'furniture', name: 'Furniture', icon: '🪑', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop', count: 0 },
  { id: 'groceries', name: 'Groceries', icon: '🛒', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop', count: 0 },
  { id: 'home-decoration', name: 'Home Decor', icon: '🏠', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop', count: 0 },
  { id: 'kitchen-accessories', name: 'Kitchen', icon: '🍳', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop', count: 0 },
  { id: 'laptops', name: 'Laptops', icon: '💻', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop', count: 0 },
  { id: 'mens-shirts', name: "Men's Shirts", icon: '👔', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop', count: 0 },
  { id: 'mens-shoes', name: "Men's Shoes", icon: '👞', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop', count: 0 },
  { id: 'mens-watches', name: "Men's Watches", icon: '⌚', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop', count: 0 },
  { id: 'mobile-accessories', name: 'Mobile Accessories', icon: '📱', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop', count: 0 },
  { id: 'motorcycle', name: 'Motorcycle', icon: '🏍️', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop', count: 0 },
  { id: 'skin-care', name: 'Skin Care', icon: '🧴', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop', count: 0 },
  { id: 'smartphones', name: 'Smartphones', icon: '📱', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop', count: 0 },
  { id: 'sports-accessories', name: 'Sports', icon: '⚽', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop', count: 0 },
  { id: 'sunglasses', name: 'Sunglasses', icon: '🕶️', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop', count: 0 },
  { id: 'tablets', name: 'Tablets', icon: '📟', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop', count: 0 },
  { id: 'tops', name: 'Tops', icon: '👕', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop', count: 0 },
  { id: 'vehicle', name: 'Vehicle', icon: '🚗', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop', count: 0 },
  { id: 'womens-bags', name: "Women's Bags", icon: '👜', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=500&auto=format&fit=crop', count: 0 },
  { id: 'womens-dresses', name: "Women's Dresses", icon: '👗', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop', count: 0 },
  { id: 'womens-jewellery', name: "Women's Jewellery", icon: '💍', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop', count: 0 },
  { id: 'womens-shoes', name: "Women's Shoes", icon: '👠', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop', count: 0 },
  { id: 'womens-watches', name: "Women's Watches", icon: '⌚', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop', count: 0 },
];

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}

export function updateCategoryCounts(products) {
  const counts = {};
  products.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  categories.forEach(c => {
    c.count = counts[c.id] || 0;
  });
}