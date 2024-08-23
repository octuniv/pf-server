import { History } from 'src/resources/historys/history.entity';
import { setSeederFactory } from 'typeorm-extension';
import { config } from 'dotenv';

config({ path: '.env.variables' });

const SEP_LETTER = process.env.SEP_LETTER;
export default setSeederFactory(History, (faker) => {
  const history = new History();
  history.subtitle = faker.lorem.sentence();
  history.intro = faker.lorem.sentences(2, SEP_LETTER);
  history.content = faker.lorem.sentences(3, SEP_LETTER);

  return history;
});
