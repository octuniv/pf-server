import { setSeederFactory } from 'typeorm-extension';
import { User } from 'src/resources/users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  user.phone = faker.helpers.fromRegExp(/01[0-9]{1}-[0-9]{4}-[0-9]{4}/);

  return user;
});
