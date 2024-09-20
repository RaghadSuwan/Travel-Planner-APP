require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser middleware
const cors = require('cors'); // Import CORS middleware
const path = require('path'); // Import path module
const axios = require('axios'); // Import axios for HTTP requests
const app = express(); // Create an instance of an Express application

// API Keys
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY; // Get Pixabay API key
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY; // Get Weatherbit API key
const GEONAMES_API_KEY = process.env.GEONAMES_USERNAME; // Get Geonames API username

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static('dist')); // Serve static files from 'dist'

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html')); // Serve the main HTML file
});

// Fetch weather data using Weatherbit API
app.post('/getWeather', async (req, res) => {
    const { destination } = req.body; // Get destination from request body

    try {
        // Get latitude and longitude from Geonames API
        const geoURL = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(destination)}&maxRows=1&username=${GEONAMES_API_KEY}`;
        const geoResponse = await axios.get(geoURL); // Request Geonames API
        const geoData = geoResponse.data; // Response data

        if (geoData.geonames.length > 0) {
            const { lat, lng } = geoData.geonames[0]; // Extract coordinates

            // Get weather data from Weatherbit API
            const weatherURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`;
            const weatherResponse = await axios.get(weatherURL); // Request Weatherbit API
            const weatherData = weatherResponse.data; // Weather response data

            // Send temperature and description
            res.send({
                temp: weatherData.data[0].temp,
                description: weatherData.data[0].weather.description
            });
        } else {
            res.status(404).send({ error: 'Location not found' }); // Handle location not found
        }
    } catch (error) {
        console.error('Error fetching weather:', error.message); // Log error
        res.status(500).send({ error: `Failed to fetch weather: ${error.message}` }); // Error response
    }
});

// Fetch images from Pixabay
app.post('/getImage', async (req, res) => {
    const { destination } = req.body; // Get destination from request body

    // Construct Pixabay API URL
    const pixabayURL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(destination)}&image_type=photo&category=travel`;

    try {
        const response = await axios.get(pixabayURL); // Request Pixabay API
        const data = response.data; // Response data

        // Check for images
        if (data.hits && data.hits.length > 0) {
            res.send({ image: data.hits[0].webformatURL }); // Send image URL
        } else {
            res.send({ image: 'Image not found' }); // Handle no images found
        }
    } catch (error) {
        console.error('Error fetching image:', error.message); // Log error
        res.status(500).send({ error: `Failed to fetch image: ${error.message}` }); // Error response
    }
});

// Export the app for use in server.js
module.exports = app; // Export the Express app instance
