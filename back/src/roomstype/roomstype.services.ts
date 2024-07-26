import { Injectable } from "@nestjs/common";
import { RoomsTypeRepository } from "./roomstype.repositories";
import { CreateRoomTypeDto } from "./roomstype.dtos";

@Injectable()
export class RoomsTypeService {
    constructor(
        private readonly roomsTypeDbRepository: RoomsTypeRepository
    ){}

    async getDbRoomsType(){
        return await this.roomsTypeDbRepository.getDbRoomsType();
    }

    async getDbRoomTypeById(id:string){
        return await this.roomsTypeDbRepository.getDbRoomTypeById(id);
    }

    async createDbRoomtype(roomtypeDto: CreateRoomTypeDto){
        return await this.roomsTypeDbRepository.createDbRoomtype(roomtypeDto);
    }
}