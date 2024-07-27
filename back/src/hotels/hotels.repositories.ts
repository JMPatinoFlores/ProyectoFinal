import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Hotel } from "./hotels.entity";
import { Repository } from "typeorm";
import { CreateHotelDto } from "./hotels.dtos";

@Injectable()
export class HotelsRepository{
    constructor(
        @InjectRepository(Hotel) private readonly hotelDbRepository: Repository<Hotel>
    ){}

    async getDbHotels(): Promise<Hotel[]>  {
        const hotelsList: Hotel[] = await this.hotelDbRepository.find({relations:{reviews:{customer:true}}});
        if(hotelsList.length !== 0){
            return hotelsList;
        }
        else throw new NotFoundException("there are not hotels");
    }

    async getDbHotelById(id: string): Promise<Hotel> {
        const hotelById: Hotel = await this.hotelDbRepository.findOne({where: {hotelId:id}, relations:{roomstype: {rooms:true}}});
        if(!hotelById) throw new NotFoundException("this hotel is not available");
        else return hotelById; 
    }

    async createDbHotel(hotelDto: CreateHotelDto): Promise<string>{
        const { ...hotelData } = hotelDto;
        //conseguir el id del hoteladmin

        const newHotel = this.hotelDbRepository.create(
            {
                ...hotelData,
            }
        );
        await this.hotelDbRepository.save(newHotel);
        return newHotel.hotelId;     
    }

    async searchHotels(name: string) {
        const hotels = await this.hotelDbRepository
            .createQueryBuilder('hotel')
            .where('LOWER(hotel.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();
          console.log("hola a todos");
          
        return hotels;
    }
}