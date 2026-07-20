export const brands = [
  'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'Bose', 'Levi\'s', 'Zara',
  'H&M', 'Uniqlo', 'Ray-Ban', 'Fossil', 'Dyson', 'KitchenAid', 'L\'Oréal',
  'MAC', 'Penguin', 'HarperCollins', 'Under Armour', 'Puma', 'New Balance',
];

export const getBrandByName = (name) => brands.find((b) => b === name);
