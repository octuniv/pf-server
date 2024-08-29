import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PgPost } from './pgPost.entity';

@Entity()
export class Paragraph {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @OneToMany(() => PgPost, (pgPost) => pgPost.paragraph, {
    cascade: ['insert', 'update'],
  })
  posts: PgPost[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
