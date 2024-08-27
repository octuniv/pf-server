import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1724749776835 implements MigrationInterface {
  name = 'PostRefactoring1724749776835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pg_post" DROP CONSTRAINT "FK_a899086a0e77a6443c8a1056a58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pg_post" ADD CONSTRAINT "FK_a899086a0e77a6443c8a1056a58" FOREIGN KEY ("parag_id") REFERENCES "paragraph"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pg_post" DROP CONSTRAINT "FK_a899086a0e77a6443c8a1056a58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pg_post" ADD CONSTRAINT "FK_a899086a0e77a6443c8a1056a58" FOREIGN KEY ("parag_id") REFERENCES "paragraph"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
