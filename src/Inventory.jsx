import React from 'react';

const Inventory = ({ products, onDelete }) => {
  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;