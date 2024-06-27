const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('PORT:', process.env.PORT);

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add a new user
app.post('/users', (req, res) => {
  const { first_name, last_name, email, phone, street_address, state, city, zip, vendor } = req.body;
  if (!first_name || !last_name || !email || vendor === undefined) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO users (first_name, last_name, email, phone, street_address, state, city, zip, vendor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [first_name, last_name, email, phone, street_address, state, city, zip, vendor], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).send(err);
    }
    res.status(201).send({ id: result.insertId, first_name, last_name, email, phone, street_address, state, city, zip, vendor });
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, street_address, state, city, zip, vendor } = req.body;

  if (!first_name || !last_name || !email || vendor === undefined) {
    return res.status(400).send('All fields are required');
  }

  const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, street_address = ?, state = ?, city = ?, zip = ?, vendor = ? WHERE id = ?';
  db.query(query, [first_name, last_name, email, phone, street_address, state, city, zip, vendor, id], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.send({ id, first_name, last_name, email, phone, street_address, state, city, zip, vendor });
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.sendStatus(204);
  });
});

// Get all inventory items
app.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) {
      console.error('Error fetching inventory:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add a new inventory item
app.post('/inventory', (req, res) => {
  const { description, quantity, purchase_price, rental, sale_price } = req.body;
  if (!description || quantity === undefined || purchase_price === undefined || rental === undefined || sale_price === undefined) {
    return res.status(400).send('All fields are required');
  }

  const query = 'INSERT INTO inventory (description, quantity, purchase_price, rental, sale_price) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [description, quantity, purchase_price, rental, sale_price], (err, result) => {
    if (err) {
      console.error('Error adding inventory item:', err);
      return res.status(500).send(err);
    }
    res.status(201).send({ id: result.insertId, description, quantity, purchase_price, rental, sale_price });
  });
});

// Update an inventory item
app.put('/inventory/:id', (req, res) => {
  const { id } = req.params;
  const { description, quantity, purchase_price, rental, sale_price } = req.body;
  if (!description || quantity === undefined || purchase_price === undefined || rental === undefined || sale_price === undefined) {
    return res.status(400).send('All fields are required');
  }

  const query = 'UPDATE inventory SET description = ?, quantity = ?, purchase_price = ?, rental = ?, sale_price = ? WHERE id = ?';
  db.query(query, [description, quantity, purchase_price, rental, sale_price, id], (err, result) => {
    if (err) {
      console.error('Error updating inventory item:', err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Inventory item not found');
    }
    res.send({ id, description, quantity, purchase_price, rental, sale_price });
  });
});

// Delete an inventory item
app.delete('/inventory/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM inventory WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting inventory item:', err);
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Inventory item not found');
    }
    res.sendStatus(204);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
