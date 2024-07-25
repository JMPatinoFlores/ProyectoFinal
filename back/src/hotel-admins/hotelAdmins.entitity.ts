import { User } from 'src/entities/baseUser.entitity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'HOTEL_ADMINS',
})
export class HotelAdmins extends User {
  @Column({
    type: 'int',
    default: 0,
  })
  numberOfHotels: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  isAdmin: boolean = true;
}
