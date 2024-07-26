import { Hotel } from "src/hotels/hotels.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'reviews'
})
export class Review {
    @PrimaryGeneratedColumn('uuid')
    reviewId: string;

    @Column({type:"varchar", length:100, nullable:false})
    coment: string;

    @Column({type:"varchar", length:20, nullable:false})
    date: string;

    @Column({type:"float", default:0})
    rating: number;

    @Column({type:"boolean", default:false})
    isDeleted: boolean;

    @ManyToOne(() => Hotel, (hotel) => hotel.reviews)
    @JoinColumn({name:'hotel_id'})
    hotel: Hotel;

    
}