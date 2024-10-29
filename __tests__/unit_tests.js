/**
 * @group unit
 */
require('dotenv').config({ path: './.env.test' });


describe('jest', () => {
  describe('unit test', () => {
    it('should work', () => {
      expect(true).toBe(true);
    });
  });
});
