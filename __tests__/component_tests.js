/**
 * @group component
 */
require('dotenv').config({ path: './.env.test' });
const request = require('supertest')
const app = require('../src/app')

describe('When testing /', () => {
  describe('GET', () => {
    it('should work', async () => {
      const res = await request(app)
          .get('/')
      expect(res.statusCode).toEqual(200);
    });
  });
});
