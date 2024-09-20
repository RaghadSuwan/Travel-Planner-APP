import axios from 'axios'; // Import axios for making HTTP requests

// Object to store default values for trip data
const tripData = {
    destination: '',
    startDate: '',
    endDate: '',
    temp: '',
    description: '',
    image: '',
    tripDuration: 0
};

// Main function to handle form submission
const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Update trip data from input fields
    tripData.destination = document.getElementById('destination').value;
    tripData.startDate = document.getElementById('date').value;
    tripData.endDate = document.getElementById('endDate').value;

    // Validate inputs
    if (!tripData.destination || !tripData.startDate || !tripData.endDate) {
        alert('Please fill in all fields.');
        return; // Exit if validation fails
    }

    // Calculate trip duration in days
    tripData.tripDuration = (new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24);

    // Show loading indicator
    document.getElementById('loader').style.display = 'block';

    try {
        // Fetch weather data using axios
        const weatherResponse = await axios.post('http://localhost:8000/getWeather', {
            destination: tripData.destination
        });
        const weatherData = weatherResponse.data;

        // Update page with fetched weather data
        if (weatherData) {
            tripData.temp = weatherData.temp;
            tripData.description = weatherData.description;
            document.getElementById('temp').innerText = `Temperature: ${tripData.temp}°C`;
            document.getElementById('description').innerText = `Description: ${tripData.description}`;
        }

        // Fetch destination image using axios
        const imageResponse = await axios.post('http://localhost:8000/getImage', {
            destination: tripData.destination
        });
        const imageData = imageResponse.data;

        // Display the image in the UI or alert if not found
        if (imageData.image) {
            tripData.image = imageData.image;
            document.getElementById('destinationImage').src = tripData.image;
        } else {
            document.getElementById('destinationImage').src = '';
            alert('Image not found for this destination.');
        }

        // Display trip duration in the UI
        document.getElementById('tripDuration').innerText = `Your trip is ${tripData.tripDuration} days long.`;

    } catch (error) {
        // Log error and display error message in UI
        console.log('Error:', error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerText = 'An error occurred while fetching data.';
    } finally {
        // Hide loading indicator once the process is complete
        document.getElementById('loader').style.display = 'none';
    }
};

// Export the handleSubmit function for use in index.js
export { handleSubmit };