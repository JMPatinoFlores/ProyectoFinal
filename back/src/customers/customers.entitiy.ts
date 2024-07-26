import { User } from 'src/entities/baseUser.entitity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'COSTUMERS',
})
export class Customers extends User {
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean = false;
}
