import server from '../../server/server';
import supertest from 'supertest';
import connection from '../../db/database';
import { environment } from '../../utils/constants';

beforeAll(async () => {
  await connection.create(environment());
  await connection.runMigrations(environment());
});

afterAll(async () => {
  await connection.close(environment());
});

describe('User controllers', () => {
  it('POST /auth/register - works', async () => {
    const { body } = await supertest(server).post('/auth/register').send({
      username: 'testuser1',
      email: 'test@test.com',
      password: 'testing123',
    });
    expect(body.ok).toBeTruthy();
  });
  it('GET /api/users/test-id - works', async () => {
    const { body } = await supertest(server).get('/api/users/test-id');
    expect(body.id).toBe('test-id');
  });
  it('PATCH /api/users/test-id - works', async () => {
    const { body } = await supertest(server).patch('/api/users/test-id').send({
      password: 'changed',
    });
    expect(body.data.id).toEqual('test-id');
  });
});
