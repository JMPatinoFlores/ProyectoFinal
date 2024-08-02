import { User } from "src/entities/baseUser.entitity";
import { Booking } from "src/bookings/booking.entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { Review } from "src/reviews/reviews.entity";

@Entity({
  name: 'customers'
})
export class Customers extends User {
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean = false;

  @OneToMany((type) => Booking, (booking) => booking.customer)
  @JoinColumn()
  bookings: Booking[];

  @OneToMany((type) => Review, (reviews) => reviews.customer)
  @JoinColumn()
  reviews: Review[];
}
