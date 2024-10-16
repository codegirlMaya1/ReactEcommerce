// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import Product from './Product';

const sampleProducts = [
  { id: 1, name: 'Sample Product 1', price: 10 },
  { id: 2, name: 'Sample Product 2', price: 20 },
  { id: 3, name: 'Sample Product 3', price: 30 },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load sample products into local storage if not already present
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (storedProducts.length === 0) {
      localStorage.setItem('products', JSON.stringify(sampleProducts));
      setProducts(sampleProducts);
    } else {
      setProducts(storedProducts);
    }
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;