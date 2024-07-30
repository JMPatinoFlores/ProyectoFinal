import { Room } from 'src/rooms/rooms.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class RoomAvailability {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 24, nullable: false})
    startDate: string;

    @Column({ type: 'varchar', length: 24, nullable: false })
    endDate: string;

    @ManyToOne(() => Room, room => room.availabilities)
    @JoinColumn()
    room: Room;

    @Column({ default: false, nullable: false })
    isAvailable: boolean;
}
