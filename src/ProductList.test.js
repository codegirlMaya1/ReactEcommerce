// ProductList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductList from './ProductList';
import { CartProvider } from './CartContext';

jest.mock('./CartContext', () => ({
  useCart: () => ({
    dispatch: jest.fn(),
  }),
}));

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetchMock = require('fetch-mock-jest');

describe('ProductList Component', () => {
  beforeEach(() => {
    fetchMock.get('https://fakestoreapi.com/products', [
      { id: 1, title: 'Product 1', price: 10, image: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 20, image: 'image2.jpg' },
    ]);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  test('renders products and handles search', async () => {
    render(
      <CartProvider>
        <ProductList />
      </CartProvider>
    );

    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search by name'), { target: { value: 'Product 1' } });
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  test('adds product to cart', async () => {
    const { dispatch } = require('./CartContext').useCart();

    render(
      <CartProvider>
        <ProductList />
      </CartProvider>
    );

    fireEvent.click(await screen.findByText('Add to Cart'));
    expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_TO_CART', payload: { id: 1, title: 'Product 1', price: 10, image: 'image1.jpg' } });
  });
});
