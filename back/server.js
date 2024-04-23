// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000;

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '*****',
  database: 'book_store'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

app.use(cors())


// Define routes
app.get('/books', (req, res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    if (err) throw err;
    const result = res.json(results)
    console.log(result)
  });
});

app.post('/users', (req, res) => {
    const { username, email, password, address, role } = req.body;
  
    connection.query('INSERT INTO users (username, email, password, address, role) VALUES (?, ?, ?, ?, ?)', 
                     [username, email, password, address, role], 
                     (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: 'Error inserting user' });
      } else {
        console.log("User inserted successfully");
        res.status(200).json({ success: true });
      }
    });
  });

// Add more routes for CRUD operations as needed

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
