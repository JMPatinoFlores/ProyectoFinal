import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomsType } from "./roomstype.entity";
import { Repository } from "typeorm";
import { CreateRoomTypeDto } from "./roomstype.dtos";
import { Hotel } from "src/hotels/hotels.entity";

@Injectable()
export class RoomsTypeRepository{
    constructor(
        @InjectRepository(RoomsType) private readonly roomstypeDbRepository: Repository<RoomsType>,
        @InjectRepository(Hotel) private readonly hotelDbRepository: Repository<Hotel>
    ){}

    async getDbRoomsType(): Promise<RoomsType[]>{
        const roomstypeList: RoomsType[] = await this.roomstypeDbRepository.find();
        if(roomstypeList.length !==0){
            return roomstypeList;
        }
        else throw new NotFoundException("there are not roomstype");
    }

    async getDbRoomTypeById(id: string): Promise<RoomsType>{
        const roomtypeId: RoomsType = await this.roomstypeDbRepository.findOne({where:{id}, relations:{rooms:true}});
        if(!roomtypeId) throw new NotFoundException("this room is not available");
        return roomtypeId;
    }

    async createDbRoomtype(roomtypeDto: CreateRoomTypeDto): Promise<string>{
        const {hotelId, ...roomtypeData} = roomtypeDto;
        const hotelFound: Hotel = await this.hotelDbRepository.findOne({where:{id:hotelId}});

        if(!hotelFound){
            throw new NotFoundException("Hotel with ID not found");
        }
        else{
            const newRoomtype: RoomsType = this.roomstypeDbRepository.create({
                ...roomtypeData,
                hotel:hotelFound
            });

            await this.roomstypeDbRepository.save(newRoomtype);
            return newRoomtype.id;
        }

    }
} 