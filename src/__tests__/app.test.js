// src/tests/app.test.js
import { handleSubmit } from '../client/script/app.js';

// Mock fetch
global.fetch = jest.fn((url) => {
    if (url.includes('getWeather')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          temp: 25,
          description: 'Clear sky'
        })
      });
    } else if (url.includes('getImage')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          image: 'https://pixabay.com/image.jpg'
        })
      });
    }
    return Promise.reject(new Error('Network error'));
  });
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
        // Reset fetch mock before each test
        fetch.mockClear();
    });

    test('should fetch weather data and update DOM', async () => {
        // Mock fetch responses
        fetch
            .mockResolvedValueOnce({
                json: () => Promise.resolve({ temp: 25, description: 'Sunny' })
            })
            .mockResolvedValueOnce({
                json: () => Promise.resolve({ image: 'https://pixabay.com/sample-image.jpg' })
            });

        // Create a fake event to pass to the function
        const fakeEvent = {
            preventDefault: jest.fn()
        };

        // Call handleSubmit
        await handleSubmit(fakeEvent);

        // Assert that fetch was called twice
        expect(fetch).toHaveBeenCalledTimes(2);

        // Assert that the DOM was updated
        expect(document.getElementById('temp').innerText).toBe('Temperature: 25°C');
        expect(document.getElementById('description').innerText).toBe('Description: Sunny');
        expect(document.getElementById('destinationImage').src).toBe('https://pixabay.com/sample-image.jpg');
        expect(document.getElementById('tripDuration').innerText).toBe('Your trip is 5 days long.');
    });

    test('should show error if fetch fails', async () => {
        // Mock fetch to throw an error
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const fakeEvent = {
            preventDefault: jest.fn()
        };

        // Call handleSubmit
        await handleSubmit(fakeEvent);

        // Assert that the error message was shown
        expect(document.getElementById('error').style.display).toBe('block');
        expect(document.getElementById('error').innerText).toBe('An error occurred while fetching data.');

        // Assert that the loader is hidden
        expect(document.getElementById('loader').style.display).toBe('none');
    });
});






