import { User } from 'src/entities/baseUser.entitity';
import { Review } from 'src/reviews/reviews.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'COSTUMERS',
})
export class Customers extends User {
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean = false;

  @OneToMany((type) => Review, (reviews) => reviews.customer)
  @JoinColumn()
  reviews: Review[];
}
