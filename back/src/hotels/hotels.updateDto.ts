import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";


export class UpdateHotelDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name?: string;
  
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    description?: string;
  
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    email?: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    country?: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    city?: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    location?: [number, number];
  
    @IsNumber()
    @IsNotEmpty()
    totalRooms?: number;

    @IsArray()
    @IsString({ each: true })
    services?: string[];

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating?: number;

    @IsArray()
    @IsString({each: true})
    images?: string[];

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    recommendations?: string;

    // @IsBoolean()
    // isDeleted?: boolean;

    @IsUUID()
    @IsNotEmpty()
    hotel_admin_id: string;

}