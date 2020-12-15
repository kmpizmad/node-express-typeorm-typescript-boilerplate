import { connectToDatabaseAsync } from '../db/database';

test('Database connected', async () => {
  expect(await (await connectToDatabaseAsync()).isConnected).toBeTruthy();
});
