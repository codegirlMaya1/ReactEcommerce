// src/components/OrderManagement.jsx
import React, { useState, useEffect } from 'react';

const sampleOrders = [
  { id: 1, product: 'Sample Product 1', quantity: 2, price: 20 },
  { id: 2, product: 'Sample Product 2', quantity: 1, price: 20 },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || sampleOrders;
    setOrders(storedOrders);
  }, []);

  return (
    <div>
      <h2>Past Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              {order.product} - Quantity: {order.quantity} - Total: ${order.price * order.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderManagement;