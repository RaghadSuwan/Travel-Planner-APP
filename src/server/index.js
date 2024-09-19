const app = require('./server.js');

// Set the port for the application, defaulting to 8000 if not specified
const port = process.env.PORT || 8000;

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});
