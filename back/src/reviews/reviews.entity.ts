
import { Customers } from "src/customers/customers.entity";
import { Hotel } from "src/hotels/hotels.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name:'reviews'
})
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:"varchar", length:100, nullable:false})
    comment: string;

    @Column({type:"varchar", length:20, nullable:false})
    date: string;

    @Column({type:"float", default:0})
    rating: number;

    @Column({type:"boolean", default:false})
    isDeleted: boolean;

    @ManyToOne(() => Hotel, (hotel) => hotel.reviews)
    @JoinColumn({name:'hotelId'})
    hotel: Hotel;

    @ManyToOne(() => Customers, (customer) => customer.reviews)
    @JoinColumn({name:'customerId'})
    customer: Customers;
    
}