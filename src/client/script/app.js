const handleSubmit = async (event) => {
    event.preventDefault();

    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('date').value;
    const endDate = document.getElementById('endDate').value;

    // Calculate trip duration
    const tripDuration = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    document.getElementById('loader').style.display = 'block';

    try {
        // Fetch weather data
        const weatherResponse = await fetch('http://localhost:8000/getWeather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination })
        });
        const weatherData = await weatherResponse.json();

        // Update the weather information on the page
        if (weatherData) {
            document.getElementById('temp').innerText = `Temperature: ${weatherData.temp}°C`;
            document.getElementById('description').innerText = `Description: ${weatherData.description}`;
        }

        // Fetch image
        const imageResponse = await fetch('http://localhost:8000/getImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination })
        });
        const imageData = await imageResponse.json();

        // Display the image
        if (imageData.image) {
            document.getElementById('destinationImage').src = imageData.image;
        } else {
            document.getElementById('destinationImage').src = '';
            alert('Image not found for this destination.');
        }

        // Display trip duration
        document.getElementById('tripDuration').innerText = `Your trip is ${tripDuration} days long.`;

    } catch (error) {
        console.log('Error:', error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerText = 'An error occurred while fetching data.';
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
};

export { handleSubmit };
