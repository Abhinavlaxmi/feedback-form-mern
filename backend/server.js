const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4040;     // I set port 4040

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'C9',
  database: 'reviews_data',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(cors());
app.use(bodyParser.json());

// Method to save review data
app.post('/api/save-reviews', (req, res) => {
  const {
    frequency,
    goals,
    rating,
    improvements,
    birthday,
  } = req.body;
  console.log(JSON.stringify(goals), "Goals")
  console.log(req.body, "Request....")
  
  const sql = 'INSERT INTO reviews (frequency, goals, rating, improvements, birthday) VALUES (?, ?, ?, ?, ?)';
  console.log(sql, "SQL response")
  db.query(sql, [frequency, JSON.stringify(goals), rating, improvements, birthday], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Error saving review data' });
    } else {
      console.log('Review data saved successfully');
      res.status(200).json({ message: 'Review data saved successfully' });
    }
  });
});

// Endpoint to retrieve review data
app.get('/api/reviews', (req, res) => {
  const sql = 'SELECT * FROM reviews';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ message: 'Error retrieving review data' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);  //Here I have show on which port this assignment run
});
