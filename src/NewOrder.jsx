import React from 'react';
import { useCart } from './CartContext';

const NewOrder = () => {
  const { cart, dispatch } = useCart();
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };

  const placeOrder = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = { id: Date.now(), items: cart, user: user.username };
    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <h2>Order Summary</h2>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default NewOrder;
