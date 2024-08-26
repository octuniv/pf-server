import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Paragraph } from './paragraph.entity';

@Entity()
export class PgPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  post: string;

  @Column('string', { nullable: false })
  parag_id: string;

  @ManyToOne(() => Paragraph, (paragraph) => paragraph.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parag_id' })
  paragraph: Paragraph;
}
