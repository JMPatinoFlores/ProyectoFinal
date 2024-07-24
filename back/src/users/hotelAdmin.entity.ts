import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'HOTEL_ADMINS',
})
export class HotelAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId ' })
  user: User;

  @Column({
    type: 'int',
    default: 0,
  })
  numberOfHotels: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  isAdmin: boolean;
}
