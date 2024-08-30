import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Paragraph } from 'src/resources/paragraphs/entities/paragraph.entity';
import { PgPost } from 'src/resources/paragraphs/entities/pgPost.entity';

export default class ParagraphSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "paragraph" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "pg_post" RESTART IDENTITY;');
    const paragraphFactory = factoryManager.get(Paragraph);
    const pgPostsFactory = factoryManager.get(PgPost);
    const paragraphs = await paragraphFactory.saveMany(3);
    paragraphs.forEach(
      async (paragraph) => await pgPostsFactory.saveMany(3, { paragraph }),
    );
  }
}
