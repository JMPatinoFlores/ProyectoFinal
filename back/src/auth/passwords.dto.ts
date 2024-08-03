import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  readonly currentPassword: string;

  @IsString()
  @MinLength(8)
  readonly newPassword: string;
}

export class PasswordRecoveryDto {
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordDto {
  @IsString()
  readonly token: string;

  @IsString()
  @MinLength(8)
  readonly newPassword: string;
}
