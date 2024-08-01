import { ApiProperty } from "@nestjs/swagger"
import { IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateAvailabilityDto {
    @ApiProperty({
        name: 'roomId',
        description: 'UUID del room para el que se quiere crear el RoomAvailability.',
        example: '72a89dcb-6df3-4ec1-aea3-1ad0341cc7fc'
    })
    @IsNotEmpty()
    @IsUUID()
    roomId: string

    @ApiProperty({
        name: 'startDate',
        description: 'Fecha de inicio del RoomAvailability en formato string ISO8601.',
        example: '2024-09-26T17:04:51.143Z'
    })
    @IsNotEmpty()
    @IsString()
    @IsISO8601()
    startDate: string

    @ApiProperty({
        name: 'endDate',
        description: 'Fecha final del RoomAvailability en formato string ISO8601.',
        example: '2024-09-29T17:04:51.143Z'
    })
    @IsNotEmpty()
    @IsString()
    @IsISO8601()
    endDate: string
}

export class UpdateAvailabilityDto {
    @ApiProperty({
        name: 'startDate',
        description: 'Fecha de inicio del RoomAvailability en formato string ISO8601.',
        example: '2024-09-26T17:04:51.143Z'
    })
    @IsOptional()
    @IsString()
    @IsISO8601()
    startDate: string

    @ApiProperty({
        name: 'endDate',
        description: 'Fecha final del RoomAvailability en formato string ISO8601.',
        example: '2024-09-29T17:04:51.143Z'
    })
    @IsOptional()
    @IsString()
    @IsISO8601()
    endDate: string
}