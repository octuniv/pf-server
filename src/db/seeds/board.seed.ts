import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Board } from 'src/resources/boards/board.entity';
import { History } from 'src/resources/historys/history.entity';

export default class BoardSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "board" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "history" RESTART IDENTITY;');

    const historyRepository = dataSource.getRepository(History);
    const boardFactory = factoryManager.get(Board);
    const historyFactory = factoryManager.get(History);

    const board = await boardFactory.save();
    const historys = await Promise.all(
      Array(5)
        .fill('')
        .map(async () => {
          const history = await historyFactory.make({
            board: board,
          });
          return history;
        }),
    );
    await historyRepository.save(historys);
  }
}
