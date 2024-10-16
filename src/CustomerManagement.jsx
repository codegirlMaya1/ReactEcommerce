import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);
  }, []);

  const addCustomer = (customer) => {
    const newCustomers = [...customers, { ...customer, id: Date.now() }];
    setCustomers(newCustomers);
    localStorage.setItem('customers', JSON.stringify(newCustomers));
  };

  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const getCustomerOrders = (customerId) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    return orders.filter(order => order.customerId === customerId);
  };

  return (
    <div>
      <h2>Manage Customers</h2>
      <CustomerForm onSubmit={addCustomer} />
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.email} - {customer.phone}
            <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
            <h3>Past Orders:</h3>
            <ul>
              {getCustomerOrders(customer.id).map(order => (
                <li key={order.id}>
                  Order #{order.id}
                  <ul>
                    {order.items.map(item => (
                      <li key={item.id}>
                        <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                        {item.name} - ${item.price}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerManagement;
