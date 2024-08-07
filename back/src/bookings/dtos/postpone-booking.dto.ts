import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class PostponeBookingDto {
    @ApiProperty({
        name: 'bookingId',
        description: 'UUID del booking que se quiere actualizar.',
        example: 'c68b93b1-c8f2-4dbb-b5c9-5c5f584ae3f5'
    })
    @IsNotEmpty()
    @IsUUID()
    bookingId: string

    @ApiProperty({
        name: 'newAvailabilities',
        description: 'Array de objetos, los cuales representan cada uno un RoomAvailability y deben tener una propiedad id (UUID del RoomAvailability que se quiere modificar), startDate y endDate (versión ISO8601 de las nuevas fechas en formato string).',
        example: '"newAvailabilities": [{"id": "c68b93b1-c8f2-4dbb-b5c9-5c5f584ae3f5", "startDate": "2026-09-01T17:04:51.143Z", "endDate": "2026-09-07T17:04:51.143Z"}]'
    })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    newAvailabilities: newAvailabilities[]
}

export class newAvailabilities {
    @ApiProperty({
        name: 'id',
        description: 'UUID de la availability que se quiere posponer.',
        example: 'd55d2acf-23ad-4b47-9416-1fba79d2fb65'
    })
    @IsNotEmpty()
    @IsUUID()
    id: string

    @ApiProperty({
        name: 'startDate',
        description: 'Nueva fecha de inicio de la availability en formato string ISO8601.',
        example: '2024-08-15T14:23:00Z'
    })
    startDate: string

    @ApiProperty({
        name: 'endDate',
        description: 'Nueva fecha final de la availability en formato string ISO8601.',
        example: '2024-08-19T14:23:00Z'
    })
    endDate: string
}