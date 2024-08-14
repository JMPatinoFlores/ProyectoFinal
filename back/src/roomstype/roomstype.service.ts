import { Injectable } from "@nestjs/common";
import { RoomsTypeRepository } from "./roomstype.repository";
import { CreateRoomTypeDto } from "./roomstype.dtos";
import { UpdateRoomsTypeDto } from "./romstype.udpateDto";

@Injectable()
export class RoomsTypeService {
    constructor(
        private readonly roomsTypeDbRepository: RoomsTypeRepository
    ){}

    async getDbRoomsType(){
        return await this.roomsTypeDbRepository.getDbRoomsType();
    }

    async getRoomTypesByHotelId(hotelId: string) {
        return await this.roomsTypeDbRepository.getRoomTypesByHotelId(hotelId)
    }

    async getDbRoomTypeById(id:string){
        return await this.roomsTypeDbRepository.getDbRoomTypeById(id);
    }

    async createDbRoomtype(roomtypeDto: CreateRoomTypeDto){
        return await this.roomsTypeDbRepository.createDbRoomtype(roomtypeDto);
    }

    async updateDbRoomstype(id:string, updateDbRoomstype: Partial<UpdateRoomsTypeDto>){
        return await this.roomsTypeDbRepository.updateDbRoomstype(id, updateDbRoomstype);
    }

    async deleteDbRoomtype(id:string){
        return await this.roomsTypeDbRepository.deleteDbRoomtype(id);
    }

    async restoreRoomstype(id:string){
        return await this.roomsTypeDbRepository.restoreRoomstype(id);
    }

    async getDbRoomstypeDeleted(){
        return await this.roomsTypeDbRepository.getDbRoomstypeDeleted();
    }

}