import { setSeederFactory } from 'typeorm-extension';
import { Paragraph } from 'src/resources/paragraphs/paragraph.entity';

export default setSeederFactory(Paragraph, (faker) => {
  const paragraph = new Paragraph();
  paragraph.title = faker.lorem.sentence();
  paragraph.content = faker.lorem.sentence();

  return paragraph;
});
