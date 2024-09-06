import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1725610741464 implements MigrationInterface {
  name = 'initialMigration1725610741464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "social_site" ("id" SERIAL NOT NULL, "url" character varying(255) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_b21f5e18c32f9b7551eb0869b36" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "history_content" ("id" SERIAL NOT NULL, "content" text NOT NULL, "history_id" integer NOT NULL, CONSTRAINT "PK_6d3b5519fb966b9c15e977b1983" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "history" ("id" SERIAL NOT NULL, "subtitle" character varying(255) NOT NULL, "board_id" uuid NOT NULL, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "history_intro" ("id" SERIAL NOT NULL, "intro" character varying(255) NOT NULL, "history_id" integer NOT NULL, CONSTRAINT "PK_b8689b525b68e98ca9e5999e224" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "paragraph" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c4000792b02bf27771092e4e3c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pg_post" ("id" SERIAL NOT NULL, "post" text NOT NULL, "parag_id" uuid NOT NULL, CONSTRAINT "PK_645a331c465fa9fd1b497af6590" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_site" ADD CONSTRAINT "FK_5593bcd310340b9c82fe04592fb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "history_content" ADD CONSTRAINT "FK_35a6aa7ed2e1be596058d2d4dd4" FOREIGN KEY ("history_id") REFERENCES "history"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" ADD CONSTRAINT "FK_dcc084a58162d0fc739e9b552f4" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "history_intro" ADD CONSTRAINT "FK_2e8544a1733ba4419607dd0c770" FOREIGN KEY ("history_id") REFERENCES "history"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE "history_intro" DROP CONSTRAINT "FK_2e8544a1733ba4419607dd0c770"`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" DROP CONSTRAINT "FK_dcc084a58162d0fc739e9b552f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "history_content" DROP CONSTRAINT "FK_35a6aa7ed2e1be596058d2d4dd4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_site" DROP CONSTRAINT "FK_5593bcd310340b9c82fe04592fb"`,
    );
    await queryRunner.query(`DROP TABLE "pg_post"`);
    await queryRunner.query(`DROP TABLE "paragraph"`);
    await queryRunner.query(`DROP TABLE "history_intro"`);
    await queryRunner.query(`DROP TABLE "history"`);
    await queryRunner.query(`DROP TABLE "history_content"`);
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`DROP TABLE "social_site"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
