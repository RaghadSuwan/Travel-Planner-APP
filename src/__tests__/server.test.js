const request = require('supertest');
const app = require('../server/server.js'); 
describe('API Endpoints', () => {
  it('should return the homepage', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  it('should fetch weather data', async () => {
    const res = await request(app)
      .post('/getWeather')
      .send({ destination: 'London' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('temp');
    expect(res.body).toHaveProperty('description');
  });

  it('should fetch image data', async () => {
    const res = await request(app)
      .post('/getImage')
      .send({ destination: 'Paris' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('image');
  });

  it('should return 404 for unknown location', async () => {
    const res = await request(app)
      .post('/getWeather')
      .send({ destination: 'UnknownPlace' });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Location not found');
  });
});
