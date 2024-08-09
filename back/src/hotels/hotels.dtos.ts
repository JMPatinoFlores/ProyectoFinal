import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateHotelDto {

  /**
  * Debe ingresar un string, de 50 caracteres como maximo, no nulo , para el nombre del hotel.
  * @example 'Hotel Sun Paradise'
  */
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  /**
  * Debe ingresar un string, de 500 caracteres como maximo, no nulo , para una descripcion del hotel.
  * @example 'Disfruta del sol y la playa en el Hotel Sun Paradise, donde la relajación y la diversión se unen en un ambiente tropical. Nuestro hotel es el lugar perfecto para escapar de la rutina y disfrutar de la belleza de Cancún'
  */
  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  description: string;

  /**
  * Debe ingresar un string, de 50 caracteres como maximo, no nulo , para el email del hotel.
  * @example 'sunparadise@mail.com'
  */
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  /**
  * Debe ingresar un string, de 50 caracteres como maximo, no nulo , para el country del hotel.
  * @example 'Mexico'
  */
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  country: string;

  /**
  * Debe ingresar un string, de 50 caracteres como maximo, no nulo , para el city del hotel.
  * @example 'Cancun'
  */
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  city: string;

  /**
  * Debe ingresar un string, de 50 caracteres como maximo, no nulo , para direccion del hotel.
  * @example 'St las flores 123'
  */
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  address: string;

  /**
  * Debe ingresar un arreglo de numeros float, para ubicacion del hotel.
  * @example [21.1378937,-86.7541472]
  */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  location?: [number, number];

  /**
  * Debe ingresar un numero entero, para la cantidad de habitaciones del hotel.
  * @example 30
  */
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  totalRooms?: number;

  /**
  * Debe ingresar un arreglo de strings, para los servicios que brinda el hotel.
  * @example '["Restaurante", "Bar", "Gimnasio"]'
  */
  @IsArray()
  @IsString({ each: true })
  services: string[];

  /**
  * Debe ingresar una imagen del tipo de string en formto URL, pueden ser varias imagenes(Es opcional).
  * @example 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-room.jpg'
  */
  @IsOptional()
  @IsArray()
  @IsString({each: true})
  images?: string[];

  /**
  * Debe ingresar un string, no nulo, en formato UUID para el ID del hotel
  * @example '10qwe784e56q-498qw789d456-7845212'
  */
  @IsUUID()
  @IsNotEmpty()
  hotel_admin_id: string;

}
















 
// @IsOptional()
// @IsNumber()
// @Min(1)
// @Max(5)
// rating?: number;


