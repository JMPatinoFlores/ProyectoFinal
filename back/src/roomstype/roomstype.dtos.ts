import {
  IsArray,
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRoomTypeDto {
  /**
   * Debe ingresar un string, de 50 caracteres como maximo, no nulo , para el nombre de un roomtype y no debe repetirse el tipo respecto a un hotel.
   * @example 'Familiar'
   */
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  /**
   * Debe ingresar un numero entero, no nulo, para la capacidad de personas en el tipo de cuarto.
   * @example 10
   */
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  /**
   * Debe ingresar un numero entero, no nulo, para el total de banios en el tipo de cuarto.
   * @example 3
   */
  @IsNumber()
  @IsNotEmpty()
  totalBathrooms: number;

  /**
   * Debe ingresar un numero entero, no nulo, para el numero de camas en el tipo de cuarto.
   * @example 10
   */
  @IsNumber()
  @IsNotEmpty()
  totalBeds: number;

  /**
   * Debe ingresar una imagen del tipo de string en formto URL, pueden ser varias imagenes(Es opcional).
   * @example 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-room.jpg'
   */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  /**
   * Debe ingresar un numero entero, no nulo, para el precio por el tipo de cuarto.
   * @example 250
   */
  @IsNumber()
  @Min(0)
  price: number;

  /**
   * Debe ingresar un string, no nulo, en formato UUID para el ID del hotel
   * @example '10qwe784e56q-498qw789d456-7845212'
   */
  @IsUUID()
  @IsNotEmpty()
  hotelId: string;
}

// @IsBoolean()
// @IsEmpty()
// status: boolean;
