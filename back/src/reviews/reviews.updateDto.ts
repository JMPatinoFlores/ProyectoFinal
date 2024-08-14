import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";


export class UpdateReviewDto {
    
    /**
     * Debe ingresar un string, de 100 caracteres como maximo, no nulo , para el review que se hace a un hotel.
     * @example 'regresare para nueva aventura gaaaaa xD '
    */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    comment?: string;

    /**
     * Debe ingresar un numero entero, no nulo, entre 1 y 5 para calificar a un hotel.
     * @example 4
    */
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating?: number;

    /**
     * Debe ingresar un string, no nulo, en formato UUID para el ID del hotel
     * @example '10qwe784e56q-498qw789d456-7845212'
    */
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    /**
     * Debe ingresar un string, no nulo, en formato UUID para el ID del customer
     * @example '10qwe784e56q-498qw789d456-7845212'
    */
    @IsUUID()
    @IsNotEmpty()
    clienteId: string;

}








   // @IsString()
    // @IsNotEmpty()
    // @MaxLength(20)
    // date: string;