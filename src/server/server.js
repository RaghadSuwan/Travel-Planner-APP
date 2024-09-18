require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();

// احصل على مفتاح الـ API من متغيرات البيئة
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

// Routes
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

// Route for fetching images from Pixabay
app.post('/getImage', async (req, res) => {
    const { destination } = req.body;

    const pixabayURL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(destination)}&image_type=photo&category=travel`;

    try {
        const response = await axios.get(pixabayURL);
        const data = response.data;

        if (data.hits && data.hits.length > 0) {
            res.send({ image: data.hits[0].webformatURL });
        } else {
            res.send({ image: 'Image not found' });
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send({ error: 'Failed to fetch image' });
    }
});

// Start the server
app.listen(8000, function () {
    console.log('Server running on port 8000');
});
