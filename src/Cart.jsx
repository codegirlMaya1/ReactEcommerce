import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch } = useCart();

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id} style={{ marginBottom: '10px' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '10px', padding: '5px 10px' }}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <Link to="/new-order">
            <button>Checkout</button>
          </Link>
          <Link to="/home">
            <button>Continue Shopping</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
