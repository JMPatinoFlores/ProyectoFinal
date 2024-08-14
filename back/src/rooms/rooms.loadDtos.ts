import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class LoadRoomsDto {
  /**
   * Debe ingresar un numero entero, no nulo, para el numero de inicio del cuarto.
   * @example 10
   */
  @IsInt()
  @Min(0)
  nIni: number;

  /**
   * Debe ingresar un numero entero, no nulo, para el numero de fin del cuarto.
   * @example 10
   */
  @IsInt()
  @Min(0)
  nEnd: number;

  /**
   * Debe ingresar un numero entero, no nulo, para la cantidad de cuartos.
   * @example 10
   */
  @IsInt()
  @Min(1)
  quantity: number;

  /**
   * Debe ingresar un string, no nulo, en formato UUID para el ID del roomtype
   * @example '10qwe784e56q-498qw789d456-7845212'
   */
  @IsUUID()
  roomsTypeId: string;
}
