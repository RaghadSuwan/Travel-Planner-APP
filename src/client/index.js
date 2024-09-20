import { handleSubmit } from './script/app.js'; // Importing the handleSubmit function from app.js
import './styles/style.scss'; // Importing the SCSS file for styling

// Check if the form exists before adding the event listener
const travelForm = document.getElementById('travelForm');
if (travelForm) {
    // Add event listener to the form if it exists
    travelForm.addEventListener('submit', handleSubmit);
} else {
    // Log a warning if the form is not found
    console.warn('Form with ID "travelForm" not found.');
}