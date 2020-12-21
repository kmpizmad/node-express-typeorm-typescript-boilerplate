import { connectToDatabase } from '../../src/db/database';

test('Database connection established', async () => {
  expect(await (await connectToDatabase('test')).isConnected).toBeTruthy();
});
