import { ArrayMinSize, IsArray, IsISO8601, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @IsUUID()
    customerId: string

    @IsNotEmpty()
    @IsUUID()
    hotelId: string

    @IsOptional()
    @IsNumber()
    discount: number

    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty()
    roomTypesIdsAndDates: RoomTypeIdAndAmount[]
}

class RoomTypeIdAndAmount {
    @IsNotEmpty()
    @IsUUID()
    roomTypeId: string

    @IsNotEmpty()
    @IsISO8601()
    checkInDate: string

    @IsNotEmpty()
    @IsISO8601()
    checkOutDate: string
}