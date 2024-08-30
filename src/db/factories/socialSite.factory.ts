import { setSeederFactory } from 'typeorm-extension';
import { SocialSite } from 'src/resources/users/entities/socialsite.entity';

export default setSeederFactory(SocialSite, (faker) => {
  const site = new SocialSite();
  site.url = faker.internet.url();
  return site;
});
