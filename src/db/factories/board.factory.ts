import { Board } from 'src/resources/boards/board.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Board, (faker) => {
  const board = new Board();
  board.title = faker.lorem.sentence();

  return board;
});
