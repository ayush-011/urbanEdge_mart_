// Products fetched from https://dummyjson.com/products (194 products)
// This file provides helper functions to access and filter products

let cachedProducts = null;

export async function fetchAllProducts() {
  if (cachedProducts) return cachedProducts;
  try {
    const res = await fetch('https://dummyjson.com/products?limit=194');
    const data = await res.json();
    cachedProducts = data.products.map(p => ({
      id: p.id,
      name: p.title,
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: p.description,
      category: p.category,
      brand: p.brand || 'UrbanEdge',
      price: p.price,
      originalPrice: p.discountPercentage > 0 
        ? Math.round(p.price / (1 - p.discountPercentage / 100) * 100) / 100 
        : null,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      reviewCount: p.reviews?.length || 0,
      reviews: (p.reviews || []).map(r => ({
        id: r.reviewerName + r.date,
        rating: r.rating,
        comment: r.comment,
        author: r.reviewerName,
        date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      })),
      stock: p.stock,
      image: p.thumbnail,
      images: p.images || [p.thumbnail],
      tags: p.tags || [],
      sku: p.sku,
      weight: p.weight,
      dimensions: p.dimensions,
      warrantyInformation: p.warrantyInformation,
      shippingInformation: p.shippingInformation,
      availabilityStatus: p.availabilityStatus,
      returnPolicy: p.returnPolicy,
      minimumOrderQuantity: p.minimumOrderQuantity,
      featured: p.rating >= 4.5,
      isNew: p.meta?.createdAt ? new Date(p.meta.createdAt) > new Date('2025-06-01') : false,
      isBestSeller: p.rating >= 4.3 && p.reviews?.length >= 5,
      flashSale: p.discountPercentage > 15,
      colors: [],
      sizes: [],
      specs: {
        brand: p.brand || 'UrbanEdge',
        weight: `${p.weight || 0}g`,
        warranty: p.warrantyInformation || 'Standard',
        shipping: p.shippingInformation || 'Standard shipping',
      },
    }));
    return cachedProducts;
  } catch (err) {
    console.error('Failed to fetch products:', err);
    return [];
  }
}

export function getCachedProducts() {
  return cachedProducts || [];
}

export function getProductById(id) {
  return cachedProducts?.find(p => p.id === Number(id)) || null;
}

export function getProductBySlug(slug) {
  return cachedProducts?.find(p => p.slug === slug) || null;
}

export function getRelatedProducts(product, limit = 4) {
  if (!cachedProducts) return [];
  return cachedProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
}

export function getRecommendations(viewedIds = [], limit = 4) {
  if (!cachedProducts || viewedIds.length === 0) return [];
  const viewedCategories = new Set();
  viewedIds.forEach(id => {
    const p = cachedProducts.find(x => x.id === id);
    if (p) viewedCategories.add(p.category);
  });
  return cachedProducts
    .filter(p => !viewedIds.includes(p.id) && viewedCategories.has(p.category))
    .slice(0, limit);
}

export function filterProducts(products, { search, category, sort, brand, minPrice, maxPrice } = {}) {
  let filtered = [...products];
  
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) || 
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  }
  
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (brand && brand !== 'All') {
    filtered = filtered.filter(p => p.brand === brand);
  }
  
  if (minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= minPrice);
  }
  
  if (maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= maxPrice);
  }
  
  if (sort) {
    switch (sort) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'popularity': filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: break;
    }
  }
  
  return filtered;
}

export function searchSuggestions(query) {
  if (!query || !cachedProducts) return [];
  const q = query.toLowerCase();
  return cachedProducts
    .filter(p => p.name.toLowerCase().includes(q))
    .slice(0, 5);
}

export const COUPONS = {
  WELCOME10: { code: 'WELCOME10', type: 'percent', discount: 10, minOrder: 0 },
  SAVE20: { code: 'SAVE20', type: 'percent', discount: 20, minOrder: 50 },
  FLAT15: { code: 'FLAT15', type: 'flat', discount: 15, minOrder: 30 },
  NEXUS25: { code: 'NEXUS25', type: 'percent', discount: 25, minOrder: 100 },
};