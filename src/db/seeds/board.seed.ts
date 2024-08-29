import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Board } from 'src/resources/boards/entities/board.entity';

export default class BoardSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "board" RESTART IDENTITY CASCADE;');
    const boardFactory = factoryManager.get(Board);
    await boardFactory.saveMany(3);
  }
}
