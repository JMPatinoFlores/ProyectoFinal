import { IsArray, IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";


export class CreateRoomTypeDto{

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    capacity: number;

    @IsNumber()
    @IsNotEmpty()
    totalBathrooms: number;

    @IsNumber()
    @IsNotEmpty()
    totalBeds: number;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    images?: string[];

    @IsNumber()
    @Min(0)
    price: number;

    // @IsBoolean()
    // @IsEmpty()
    // status: boolean;

    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

}