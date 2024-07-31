import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  roomTypesAndDates: RoomTypeAndAmount[];
}

class RoomTypeAndAmount {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  roomType: string;

  @IsNotEmpty()
  @IsString()
  checkInDate: string;

  @IsNotEmpty()
  @IsString()
  checkOutDate: string;
}
