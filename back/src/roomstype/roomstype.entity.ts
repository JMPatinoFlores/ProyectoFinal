import { Hotel } from "src/hotels/hotels.entity";
import { Room } from "src/rooms/rooms.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
    name:'roomstype'
})
@Unique(['name', 'hotel'])
export class RoomsType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:"varchar", length:20, nullable:false})
    name:string;

    @Column({type:"int", nullable:false})
    capacity: number;

    @Column({type:"int", nullable:false})
    totalBathrooms: number;

    @Column({type:"int", nullable:false})
    totalBeds: number;

    @Column({type:"float", nullable: false})
    price: number;

    @Column({type:"simple-json", default:[]})
    images: string[];

    @Column({type:"boolean", default:false})
    isDeleted: boolean;

    @ManyToOne(() => Hotel, (hotel) => hotel.roomstype)
    @JoinColumn({name:'hotelId'})
    hotel: Hotel;

    @OneToMany((type) => Room, (rooms) => rooms.roomtype)
    @JoinColumn()
    rooms: Room[];

}