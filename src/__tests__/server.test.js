const request = require('supertest'); // Import supertest for HTTP assertions
const app = require('../server/server.js'); // Import the server app

describe('API Endpoints', () => {
  it('should return the homepage', async () => {
    const res = await request(app).get('/'); // Make a GET request to the homepage

    // Check if the homepage returns a successful response
    expect(res.statusCode).toEqual(200); // Expect HTTP status 200
    expect(res.headers['content-type']).toMatch(/html/); // Expect content type to be HTML
  });

  it('should fetch weather data', async () => {
    const res = await request(app)
      .post('/getWeather') // Make a POST request to fetch weather data
      .send({ destination: 'London' }); // Send destination in the request body
    
    // Assert that the weather data response is successful
    expect(res.statusCode).toEqual(200); // Expect HTTP status 200
    expect(res.body).toHaveProperty('temp'); // Expect response to have 'temp' property
    expect(res.body).toHaveProperty('description'); // Expect response to have 'description' property
  });

  it('should fetch image data', async () => {
    const res = await request(app)
      .post('/getImage') // Make a POST request to fetch image data
      .send({ destination: 'Paris' }); // Send destination in the request body

    // Assert that the image data response is successful
    expect(res.statusCode).toEqual(200); // Expect HTTP status 200
    expect(res.body).toHaveProperty('image'); // Expect response to have 'image' property
  });

  it('should return 404 for unknown location', async () => {
    const res = await request(app)
      .post('/getWeather') // Make a POST request for weather data
      .send({ destination: 'UnknownPlace' }); // Send an unknown location

    // Assert that a 404 error is returned for an unknown location
    expect(res.statusCode).toEqual(404); // Expect HTTP status 404
    expect(res.body).toHaveProperty('error', 'Location not found'); // Expect error message in response
  });
});
