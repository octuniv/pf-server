import { Board } from 'src/resources/boards/entities/board.entity';
import { History } from 'src/resources/boards/entities/history.entity';
import { HistoryContent } from 'src/resources/boards/entities/historyContent.entity';
import { HistoryIntro } from 'src/resources/boards/entities/historyIntro.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Board, (faker) => {
  const board = new Board();
  board.title = faker.lorem.sentence();
  board.historys = Array(2)
    .fill('')
    .map(() => {
      const history = new History();
      history.subtitle = faker.lorem.sentence();
      history.intros = Array(2)
        .fill('')
        .map(() => {
          const historyIntro = new HistoryIntro();
          historyIntro.intro = faker.lorem.sentence();
          return historyIntro;
        });
      history.contents = Array(3)
        .fill('')
        .map(() => {
          const historyContent = new HistoryContent();
          historyContent.content = faker.lorem.sentence();
          return historyContent;
        });
      return history;
    });

  return board;
});
