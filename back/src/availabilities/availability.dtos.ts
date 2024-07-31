import { IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateAvailabilityDto {
    @IsNotEmpty()
    @IsUUID()
    roomId: string

    @IsNotEmpty()
    @IsString()
    @IsISO8601()
    startDate: string

    @IsNotEmpty()
    @IsString()
    @IsISO8601()
    endDate: string
}

export class UpdateAvailabilityDto {
    @IsOptional()
    @IsString()
    @IsISO8601()
    startDate: string

    @IsOptional()
    @IsString()
    @IsISO8601()
    endDate: string
}