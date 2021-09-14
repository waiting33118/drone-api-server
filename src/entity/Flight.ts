import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'Flight' })
export class Flight {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'json', nullable: true })
  record!: string;

  @ManyToOne(() => User, (user) => user.flights, { cascade: true })
  user!: User;
}
