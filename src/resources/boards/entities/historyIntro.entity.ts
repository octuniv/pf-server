import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { History } from './history.entity';

@Entity()
export class HistoryIntro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  intro!: string;

  @Column('int', { nullable: false })
  history_id!: number;

  @ManyToOne(() => History, (hist) => hist.intros, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'history_id' })
  history!: History;
}
