import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1724664239936 implements MigrationInterface {
  name = 'PostRefactoring1724664239936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pg_post" ("id" SERIAL NOT NULL, "post" text NOT NULL, "parag_id" uuid NOT NULL, CONSTRAINT "PK_645a331c465fa9fd1b497af6590" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "paragraph" DROP COLUMN "content"`);
    await queryRunner.query(
      `ALTER TABLE "pg_post" ADD CONSTRAINT "FK_a899086a0e77a6443c8a1056a58" FOREIGN KEY ("parag_id") REFERENCES "paragraph"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pg_post" DROP CONSTRAINT "FK_a899086a0e77a6443c8a1056a58"`,
    );
    await queryRunner.query(`ALTER TABLE "paragraph" ADD "content" text`);
    await queryRunner.query(`DROP TABLE "pg_post"`);
  }
}
