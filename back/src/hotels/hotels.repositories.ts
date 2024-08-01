import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Hotel } from "./hotels.entity";
import { Repository } from "typeorm";
import { CreateHotelDto } from "./hotels.dtos";
import { HotelAdmins } from "src/hotel-admins/hotelAdmins.entity";
import { NaturalLanguageProcessor } from "src/helper/natural-language-processor";
//import { removeAccents } from "src/utils/removeAcceents";


@Injectable()
export class HotelsRepository{
    constructor(
        private readonly naturalLanguageProcessor: NaturalLanguageProcessor,
        @InjectRepository(Hotel) private readonly hotelDbRepository: Repository<Hotel>,
        @InjectRepository(HotelAdmins) private readonly hotelAdminRepository: Repository<HotelAdmins>
        
    ){}

    async getDbHotels(): Promise<Hotel[]>  {
        const hotelsList: Hotel[] = await this.hotelDbRepository.find({relations:{reviews:{customer:true}}});  ///customer :true
        if(hotelsList.length !== 0){
            return hotelsList;
        }
        else throw new NotFoundException("there are not hotels");
    }

    async getDbHotelById(id: string): Promise<Hotel> {
        const hotelById: Hotel = await this.hotelDbRepository.findOne({where: {id}, relations:{roomstype: {rooms:true}}});
        if(!hotelById) throw new NotFoundException("this hotel is not available");
        else return hotelById; 
    }

    async createDbHotel(hotelDto: CreateHotelDto): Promise<string>{
        const { hoteladminId,...hotelData } = hotelDto;
        
        const hoteladminFound = await this.hotelAdminRepository.findOne({where: {id:hoteladminId}});
        if(!hoteladminFound)throw new NotFoundException("this Admin is not available");

        const newHotel = this.hotelDbRepository.create(
            {
                ...hotelData,
                hotelAdmin: hoteladminFound
            }
        );
        await this.hotelDbRepository.save(newHotel);
        return newHotel.id;     
    }
 
    
    async searchHotels(query?: string): Promise<Hotel[]> {
        if (!query) {
          return [];
        }
      
        const searchTerm = `%${query.toLowerCase()}%`;
      
        // Consulta SQL con la función unaccent
        return await this.hotelDbRepository.createQueryBuilder('hotel')
          .where('unaccent(LOWER(hotel.name)) ILIKE unaccent(:searchTerm)', { searchTerm })
          .orWhere('unaccent(LOWER(hotel.country)) ILIKE unaccent(:searchTerm)', { searchTerm })
          .orWhere('unaccent(LOWER(hotel.city)) ILIKE unaccent(:searchTerm)', { searchTerm })
          .orWhere('unaccent(LOWER(hotel.description)) ILIKE unaccent(:searchTerm)', { searchTerm })
          .getMany();
    }


    // async searchHotels(name: string) {
    //     const hotels = await this.hotelDbRepository
    //         .createQueryBuilder('hotel')
    //         .where('LOWER(hotel.name) LIKE LOWER(:name)', { name: `%${name}%` })
    //         .getMany();
    //       console.log("hola a todos");
          
    //     return hotels;
    // }
}




// async searchHotels(filter: any): Promise<Hotel[]> {
//   const query = this.hotelDbRepository
//     .createQueryBuilder('hotel')
//     .where('1 = 1'); // condición inicial

//   const conditions: string[] = [];

//   for (const key in filter) {
//     const values = filter[key].split('|');

//     for (const value of values) {
//       const entity = await this.naturalLanguageProcessor.getEntity(value);

//       if (entity) {
//         switch (entity.type) {
//           case 'hotel':
//             conditions.push(`hotel.name ILIKE '%${entity.name}%'`);
//             break;
//           case 'location':
//             if (entity.country) {
//               conditions.push(`hotel.country ILIKE '%${entity.country}%'`);
//             }
//             if (entity.city) {
//               conditions.push(`hotel.city ILIKE '%${entity.city}%'`);
//             }
//             break;
//           case 'service':
//             conditions.push(`hotel.services @> ARRAY['${entity.service}']`);
//             break;
//           case 'room':
//             conditions.push(`hotel.availableRooms @> ARRAY['${entity.room}']`);
//             break;
//           default:
//             break;
//         }
//       } else {
//         // Si no se encuentra entidad, utiliza el texto completo para la búsqueda
//         conditions.push(`hotel.name ILIKE '%${value}%'`);
//       }
//     }
//   }

//   if (conditions.length > 0) {
//     query.andWhere(conditions.join(' AND '));
//   }

//   return query.getMany();
// }
