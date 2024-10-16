import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';

const ProductList = () => {
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    let url = 'https://fakestoreapi.com/products';
    if (category) {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }
    if (sortOrder === 'desc') {
      url += '?sort=desc';
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [category, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const filteredProducts = products.filter(product => {
    if (filterBy === 'name') {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === 'price') {
      return product.price.toString().includes(searchTerm);
    }
    return true;
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder={`Search by ${filterBy}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={filterBy} onChange={handleFilterChange}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <button onClick={handleSortChange}>Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}</button>
      </div>
      {filteredProducts.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <img src={product.image} alt={product.title} style={{ width: '100px' }} />
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
