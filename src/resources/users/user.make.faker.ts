import { faker } from '@faker-js/faker';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { config } from 'dotenv';

config({ path: '.env.variables' });

const sepLetter = process.env.SEP_LETTER;

export const MakeUserFakerEntity = () => {
  const userFaker = new User();

  userFaker.name = faker.person.fullName();
  userFaker.email = faker.internet.email();
  userFaker.phone = faker.helpers.fromRegExp(/01[0-9]{1}-[0-9]{4}-[0-9]{4}/);
  userFaker.socialSites = faker.internet.url();

  return userFaker;
};

export const MakeUserFakerDto = () => {
  const userDtoFaker: UpdateUserDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.helpers.fromRegExp(/01[0-9]{1}-[0-9]{4}-[0-9]{4}/),
    socialSites: Array(3)
      .fill('')
      .map(() => faker.internet.url())
      .join(sepLetter),
  };

  return userDtoFaker;
};

export const MakeFakerUUID = () => {
  return faker.string.uuid();
};
