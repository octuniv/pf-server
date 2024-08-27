import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SocialSite } from '../entities/socialsite.entity';

const MakeUserEntityFaker = () => {
  const userFaker = new User();

  userFaker.name = faker.person.fullName();
  userFaker.email = faker.internet.email();
  userFaker.phone = faker.helpers.fromRegExp(/01[0-9]{1}-[0-9]{4}-[0-9]{4}/);

  return userFaker;
};

const MakeSocialSitesEntityFaker = (seq: number, user: User) => {
  const sites = new SocialSite();
  sites.id = seq;
  sites.url = faker.internet.url();
  sites.user = user;
  return sites;
};

export const MakeUserFaker = () => {
  const user = MakeUserEntityFaker();
  const sites = Array(3)
    .fill('')
    .map((_, i) => MakeSocialSitesEntityFaker(i, user));
  user.socialSites = sites;
  return user;
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
