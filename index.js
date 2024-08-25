const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Initialize arrays to store numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    // Process each item in the data array
    data.forEach(item => {
        if (!isNaN(item)) {
            // If the item is a number
            numbers.push(item);
        } else if (typeof item === 'string') {
            // If the item is an alphabet
            alphabets.push(item);

            // Check for lowercase alphabet and track the highest
            if (item >= 'a' && item <= 'z' && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    // Prepare the response
    const response = {
        is_success: true,
        user_id: "john_doe_17091999",  // Replace with your actual name and DOB
        email: "john@xyz.com",          // Replace with your actual email
        roll_number: "ABCD123",         // Replace with your actual roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    // Send the response as JSON
    res.status(200).json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
