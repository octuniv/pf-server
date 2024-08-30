import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1724736871452 implements MigrationInterface {
  name = 'PostRefactoring1724736871452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "social_site" DROP CONSTRAINT "FK_5593bcd310340b9c82fe04592fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_site" ADD CONSTRAINT "FK_5593bcd310340b9c82fe04592fb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "social_site" DROP CONSTRAINT "FK_5593bcd310340b9c82fe04592fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_site" ADD CONSTRAINT "FK_5593bcd310340b9c82fe04592fb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
