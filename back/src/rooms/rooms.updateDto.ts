import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, Min, ArrayMinSize, ArrayMaxSize, IsBoolean, IsEmpty, IsUUID } from "class-validator";

export class UpdateRoomDto {
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    roomNumber: string;

    // @IsEmpty()
    // @IsBoolean()
    // status: boolean;

    @IsUUID()
    @IsNotEmpty()
    roomsTypeId: string;
}
