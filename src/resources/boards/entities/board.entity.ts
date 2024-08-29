import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { History } from './history.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @OneToMany(() => History, (History) => History.board, {
    cascade: ['insert', 'update'],
  })
  historys: History[];
}
