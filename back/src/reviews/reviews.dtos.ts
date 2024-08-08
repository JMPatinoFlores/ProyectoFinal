import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";


export class CreateReviewDto {
    
    /**
     * Debe ingresar un string, de 100 caracteres como maximo, no nulo , para el review que se hace a un hotel.
     * @example 'el estadia fue agradable, me gusto =) '
    */
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    comment: string;

    /**
     * Debe ingresar un numero entero, no nulo, entre 1 y 5 para calificar a un hotel.
     * @example 3
    */
    //@IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

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





  // @IsOptional()
    // @IsString()
    // @MaxLength(20)
    // date?: string;