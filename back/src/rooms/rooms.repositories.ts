import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "./rooms.entity";
import { Repository } from "typeorm";
import { CreateRoomDto } from "./rooms.dtos";
import { RoomsType } from "src/roomstype/roomstype.entity";
import { generateUniqueRandomNumbers } from "src/utils/generateRandonNumbers";
import { log } from "console";
import { LoadRoomsDto } from "./rooms.loadDtos";


@Injectable()
export class RoomsRepository{
    constructor(
        @InjectRepository(Room) private readonly roomDbRepository: Repository<Room>,
        @InjectRepository(RoomsType) private readonly roomstypeDbRepository: Repository<RoomsType>
    ){}

    async getDbRooms(): Promise<Room[]> {
        const roomsList: Room[] = await this.roomDbRepository.find();
        if(roomsList.length !==0){
            return roomsList;
        }
        else throw new NotFoundException("there are not rooms");
    }
    
    async getDbRoomById(id:string): Promise<Room>{
        const roomById: Room = await this.roomDbRepository.findOne({where:{roomId:id}});
        if(!roomById) throw new NotFoundException("this room is not available");
        else return roomById;
    }

    async createDbRoom(roomDto: CreateRoomDto):Promise<string> {
        const { roomsTypeId, ...roomData } = roomDto;
        const roomtypeFound: RoomsType = await this.roomstypeDbRepository.findOne({where:{roomsTypeId}});

        if(!roomtypeFound){
            throw new NotFoundException("Hotel with ID not found");
        } 
        else{
            const newRoom = this.roomDbRepository.create({
                ...roomData,
                roomtype: roomtypeFound,
            });

            await this.roomDbRepository.save(newRoom);
            return newRoom.roomId;
        }
    }

    async loadRooms(loadroomDto: LoadRoomsDto): Promise<string> {
        const { nIni, nEnd, quantity, roomsTypeId } = loadroomDto;
        const roomtypeFound: RoomsType = await this.roomstypeDbRepository.findOne({ where: { roomsTypeId } });

        if (!roomtypeFound) {
            throw new NotFoundException("RoomType with ID not found");
        }

        console.log("este es nini", nIni);
        console.log("este es nend",nEnd);
        console.log("este es qunty",quantity);
        
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

        

        // for (const roomNumber of roomNumbers) {
        //     const newRoom = this.roomDbRepository.create({
        //         roomNumber: roomNumber.toString(),
        //         roomtype: roomtypeFound
        //     });

        //     const savedRoom = await this.roomDbRepository.save(newRoom);
        //     createdRoomIds.push(savedRoom.roomId);
        // }

        return "rooms reload";
    }
}
