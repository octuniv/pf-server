import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1724729195959 implements MigrationInterface {
  name = 'PostRefactoring1724729195959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "social_site" ("id" SERIAL NOT NULL, "url" character varying(255) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_b21f5e18c32f9b7551eb0869b36" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "socialSites"`);
    await queryRunner.query(
      `ALTER TABLE "social_site" ADD CONSTRAINT "FK_5593bcd310340b9c82fe04592fb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "social_site" DROP CONSTRAINT "FK_5593bcd310340b9c82fe04592fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "socialSites" text NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "social_site"`);
  }
}
