import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray, IsISO8601,
  IsNotEmpty,
  IsUUID
} from 'class-validator';

export class CreateBookingDto {
    @ApiProperty({
        name: 'customerId',
        description: 'UUID del customer que va a hacer la reserva.',
        example: 'c68b93b1-c8f2-4dbb-b5c9-5c5f584ae3f5'
    })
    @IsNotEmpty()
    @IsUUID()
    customerId: string

    @ApiProperty({
        name: 'hotelId',
        description: 'UUID del hotel al que se le va a hacer la reserva.',
        example: 'd55d2acf-23ad-4b47-9416-1fba79d2fb65'
    })
    @IsNotEmpty()
    @IsUUID()
    hotelId: string

    @ApiProperty({
        name: 'roomTypesIdsAndDates',
        description: 'Array de objetos, cada uno de los objetos contiene un roomTypeId (UUID del tipo de habitación), un checkInDate y un checkOutDate (versión ISO8601 de las fechas en formato string).',
        example: '"roomTypesIdsAndDates": [{"roomTypeId": "4bd0ce59-0a68-4a36-93be-c9549afa35ca", "checkInDate": "2026-07-25T17:04:51.143Z", "checkOutDate": "2026-07-28T17:04:51.143Z"}]'
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty()
    roomTypesIdsAndDates: RoomTypeIdAndDate[]
}

class RoomTypeIdAndDate {
    @ApiProperty({
        name: 'roomTypeId',
        description: 'UUID del room type que se quiere reservar.',
        example: 'd55d2acf-23ad-4b47-9416-1fba79d2fb65'
    })
    @IsNotEmpty()
    @IsUUID()
    roomTypeId: string

    @ApiProperty({
        name: 'checkInDate',
        description: 'Fecha de check in en formato string ISO8601.',
        example: '2024-08-06T14:23:00Z'
    })
    @IsNotEmpty()
    @IsISO8601()
    checkInDate: string

    @ApiProperty({
        name: 'checkOutDate',
        description: 'Fecha de check out en formato string ISO8601.',
        example: '2024-08-10T14:23:00Z'
    })
    @IsNotEmpty()
    @IsISO8601()
    checkOutDate: string
}
