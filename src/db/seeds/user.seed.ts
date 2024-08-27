import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/resources/users/entities/user.entity';
import { SocialSite } from 'src/resources/users/entities/socialsite.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "user" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "social_site" RESTART IDENTITY;');
    const userFactory = factoryManager.get(User);
    const socialSiteFactory = factoryManager.get(SocialSite);
    const users = await userFactory.saveMany(1);
    users.forEach(
      async (user) => await socialSiteFactory.saveMany(3, { user }),
    );
  }
}
