import { PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsNumber,
  IsStrongPassword,
} from 'class-validator';

export class CreateHotelAdminDto {
  /**
   * Debe tener entre 3 y 50 carácteres
   * @example 'John'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  /**
   * Debe tener entre 3 y 50 carácteres
   * @example 'Doe'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  lastName: string;

  /**
   * Debe tener entre 6 y 50 carácteres y ser email
   * @example 'test@mail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @MaxLength(50)
  email: string;

  /**
   * Debe tener entre 3 y 50 carácteres
   * @example 'Test'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @IsStrongPassword()
  password: string;

  /**
   * Número de telefono con sufijo de país
   * @example '+57 312 4567 8901'
   */
  @IsNotEmpty()
  @IsString()
  phone: string;

  /**
   * Debe tener máx. de 50 carácteres
   * @example 'Colombia'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  country: string;

  /**
   * Debe tener máx. 50 carácteres
   * @example 'Bogotá'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  city: string;

  /**
   * Debe tener entre 3 y 50 carácteres
   * @example 'Test'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  address: string;

  /**
   * Debe tener máx. 10 carácteres
   * @example '01/01/2000'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  birthDate: string;
}

export class LoginHotelAdminDto extends PickType(CreateHotelAdminDto, [
  'email',
  'password',
]) {}

export class UpdateHotelAdminInfoDto extends PickType(CreateHotelAdminDto, [
  'name',
  'lastName',
  'email',
  'phone',
  'country',
  'city',
  'address',
  'birthDate',
]) {}
