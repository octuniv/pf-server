import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paragraph {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
