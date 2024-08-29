import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1724918300862 implements MigrationInterface {
  name = 'PostRefactoring1724918300862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query('TRUNCATE "board" RESTART IDENTITY CASCADE;');
    // await queryRunner.query('TRUNCATE "history" RESTART IDENTITY;');
    await queryRunner.query(
      `ALTER TABLE "history" DROP CONSTRAINT "FK_ef75b5a7c77f8f79826deec4ad3"`,
    );
    await queryRunner.query(
      `CREATE TABLE "history_content" ("id" SERIAL NOT NULL, "content" text NOT NULL, "history_id" integer NOT NULL, CONSTRAINT "PK_6d3b5519fb966b9c15e977b1983" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "history_intro" ("id" SERIAL NOT NULL, "intro" character varying(255) NOT NULL, "history_id" integer NOT NULL, CONSTRAINT "PK_b8689b525b68e98ca9e5999e224" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "intro"`);
    await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "content"`);
    await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "boardId"`);
    await queryRunner.query(
      `ALTER TABLE "history" ADD "board_id" uuid NOT NULL`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "history_intro" DROP CONSTRAINT "FK_2e8544a1733ba4419607dd0c770"`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" DROP CONSTRAINT "FK_dcc084a58162d0fc739e9b552f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "history_content" DROP CONSTRAINT "FK_35a6aa7ed2e1be596058d2d4dd4"`,
    );
    await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "board_id"`);
    await queryRunner.query(`ALTER TABLE "history" ADD "boardId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "history" ADD "content" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "history" ADD "intro" text NOT NULL`);
    await queryRunner.query(`DROP TABLE "history_intro"`);
    await queryRunner.query(`DROP TABLE "history_content"`);
    await queryRunner.query(
      `ALTER TABLE "history" ADD CONSTRAINT "FK_ef75b5a7c77f8f79826deec4ad3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
