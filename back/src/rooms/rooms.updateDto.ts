import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, Min, ArrayMinSize, ArrayMaxSize, IsBoolean, IsEmpty, IsUUID } from "class-validator";

export class UpdateRoomDto {

    /**
     * Debe ingresar un string, de 10 caracteres como maximo, no nulo , para el numero del room.
     * @example '210'
    */
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    roomNumber: string;

    /**
     * Debe ingresar un string, no nulo, en formato UUID para el ID del roomtype
     * @example '10qwe784e56q-498qw789d456-7845212'
    */
    @IsUUID()
    @IsNotEmpty()
    roomsTypeId: string;
}






// @IsEmpty()
    // @IsBoolean()
    // status: boolean;
