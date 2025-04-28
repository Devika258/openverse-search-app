const request = require('supertest');
const app = require('../server');

describe('Authentication Endpoints', () => {
  
  it('should login successfully with valid credentials and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'invalid@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

});
