const supertest = require('supertest');
const { describe, it, expect } = require('jest');

const app = require('../app');

const request = supertest(app);

describe('тест запросов', () => {
  it('get /', () => {
    request.get('/').tnen((res) => {
      expect(res.status).toBe(200);
    });
  });
});
