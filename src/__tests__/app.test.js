import { handleSubmit } from '../client/script/app.js';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock DOM elements
document.body.innerHTML = `
    <form>
        <input id="destination" value="Paris" />
        <input id="date" value="2024-09-20" />
        <input id="endDate" value="2024-09-25" />
        <button id="submit">Submit</button>
    </form>
    <div id="loader" style="display: none;"></div>
    <div id="temp"></div>
    <div id="description"></div>
    <img id="destinationImage" />
    <div id="tripDuration"></div>
    <div id="error" style="display: none;"></div>
`;

describe('handleSubmit', () => {
    beforeEach(() => {
        // Reset axios mock before each test
        axios.post.mockClear();
    });

    test('should fetch weather data and update DOM', async () => {
        // Mock axios responses for weather and image
        axios.post
            .mockResolvedValueOnce({
                data: { temp: 25, description: 'Sunny' }
            })
            .mockResolvedValueOnce({
                data: { image: 'https://pixabay.com/sample-image.jpg' }
            });

        // Create a fake event to simulate form submission
        const fakeEvent = {
            preventDefault: jest.fn()
        };

        // Call handleSubmit function
        await handleSubmit(fakeEvent);

        // Assert that axios.post was called twice for weather and image
        expect(axios.post).toHaveBeenCalledTimes(2);

        // Assert that the DOM was updated with the fetched data
        expect(document.getElementById('temp').innerText).toBe('Temperature: 25°C');
        expect(document.getElementById('description').innerText).toBe('Description: Sunny');
        expect(document.getElementById('destinationImage').src).toBe('https://pixabay.com/sample-image.jpg');
        expect(document.getElementById('tripDuration').innerText).toBe('Your trip is 5 days long.');
    });

    test('should show error if axios fails', async () => {
        // Mock axios to throw an error for testing error handling
        axios.post.mockRejectedValueOnce(new Error('Network error'));

        const fakeEvent = {
            preventDefault: jest.fn()
        };

        // Call handleSubmit function
        await handleSubmit(fakeEvent);

        // Assert that the error message was shown in the DOM
        expect(document.getElementById('error').style.display).toBe('block');
        expect(document.getElementById('error').innerText).toBe('An error occurred while fetching data.');

        // Assert that the loader is hidden
        expect(document.getElementById('loader').style.display).toBe('none');
    });
});
