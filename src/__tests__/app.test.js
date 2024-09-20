import axios from 'axios'; // Import the axios library
import { handleSubmit } from '../client/script/app'; // Import the handleSubmit function

// Mock axios using Jest
jest.mock('axios');

describe('Test handleSubmit function', () => {
    let event; // Define the event variable

    beforeEach(() => {
        // Set up a mock event for the form
        event = {
            preventDefault: jest.fn(), // Mock the preventDefault function
        };

        // Set up a mock DOM for HTML elements
        document.body.innerHTML = `
            <form id="travelForm">
                <input type="text" id="destination" value="Paris"/>
                <input type="date" id="date" value="2023-09-20"/>
                <input type="date" id="endDate" value="2023-09-25"/>
            </form>
            <div id="loader" style="display: none;"></div>
            <div id="temp"></div>
            <div id="description"></div>
            <img id="destinationImage" src="" alt="Destination Image"/>
            <div id="tripDuration"></div>
            <div id="error" style="display: none;"></div>
        `;
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should display weather and image data when APIs return valid data', async () => {
        // Mock weather response data
        const mockWeatherResponse = {
            data: {
                temp: 20,
                description: 'Clear sky'
            }
        };

        // Mock image response data
        const mockImageResponse = {
            data: {
                image: 'https://example.com/paris.jpg'
            }
        };

        // Mock axios requests
        axios.post
            .mockResolvedValueOnce({ data: mockWeatherResponse.data })  // Mock weather API response
            .mockResolvedValueOnce({ data: mockImageResponse.data });   // Mock image API response

        await handleSubmit(event); // Call the handleSubmit function

        // Check if the data is displayed on the page
        expect(document.getElementById('temp').innerText).toBe('Temperature: 20°C');
        expect(document.getElementById('description').innerText).toBe('Description: Clear sky');
        expect(document.getElementById('destinationImage').src).toBe('https://example.com/paris.jpg');
        expect(document.getElementById('tripDuration').innerText).toBe('Your trip is 5 days long.');
    });

    test('should display error message when API request fails', async () => {
        // Mock an API error
        axios.post.mockRejectedValue(new Error('API request failed')); // Mock failed response

        await handleSubmit(event); // Call the handleSubmit function

        // Check if the error message is displayed
        expect(document.getElementById('error').style.display).toBe('block');
        expect(document.getElementById('error').innerText).toBe('An error occurred while fetching data.');
    });

    test('should calculate trip duration correctly', async () => {
        // Mock weather and image API responses
        const mockWeatherResponse = { data: { temp: 20, description: 'Clear sky' } };
        const mockImageResponse = { data: { image: 'https://example.com/paris.jpg' } };

        axios.post
            .mockResolvedValueOnce({ data: mockWeatherResponse.data }) // Mock weather API response
            .mockResolvedValueOnce({ data: mockImageResponse.data }); // Mock image API response

        await handleSubmit(event); // Call the handleSubmit function

        // Check if the trip duration is calculated correctly
        expect(document.getElementById('tripDuration').innerText).toBe('Your trip is 5 days long.');
    });
});
