// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');


// Set up app and middleware
const app = express();
app.use(bodyParser.json());

// Define CRUD endpoints
// Create
app.post('/items', (req, res) => {
    const { name, description, price } = req.body;
    db.query('INSERT INTO items SET ?', { name, description, price }, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Item added with ID: ${result.insertId}`);
    });
});

// Read all
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results);
    });
});

// Read one
app.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    db.query('SELECT * FROM items WHERE id = ?', [itemId], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results[0]);
    });
});

// Update
app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const { name, description, price } = req.body;
    db.query('UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, itemId], (error, result) => {
        if (error) {
            throw error;
        }
        res.send(`Item modified with ID: ${itemId}`);
    });
});

// Delete
app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    db.query('DELETE FROM items WHERE id = ?', [itemId], (error, result) => {
        if (error) {
            throw error;
        }
        res.send(`Item deleted with ID: ${itemId}`);
    });
});

// Define search endpoint
app.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    db.query('SELECT * FROM items WHERE name LIKE ?', [`%${searchTerm}%`], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results);
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;