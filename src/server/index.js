const app = require('./server.js'); // Import the Express app from server.js

// Set the port for the application, defaulting to 8000 if not specified
const port = process.env.PORT || 8000;

// Log a message if the default port is being used
if (!process.env.PORT) {
    console.warn('No PORT environment variable set. Defaulting to port 8000.');
}

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    // Log a message indicating the server is running and the port it is using
    console.log(`App is running on port ${port}`);
}).on('error', (err) => {
    // Log an error message if there is an issue starting the server
    console.error('Error starting the server:', err);
});