import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./rooms.dtos";
import { RoomsRepository } from "./rooms.repositories";
import { LoadRoomsDto } from "./rooms.loadDtos";

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
}