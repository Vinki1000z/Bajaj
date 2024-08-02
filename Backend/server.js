require('dotenv').config();
const express = require("express");
const app = express();
const port = 5000;

// cors setup
const cors=require("cors");
app.use(cors());


app.use(express.json());

// post endpoints
app.post('/bfhl', (req, res) => {
    const userId = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const rollNumber = 'ABCD123';
    const data = req.body.data || [];

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

    const highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    });
});


// GET Endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
