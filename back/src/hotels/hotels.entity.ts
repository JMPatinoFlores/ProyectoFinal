import { BookingDetails } from 'src/bookingDetails/booking-detail.entity';
import { HotelAdmins } from 'src/hotel-admins/hotelAdmins.entity';
import { Review } from 'src/reviews/reviews.entity';
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
  name: 'hotels',
})
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  address: string;

  @Column({ type: 'simple-json', default: [0, 0] })
  location: number[];

  @Column({ type: 'int' })
  totalRooms: number;

  @Column({ type: 'simple-json' })
  services: string[];

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'simple-json', default: [] })
  images: string[];

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  // @Column({type: 'varchar', length:300})
  // recommendations: string;

  @OneToMany((type) => RoomsType, (roomstype) => roomstype.hotel)
  @JoinColumn()
  roomstype: RoomsType[];

  @OneToMany((type) => Review, (reviews) => reviews.hotel)
  @JoinColumn()
  reviews: Review[];

  @ManyToOne(() => HotelAdmins, (hotelAdmin) => hotelAdmin.hotels)
  @JoinColumn({ name: 'hotel_admin_id' })
  hotelAdmin: HotelAdmins;

  @OneToMany(() => BookingDetails, (bookingDetails) => bookingDetails.hotel)
  bookingDetails: BookingDetails[];
}
