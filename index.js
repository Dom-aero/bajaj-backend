const express = require('express');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configure CORS
app.use(cors({
    origin: 'https://bajaj-frontend-bice-one.vercel.app', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Enable preflight requests for all routes
app.options('*', cors());

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item >= 'a' && item <= 'z' && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    const response = {
        is_success: true,
        user_id: "your_full_name_ddmmyyyy",
        email: "your_email@college.com",
        roll_number: "your_roll_number",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };

    res.status(200).json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
