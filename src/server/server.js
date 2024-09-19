require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();

// API Keys
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const GEONAMES_API_KEY = process.env.GEONAMES_USERNAME;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

// Routes
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

// Fetch weather data using Weatherbit API
app.post('/getWeather', async (req, res) => {
    const { destination } = req.body;

    try {
        // Get latitude and longitude from Geonames API
        const geoURL = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(destination)}&maxRows=1&username=${GEONAMES_API_KEY}`;
        const geoResponse = await axios.get(geoURL);



        const geoData = geoResponse.data;

        if (geoData.geonames.length > 0) {
            const { lat, lng } = geoData.geonames[0];

            // Use Weatherbit API to get weather data
            const weatherURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`;
            const weatherResponse = await axios.get(weatherURL);
            const weatherData = weatherResponse.data;

            res.send({
                temp: weatherData.data[0].temp,
                description: weatherData.data[0].weather.description
            });
        } else {
            res.status(404).send({ error: 'Location not found' });
        }
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        res.status(500).send({ error: `Failed to fetch weather: ${error.message}` });
    }
});

// Fetch images from Pixabay
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
        console.error('Error fetching image:', error.message);
        res.status(500).send({ error: `Failed to fetch image: ${error.message}` });
    }
});

// Export the app for use in server.js
module.exports = app;
