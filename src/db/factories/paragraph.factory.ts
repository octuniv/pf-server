import { setSeederFactory } from 'typeorm-extension';
import { Paragraph } from 'src/resources/paragraphs/entities/paragraph.entity';

export default setSeederFactory(Paragraph, (faker) => {
  const paragraph = new Paragraph();
  paragraph.title = faker.lorem.sentence();

  return paragraph;
});
