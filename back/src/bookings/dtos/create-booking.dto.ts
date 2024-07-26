import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsString, IsUUID } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty()
    @IsUUID()
    customerId: string

    @IsNotEmpty()
    @IsUUID()
    hotelToBookId: string

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

    @IsObject()
    @IsNotEmpty()
    roomsTypesAndAmounts: Record<string, number>
}