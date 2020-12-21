import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTest1608418528785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('testing123', 10);
    await queryRunner.query(
      `INSERT INTO yourtestdbname.users (id, username, email, password) VALUES ("test-id", "testuser", "test@testing.com", "${password}")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM yourtestdbname.users WHERE id = "test-id"`
    );
  }
}
