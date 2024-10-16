const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
];

let customers = [
  { id: 1, name: 'Customer 1', email: 'customer1@example.com' },
  { id: 2, name: 'Customer 2', email: 'customer2@example.com' },
  { id: 3, name: 'Customer 3', email: 'customer3@example.com' },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.post('/api/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});

app.post('/api/customers', (req, res) => {
  const newCustomer = { id: customers.length + 1, ...req.body };
  customers.push(newCustomer);
  res.json(newCustomer);
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter(product => product.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.delete('/api/customers/:id', (req, res) => {
  customers = customers.filter(customer => customer.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});