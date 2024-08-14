import { PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsNumber,
  IsStrongPassword,
  maxLength,
} from 'class-validator';

export class CreateCustomerDto {
  /**
   * Debe tener entre 3 y 50 caracteres
   * @example 'Test'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  /**
   * Debe tener entre 3 y 50 caracteres
   * @example 'Customer'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  lastName: string;

  /**
   * Debe tener entre 6 y 50 caracteres, contener una mayúscula
   * @example 'customer@mail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @MaxLength(50)
  email: string;

  /**
   * Debe tener entre 8 y 12 caracteres, contener una mayúscula, número y carácter especial
   * @example 'Test*1234'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @IsStrongPassword()
  password: string;

  /**
   * Debe ser string
   * @example '+1 12345678901'
   */
  @IsNotEmpty()
  @IsString()
  phone: string;

  /**
   * Debe tener máx. 50 caracteres
   * @example 'Customer Country'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  country: string;

  /**
   * Debe tener máx. 50 caracteres
   * @example 'Customer City'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  city: string;

  /**
   * Debe tener máx. 50 caracteres
   * @example 'Customer Address 1234'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  address: string;

  /**
   * Debe tener máx. 10 caracteres
   * @example '01/01/2000'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  birthDate: string;
}

export class LoginCustomerDto extends PickType(CreateCustomerDto, [
  'email',
  'password',
]) {}

export class UpdateCustomerInfoDto extends PickType(CreateCustomerDto, [
  'name',
  'lastName',
  'email',
  'country',
  'city',
  'address',
  'phone',
]) {}
