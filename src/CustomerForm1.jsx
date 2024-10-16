import React, { useState } from 'react';

const CustomerForm = ({ addCustomer }) => {
  const [customer, setCustomer] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(customer);
    setCustomer({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={customer.name} onChange={handleChange} placeholder="Customer Name" required />
      <input type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Customer Email" required />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;