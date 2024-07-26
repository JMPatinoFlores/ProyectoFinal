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

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  address: string;

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
  'phone',
  'country',
  'city',
  'address',
]) {}
