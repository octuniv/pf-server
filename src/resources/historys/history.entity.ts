import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  subtitle: string;

  @Column('text')
  intro: string;

  @Column('text')
  content: string;

  @ManyToOne(() => Board, (Board) => Board.historys)
  board: Board;
}
