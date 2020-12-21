import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1608555678485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('admin', 10);
    await queryRunner.query(
      `INSERT IGNORE INTO yourdbname.users (id, username, email, password) VALUES ("superuser", "admin", "admin@admin.com", "${password}")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM yourdbname.users WHERE id = "superuser"`
    );
  }
}
