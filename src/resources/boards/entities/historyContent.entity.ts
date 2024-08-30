import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { History } from './history.entity';

@Entity()
export class HistoryContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content!: string;

  @Column('int', { nullable: false })
  history_id!: number;

  @ManyToOne(() => History, (hist) => hist.contents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'history_id' })
  history!: History;
}
