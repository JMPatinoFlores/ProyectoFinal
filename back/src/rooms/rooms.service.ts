import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./rooms.dtos";
import { RoomsRepository } from "./rooms.repository";
import { LoadRoomsDto } from "./rooms.loadDtos";
import { UpdateRoomDto } from "./rooms.updateDto";

@Injectable()
export class RoomsService{
    constructor(
        private readonly roomsDbRepository: RoomsRepository
    ){} 

    async getDbRooms(){
        return await this.roomsDbRepository.getDbRooms();
    }

    async getDbRoomById(id:string){
        return await this.roomsDbRepository.getDbRoomById(id);
    }

    async createDbRoom(roomDto: CreateRoomDto){
        return await this.roomsDbRepository.createDbRoom(roomDto);
    }

    async loadRooms(loadroomDto: LoadRoomsDto){
        return await this.roomsDbRepository.loadRooms(loadroomDto);
    }

    async updateDbRoom(id: string, updateroomDto: Partial<UpdateRoomDto>){
        return await this.roomsDbRepository.updateDbRoom(id, updateroomDto);
    }

    async deleteDbRoom(id: string){
        return await this.roomsDbRepository.deleteDbRoom(id);
    }

    async restoreDbRoom(id:string){
        return await this.roomsDbRepository.restoreDbRoom(id);
    }

    async getDbRoomDeleted(){
        return await this.roomsDbRepository.getDbRoomDeleted();
    }

}