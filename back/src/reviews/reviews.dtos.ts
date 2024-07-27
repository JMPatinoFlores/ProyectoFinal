import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";


export class CreateReviewDto {
     
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    coment: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    date: string;

    //@IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @IsUUID()
    @IsNotEmpty()
    clienteId: string;



}