require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch math answers
app.get('/api/math', async (req, res) => {
    const question = req.query.q;
    const apiKey = process.env.WOLFRAM_API_KEY;

    if (!question) {
        return res.status(400).json({ error: 'No question provided' });
    }

    try {
        const wolframURL = `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(question)}&format=plaintext&output=JSON&appid=${apiKey}`;
        const response = await axios.get(wolframURL);
        const data = response.data;

        if (data.queryresult && data.queryresult.success) {
            res.json({ answer: data.queryresult.pods[1].subpods[0].plaintext });
        } else {
            res.status(404).json({ error: 'Could not find an answer' });
        }
    } catch (error) {
        console.error('Error fetching from Wolfram Alpha:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});