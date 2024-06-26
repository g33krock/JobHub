const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

// Read the migration script from a file
const migrationScript = fs.readFileSync(path.join(__dirname, 'migration.sql'), 'utf-8');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'GassyPenguin16',
  database: 'EWork'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');

  // Execute the migration script
  connection.query(migrationScript, (err, results) => {
    if (err) {
      console.error('Error executing migration script:', err);
      return;
    }
    console.log('Migration script executed successfully.');
  });

  // Close the connection
  connection.end();
});
