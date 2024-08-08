import { RoomAvailability } from 'src/availabilities/availability.entity';
import { Hotel } from 'src/hotels/hotels.entity';
import { RoomsType } from 'src/roomstype/roomstype.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'rooms',
})
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  roomNumber: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToOne(() => RoomsType, (roomtype) => roomtype.rooms)
  @JoinColumn({ name: 'roomsTypeId' })
  roomtype: RoomsType;

  @OneToMany(
    () => RoomAvailability,
    (roomAvailability) => roomAvailability.room,
  )
  availabilities: RoomAvailability[];
}


// @Column({ type: 'boolean', default: true })
// isAvailable: boolean;