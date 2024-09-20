const request = require('supertest');
const app = require('../server/server.js'); 

describe('API Endpoints', () => {
  it('should return the homepage', async () => {
    const res = await request(app).get('/');
    // Check if the homepage returns a successful response
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  it('should fetch weather data', async () => {
    const res = await request(app)
      .post('/getWeather')
      .send({ destination: 'London' });
    
    // Assert that the weather data response is successful
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('temp');
    expect(res.body).toHaveProperty('description');
  });

  it('should fetch image data', async () => {
    const res = await request(app)
      .post('/getImage')
      .send({ destination: 'Paris' });

    // Assert that the image data response is successful
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('image');
  });

  it('should return 404 for unknown location', async () => {
    const res = await request(app)
      .post('/getWeather')
      .send({ destination: 'UnknownPlace' });

    // Assert that a 404 error is returned for an unknown location
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Location not found');
  });
});
