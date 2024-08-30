import { PgPost } from 'src/resources/paragraphs/entities/pgPost.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(PgPost, (faker) => {
  const posts = new PgPost();
  posts.post = faker.lorem.sentence();

  return posts;
});
