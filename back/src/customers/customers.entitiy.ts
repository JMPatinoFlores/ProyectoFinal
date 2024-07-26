import { Booking } from 'src/bookings/booking.entity';
import { User } from 'src/entities/baseUser.entitity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'COSTUMERS',
})
export class Customers extends User {
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean = false;

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[]
}
