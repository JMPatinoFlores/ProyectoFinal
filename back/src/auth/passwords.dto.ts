import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  /**
   * Debe tener entre 8 y 12 caracteres, contener una mayúscula, número y carácter especial
   * @example 'Test*1234'
   */
  @IsString()
  readonly currentPassword: string;

  /**
   * Debe tener entre 8 y 12 caracteres, contener una mayúscula, número y carácter especial
   * @example 'Change*1234'
   */
  @IsString()
  @MinLength(8)
  readonly newPassword: string;
}

export class PasswordRecoveryDto {
  /**
   * Debe ser un email válido
   * @example 'test1@mail.com'
   */
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordDto {
  /**
   * Debe ser el token que se envía desde el correo
   * @example '{token}'
   */
  @IsString()
  readonly token: string;

  /**
   * Debe tener entre 8 y 12 caracteres, contener una mayúscula, número y carácter especial
   * @example 'Change*1234'
   */
  @IsString()
  @MinLength(8)
  readonly newPassword: string;
}
