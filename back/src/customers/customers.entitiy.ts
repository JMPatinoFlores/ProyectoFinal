import { Booking } from 'src/bookings/booking.entity';
import { User } from 'src/entities/baseUser.entitity';
import { Review } from 'src/reviews/reviews.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'customers',
})
export class Customers extends User {
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean = false;

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.customer)
  @JoinColumn({ name: 'review_id' })
  reviews: Review[];
}
