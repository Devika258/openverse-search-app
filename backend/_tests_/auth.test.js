const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
  it('should login successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'invalid@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
  });
});
