import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class LoadRoomsDto {
    @IsInt()
    @Min(0)
    nIni: number;

    @IsInt()
    @Min(0)
    nEnd: number;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsUUID()
    roomsTypeId: string;
}