import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class SocialSite {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 255 })
  url: string;

  @Column('string', { nullable: false })
  user_id: string;

  @ManyToOne(() => User, (user) => user.socialSites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
