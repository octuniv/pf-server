import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { HistoryIntro } from './historyIntro.entity';
import { HistoryContent } from './historyContent.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  subtitle!: string;

  @Column('uuid', { nullable: false })
  board_id!: string;

  @ManyToOne(() => Board, (Board) => Board.historys, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @OneToMany(() => HistoryIntro, (intro) => intro.history, {
    cascade: ['insert', 'update'],
  })
  intros: HistoryIntro[];

  @OneToMany(() => HistoryContent, (cnt) => cnt.history, {
    cascade: ['insert', 'update'],
  })
  contents: HistoryContent[];
}
