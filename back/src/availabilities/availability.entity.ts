import { Room } from 'src/rooms/rooms.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class RoomAvailability {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @ManyToOne(() => Room, room => room.availabilities)
    @JoinColumn()
    room: Room;

    @Column({ default: false })
    isAvailable: boolean;
}
