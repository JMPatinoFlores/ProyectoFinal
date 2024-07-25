import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @IsUUID()
    customerId: string

    @IsNotEmpty()
    @IsString()
    date: string

    @IsNotEmpty()
    @IsString()
    time: string

    @IsNotEmpty()
    @IsNumber()
    discount: number

    @IsNotEmpty()
    @IsString()
    checkInDate: string

    @IsNotEmpty()
    @IsString()
    checkOutDate: string

    @IsArray()
    @ArrayMinSize(1, { message: 'El array roomsIds debe contener al menos 1 UUID de Rooms.' })
    roomsIds: RoomUUID[]
}

class RoomUUID {
    @IsNotEmpty()
    @IsUUID()
    id: string
}