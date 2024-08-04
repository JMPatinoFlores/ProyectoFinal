import { IsArray, IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, Min } from "class-validator";

export class UpdateRoomsTypeDto{

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name?: string;

    @IsNumber()
    @IsNotEmpty()
    capacity?: number;

    @IsNumber()
    @IsNotEmpty()
    totalBathrooms?: number;

    @IsNumber()
    @IsNotEmpty()
    totalBeds?: number;

    @IsArray()
    @IsString({each: true})
    images?: string[];

    @IsNumber()
    @Min(0)
    price?: number;

    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

}