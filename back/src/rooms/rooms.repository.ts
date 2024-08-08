import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "./rooms.entity";
import { Repository } from "typeorm";
import { CreateRoomDto } from "./rooms.dtos";
import { RoomsType } from "src/roomstype/roomstype.entity";
import { generateUniqueRandomNumbers } from "src/utils/generateRandonNumbers";
import { LoadRoomsDto } from "./rooms.loadDtos";
import { UpdateRoomDto } from "./rooms.updateDto";


@Injectable()
export class RoomsRepository{
    constructor(
        @InjectRepository(Room) private readonly roomDbRepository: Repository<Room>,
        @InjectRepository(RoomsType) private readonly roomstypeDbRepository: Repository<RoomsType>
    ){}

    async getDbRooms(): Promise<Room[]> {
        let roomsList: Room[] = await this.roomDbRepository.find();
        if(roomsList.length !==0){
            roomsList = roomsList.filter((room)=> room.isDeleted === false);
            return roomsList;
        }
        else throw new NotFoundException("there are not rooms");
    }
    
    async getDbRoomById(id:string): Promise<Room>{
        const roomById: Room = await this.roomDbRepository.findOne({where:{id}});
        if(!roomById || roomById.isDeleted === true ) throw new NotFoundException("this room is not available");
        else return roomById;
    }

    async createDbRoom(roomDto: CreateRoomDto):Promise<Room> {
        const { roomsTypeId, roomNumber } = roomDto;
        // const roomFound = await this.roomDbRepository.findOne({where:{roomNumber}});
        // if(roomFound) throw new BadRequestException("this room exists");
        const roomtypeFound: RoomsType = await this.roomstypeDbRepository.findOne({
            where:{id:roomsTypeId},
            relations: ['hotel']
        });
        console.log('RoomType Found:', roomtypeFound);

        if(!roomtypeFound){
            throw new NotFoundException("Roomtype with ID not found");
        } 
        const roomFound = await this.roomDbRepository.createQueryBuilder('room')
            .innerJoinAndSelect('room.roomtype', 'roomtype')
            .where('room.roomNumber = :roomNumber', {roomNumber})
            .andWhere('roomtype.hotelId = :hotelId', {hotelId: roomtypeFound.hotel.id})
            .getOne();    
        
        if(roomFound) throw new BadRequestException("this room number already exists in this hotel");
        
        const newRoom = this.roomDbRepository.create({
            roomNumber,
            roomtype: roomtypeFound,
        });

        await this.roomDbRepository.save(newRoom);

        const saveRoom = await this.roomDbRepository.findOne({
            where:{id:newRoom.id},
            relations: ['roomtype', 'roomtype.hotel']
        });
        if(!saveRoom) throw new NotFoundException("Room not found after creation"); 

        return saveRoom;
        
    }    

    async loadRooms(loadroomDto: LoadRoomsDto): Promise<string> {
        const { nIni, nEnd, quantity, roomsTypeId } = loadroomDto;
        const roomtypeFound: RoomsType = await this.roomstypeDbRepository.findOne({ where: {id: roomsTypeId } });

        if (!roomtypeFound) {
            throw new NotFoundException("RoomType with ID not found");
        }

        const roomNumbers = generateUniqueRandomNumbers(nIni, nEnd, quantity);
        const createdRoomIds: string[] = [];
        console.log( roomNumbers);
        
        roomNumbers?.map(async (ele) =>{
            const newRoom = new Room();
            newRoom.roomtype = roomtypeFound;
            newRoom.roomNumber = ele.toString();
            
            await this.roomDbRepository
                .createQueryBuilder()
                .insert()
                .into(Room)
                .values(newRoom)
                // .orUpdate(
                //     ['roomNumber'] 
                // )
                .execute();
        
        });

        return "rooms reload";
    }

    async updateDbRoom(id: string, updateroomDto: Partial<UpdateRoomDto>): Promise<string>{
        const {roomsTypeId, ...roomData} = updateroomDto;
        const roomFound: Room = await this.roomDbRepository.findOne({where: {id}});
        if(!roomFound) throw new NotFoundException("this room does not exists");
        const roomstypeFound: RoomsType = await this.roomstypeDbRepository.findOne({where:{id:roomsTypeId}});
        if(!roomstypeFound) throw new NotFoundException(" this roomstype does not exists");

        await this.roomDbRepository.update(id, {
            ...roomData,
            roomtype:roomstypeFound
        });

        return id;
    }

    async deleteDbRoom(id: string): Promise<Room>{
        const roomFound: Room = await this.roomDbRepository.findOne({where:{id}, relations: ['roomtype']});
        
        if(!roomFound) throw new NotFoundException("Room not found");
        if(roomFound.isDeleted === true) throw new BadRequestException("Room was eliminated");
        await this.roomDbRepository.update(id, {isDeleted:true});
        return this.roomDbRepository.findOne({
            where: { id },
            relations: ['roomtype']
        });
    }

    async restoreDbRoom(id: string): Promise<Room>{
        const roomFound: Room = await this.roomDbRepository.findOne({where:{id}, relations: ['roomtype']});
        if(!roomFound) throw new NotFoundException("Room not found");
        if(roomFound.isDeleted === false) throw new BadRequestException("Room is active");

        await this.roomDbRepository.update(id, {isDeleted:false});

        return this.roomDbRepository.findOne({
            where: { id },
            relations: ['roomtype']
        });
    }

    async getDbRoomDeleted(): Promise<Room[]>{
        const listRoom: Room[] = await this.roomDbRepository.find({where: {isDeleted:true}});
        if(listRoom.length !==0){
            return listRoom;
        }
        else throw new NotFoundException("there are not rooms eliminated");
    }


}
