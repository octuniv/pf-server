import { History } from 'src/resources/historys/history.entity';
import { setSeederFactory } from 'typeorm-extension';
import { config } from 'dotenv';

config({ path: '.env.variables' });

const sepLetter = process.env.SEP_LETTER;
export default setSeederFactory(History, (faker) => {
  const history = new History();
  history.subtitle = faker.lorem.sentence();
  history.intro = faker.lorem.sentences(2, sepLetter);
  history.content = faker.lorem.sentences(3, sepLetter);

  return history;
});
