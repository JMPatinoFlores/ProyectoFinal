import { IsNotEmpty, IsString, IsUUID, Matches } from "class-validator"

export class CreateAvailabilityDto {
    @IsNotEmpty()
    @IsUUID()
    roomId: string
    
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    startDate: string
    
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    endDate: string
}