const mysql = require('mysql');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

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

  const migrationScript = `
    -- Drop existing tables if they exist
    DROP TABLE IF EXISTS transactions;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS inventory;

    -- Create the users table
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone VARCHAR(20),
      street_address VARCHAR(255),
      state VARCHAR(50),
      city VARCHAR(50),
      zip VARCHAR(10),
      vendor BOOLEAN NOT NULL
    );

    -- Seed the users table
    INSERT INTO users (first_name, last_name, email, phone, street_address, state, city, zip, vendor) VALUES
    ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Elm St', 'NY', 'New York', '10001', false),
    ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '456 Oak St', 'CA', 'Los Angeles', '90001', false),
    ('Vendor', 'One', 'vendor.one@example.com', '111-222-3333', '789 Pine St', 'TX', 'Houston', '77001', true),
    ('Vendor', 'Two', 'vendor.two@example.com', '444-555-6666', '101 Maple St', 'FL', 'Miami', '33101', true);

    -- Create the inventory table
    CREATE TABLE IF NOT EXISTS inventory (
      id INT AUTO_INCREMENT PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      quantity INT NOT NULL,
      purchase_price DECIMAL(10, 2) NOT NULL,
      rental BOOLEAN NOT NULL,
      sale_price DECIMAL(10, 2) NOT NULL
    );

    -- Seed the inventory table
    INSERT INTO inventory (description, quantity, purchase_price, rental, sale_price) VALUES
    ('Item A', 10, 5.00, false, 10.00),
    ('Item B', 5, 3.00, true, 6.00),
    ('Item C', 20, 2.50, false, 5.00),
    ('Item D', 15, 1.75, true, 3.50);

    -- Create the transactions table
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      vendor_id INT,
      customer_id INT,
      item_id INT,
      quantity INT,
      total DECIMAL(10, 2),
      transaction_date DATETIME,
      FOREIGN KEY (vendor_id) REFERENCES users(id),
      FOREIGN KEY (customer_id) REFERENCES users(id),
      FOREIGN KEY (item_id) REFERENCES inventory(id)
    );
  `;

  db.query(migrationScript, (err, result) => {
    if (err) {
      console.error('Error executing migration script:', err);
      return;
    }
    console.log('Migration script executed successfully.');
    db.end();
  });
});
