import { BookingDetails } from "src/bookingDetails/booking-detail.entity";
import { Review } from "src/reviews/reviews.entity";
import { RoomsType } from "src/roomstype/roomstype.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'hotels'
})
export class Hotel {
    @PrimaryGeneratedColumn('uuid')
    hotelId: string;

    @Column({type:"varchar", length:50, nullable:false, unique:true})
    name:string;

    @Column({type:"varchar", length:500, nullable:false})
    description: string;

    @Column({type:"varchar", length:50, nullable:false, unique:true})
    email:string

    @Column({type:"varchar", length:20, nullable:false})
    country:string;

    @Column({type:"varchar", length:20, nullable:false})
    city: string;

    @Column({type:"varchar", length:50, nullable:false})
    address: string;

    @Column({type:"simple-json", default:[0,0]})
    location: number[];

    @Column({type:"int"})
    totalRooms: number;

    @Column({type:"simple-json"})
    services: string[];

    @Column({type:"float", default:0})
    rating: number;

    @Column({type:"simple-json"})
    images: string[];

    @Column({type:"boolean", default:false})
    isDeleted: boolean;

    @OneToMany((type) => RoomsType, (roomstype) => roomstype.hotel)
    @JoinColumn()
    roomstype: RoomsType[];

    @OneToMany((type) => Review, (reviews) => reviews.hotel)
    @JoinColumn()
    reviews: Review[];


    // @ManyToOne(() => HotelAdmin, (hoteladmin) => hoteladmin.hotels)
    // @JoinColumn('hoteladminId')
    // hotelAdmin: HotelAdmin;

    @ManyToMany(() => BookingDetails, (bookingDetails) => bookingDetails.hotels)
    bookingDetails: BookingDetails[];



}