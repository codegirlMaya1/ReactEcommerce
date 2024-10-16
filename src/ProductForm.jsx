import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({ id: '', name: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({ id: '', name: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        value={product.id}
        onChange={handleChange}
        placeholder="Product ID"
      />
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;