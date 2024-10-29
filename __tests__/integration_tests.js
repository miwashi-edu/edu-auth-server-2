/**
 * @group integration
 */
require('dotenv').config({ path: './.env.test' });
const request = require('supertest')
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || `http://localhost:${PORT}`;
const container = request(HOST);

describe('When testing /', () => {
  describe('GET', () => {
    it('should work', async () => {
      const res = await container.get('/');
      expect(res.statusCode).toEqual(200);
    });
  });
});
