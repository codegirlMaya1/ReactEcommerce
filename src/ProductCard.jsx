import React from 'react';

const ProductCard = ({ product, deleteProduct }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">{product.description}</p>
      <p className="card-text">${product.price}</p>
      <p className="card-text">Quantity: {product.quantity}</p>
      <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
    </div>
  </div>
);

export default ProductCard;