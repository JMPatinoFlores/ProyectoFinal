import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { RoomAvailability } from "src/availabilities/availability.entity";

export class PostponeBookingDto {
    @IsNotEmpty()
    @IsUUID()
    bookingId: string

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    newAvailabilities: Partial<RoomAvailability>[]
}