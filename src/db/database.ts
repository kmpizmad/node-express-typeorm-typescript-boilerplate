import 'reflect-metadata';
import {
  ConnectionOptions,
  createConnection,
  getConnection,
  getConnectionOptions,
} from 'typeorm';
import { yellow } from 'chalk';

export const connectToDatabase = async (name: string) => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions(name);
  return createConnection({ ...connectionOptions });
};

const connection = {
  async create(name: string) {
    const db = await (await getConnectionOptions(name)).database;
    await connectToDatabase(name || 'default');
    console.log(yellow('Connected to'), db);
  },
  async close(name: string) {
    await getConnection(name).close();
  },
  async clear(name: string) {
    const connection = await getConnection(name);
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
  async runMigrations(name: string) {
    await getConnection(name).runMigrations();
  },
};

export default connection;
