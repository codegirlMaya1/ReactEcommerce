import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import CustomerForm from './CustomerForm1';
import ProductForm from './ProductForm1';

const Management = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchCustomers = () => {
    axios.get('http://localhost:3000/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));
  };

  const addProduct = (product) => {
    axios.post('http://localhost:3000/api/products', product)
      .then(response => setProducts([...products, response.data]))
      .catch(error => console.error('Error adding product:', error));
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/api/products/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  const addCustomer = (customer) => {
    axios.post('http://localhost:3000/api/customers', customer)
      .then(response => setCustomers([...customers, response.data]))
      .catch(error => console.error('Error adding customer:', error));
  };

  const deleteCustomer = (id) => {
    axios.delete(`http://localhost:3000/api/customers/${id}`)
      .then(() => setCustomers(customers.filter(customer => customer.id !== id)))
      .catch(error => console.error('Error deleting customer:', error));
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'darkblue' }}>
      <h2>Management Page</h2>
      <div>
        <h3>Products</h3>
        <ProductForm addProduct={addProduct} />
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <ProductCard product={product} deleteProduct={deleteProduct} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Customers</h3>
        <CustomerForm addCustomer={addCustomer} />
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.name} - {customer.email}
              <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Management;