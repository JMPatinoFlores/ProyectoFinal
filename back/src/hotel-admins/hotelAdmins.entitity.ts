import { User } from 'src/entities/baseUser.entitity';
import { Hotel } from 'src/hotels/hotels.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

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

  @OneToMany((type) => Hotel, (hotel) => hotel.hotelAdmin)
  @JoinColumn()
  hotels: Hotel[]; 
}
