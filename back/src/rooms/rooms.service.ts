import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoomDto } from "./rooms.dtos";
import { RoomsRepository } from "./rooms.repository";
import { LoadRoomsDto } from "./rooms.loadDtos";
import { UpdateRoomDto } from "./rooms.updateDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Hotel } from "src/hotels/hotels.entity";
import { Repository } from "typeorm";
import { RoomsType } from "src/roomstype/roomstype.entity";


@Injectable()
export class RoomsService{
    constructor(
        @InjectRepository(Hotel) private readonly hotelRepository: Repository<Hotel>,
        @InjectRepository(RoomsType) private readonly roomstypeRepository: Repository<RoomsType>,
        private readonly roomsDbRepository: RoomsRepository
        
    ){} 

    async getDbRooms(){
        return await this.roomsDbRepository.getDbRooms();
    }

    async getDbRoomById(id:string){
        return await this.roomsDbRepository.getDbRoomById(id);
    }

    async createDbRoom(roomDto: CreateRoomDto){
        const room = await this.roomsDbRepository.createDbRoom(roomDto);
        
        const roomtype = await this.roomstypeRepository.findOne({
            where: { id: roomDto.roomsTypeId },
            relations: ['hotel'],
        });

        if (!roomtype || !roomtype.hotel) {
            throw new NotFoundException("Hotel not found for the given RoomType");
        }

        await this.updateTotalRooms(roomtype.hotel.id);
        return room.id;
    }

    async deleteDbRoom(id: string) {
        const room = await this.roomsDbRepository.deleteDbRoom(id);
        console.log("room con su relacion", room);
        
        // Verifica si room.roomtype es undefined o null
        if (!room.roomtype) {
            console.log("roomtype no está definido en la habitación");
            throw new NotFoundException("RoomType no está definido para la habitación");
        }
        
        if (!room.roomtype.id) {
            console.log("id del roomtype del room", room.roomtype.id);
            throw new NotFoundException("RoomType ID not found");
        }
        
        console.log("id del roomtype del room", room.roomtype.id);
        
        if (room.isDeleted === false) {
            throw new NotFoundException("Room was not deleted");
        }
        
        const roomtype = await this.roomstypeRepository.findOne({
            where: { id: room.roomtype.id },
            relations: ['hotel']
        });
        
        console.log("roomtype con su relacion", roomtype);
    
        if (!roomtype || !roomtype.hotel) {
            throw new NotFoundException("Hotel not found for the given RoomType");
        }
        
        await this.updateTotalRooms(roomtype.hotel.id);
        return id;
    }
    

    async loadRooms(loadroomDto: LoadRoomsDto){
        return await this.roomsDbRepository.loadRooms(loadroomDto);
    }

    async updateDbRoom(id: string, updateroomDto: Partial<UpdateRoomDto>){
        return await this.roomsDbRepository.updateDbRoom(id, updateroomDto);
    }

    async restoreDbRoom(id:string){
        const room = await this.roomsDbRepository.restoreDbRoom(id);
        console.log("room restaurada con su relacion", room);
        
        if (!room.roomtype) {
            console.log("roomtype no está definido en la habitación restaurada");
            throw new NotFoundException("RoomType no está definido para la habitación");
        }
        
        if (!room.roomtype.id) {
            console.log("id del roomtype del room restaurado", room.roomtype.id);
            throw new NotFoundException("RoomType ID not found");
        }
        
        console.log("id del roomtype del room restaurado", room.roomtype.id);
        
        if (room.isDeleted === true) {
            throw new NotFoundException("Room was not restored");
        }
        
        // Recupera el RoomType con la relación al Hotel
        const roomtype = await this.roomstypeRepository.findOne({
            where: { id: room.roomtype.id },
            relations: ['hotel']
        });
        
        console.log("roomtype con su relacion", roomtype);
    
        if (!roomtype || !roomtype.hotel) {
            throw new NotFoundException("Hotel not found for the given RoomType");
        }
        
        // Actualiza el conteo total de habitaciones en el hotel
        await this.updateTotalRooms(roomtype.hotel.id);
        return id;
    }

    async getDbRoomDeleted(){
        return await this.roomsDbRepository.getDbRoomDeleted();
    }

    private async updateTotalRooms(hotelId: string){
        const hotelFound = await this.hotelRepository.findOne({
            where:{id:hotelId},
            relations:['roomstype', 'roomstype.rooms']
        });
        if(!hotelFound) throw new NotFoundException("Hotel not found");

        let totalRooms = 0;
        for(const roomtype of hotelFound.roomstype){
            if (roomtype.rooms && Array.isArray(roomtype.rooms)) {
                const activeRooms = roomtype.rooms.filter(room => !room.isDeleted);
                totalRooms += activeRooms.length; 
            }
        }

        hotelFound.totalRooms = totalRooms;
        await this.hotelRepository.save(hotelFound);
    }

}