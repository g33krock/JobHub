const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'GassyPenguin16',
  database: 'EWork',
  port: 3306
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');

  // Query the users table
  connection.query('SELECT * FROM user', (err, results, fields) => {
    if (err) {
      console.error('Error fetching data from users table:', err);
      return;
    }
    console.log('Data from users table:', results);

    // Close the connection
    connection.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err);
        return;
      }
      console.log('Connection closed.');
    });
  });
});
