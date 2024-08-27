import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SocialSite } from './socialsite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 100 })
  phone: string;

  @OneToMany(() => SocialSite, (site) => site.user)
  socialSites: SocialSite[];
}
