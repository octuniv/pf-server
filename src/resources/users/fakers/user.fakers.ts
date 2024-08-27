import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export const MakeUserEntityFaker = () => {
  const userFaker = new User();

  userFaker.name = faker.person.fullName();
  userFaker.email = faker.internet.email();
  userFaker.phone = faker.helpers.fromRegExp(/01[0-9]{1}-[0-9]{4}-[0-9]{4}/);
  // userFaker.socialSites = faker.internet.url();

  return userFaker;
};

export const MakeUserDtoFaker = () => {
  const userDtoFaker: UpdateUserDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.helpers.fromRegExp(/01[0-9]{1}-[0-9]{4}-[0-9]{4}/),
    socialSites: Array(3)
      .fill('')
      .map(() => faker.internet.url()),
  };

  return userDtoFaker;
};

export const MakeUUIDFaker = () => {
  return faker.string.uuid();
};
