import React, { useState } from 'react';
import ProductForm from './ProductForm';
import Inventory from './Inventory';
import OrderManagement from './OrderManagement';

const Admin = () => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <ProductForm onSubmit={addProduct} />
      <Inventory products={products} onDelete={deleteProduct} />
      <OrderManagement />
    </div>
  );
};

export default Admin;