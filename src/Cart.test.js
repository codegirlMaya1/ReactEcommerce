// Cart.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cart from './Cart';
import { CartProvider, useCart } from './CartContext';

jest.mock('./CartContext', () => ({
  useCart: () => ({
    cart: [
      { id: 1, name: 'Product 1', price: 10, image: 'image1.jpg' },
      { id: 2, name: 'Product 2', price: 20, image: 'image2.jpg' },
    ],
    dispatch: jest.fn(),
  }),
}));

describe('Cart Component', () => {
  test('renders cart items and calculates total', () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByText('Product 1 - $10')).toBeInTheDocument();
    expect(screen.getByText('Product 2 - $20')).toBeInTheDocument();
    expect(screen.getByText('Total: $30.00')).toBeInTheDocument();
  });

  test('removes item from cart', () => {
    const { dispatch } = useCart();

    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    fireEvent.click(screen.getAllByText('Remove'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_FROM_CART', payload: 1 });
  });

  test('continues shopping', () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Continue Shopping'));
    expect(window.location.pathname).toBe('/');
  });
});
