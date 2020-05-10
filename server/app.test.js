const request = require('supertest');
const app = require('./app');

test('renders cra app', async () => {
  const response = await request(app).get('');
  expect(response.statusCode).toBe(200);
  expect(response.type).toBe('text/html');
});

test.each(['E', 'F', 'J', 'K'])('returns file %s', async (lang) => {
  const response = await request(app).get(`/${lang}/1.1`);
  expect(response.statusCode).toBe(200);

  const json = JSON.parse(response.body.toString('utf8'));
  const expected = ['a', 'b', 'c'].map((a) => `${a}.${lang}.1.1`);
  expect(json).toStrictEqual(expected);
});
