import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Paragraph } from 'src/resources/paragraphs/entities/paragraph.entity';

export default class ParagraphSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "paragraph" RESTART IDENTITY;');
    const paragraphFactory = factoryManager.get(Paragraph);
    await paragraphFactory.saveMany(3);
  }
}
