import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotels.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './hotels.dtos';
import { HotelAdmins } from 'src/hotel-admins/hotelAdmins.entitity';

@Injectable()
export class HotelsRepository {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelDbRepository: Repository<Hotel>,
    @InjectRepository(HotelAdmins)
    private readonly hotelAdminRepository: Repository<HotelAdmins>,
  ) {}

  async getDbHotels(): Promise<Hotel[]> {
    const hotelsList: Hotel[] = await this.hotelDbRepository.find({
      relations: { reviews: { customer: true } },
    });
    if (hotelsList.length !== 0) {
      return hotelsList;
    } else throw new NotFoundException('there are not hotels');
  }

  async getDbHotelById(id: string): Promise<Hotel> {
    const hotelById: Hotel = await this.hotelDbRepository.findOne({
      where: { id },
      relations: { roomstype: { rooms: true } },
    });
    if (!hotelById) throw new NotFoundException('this hotel is not available');
    else return hotelById;
  }

  async createDbHotel(hotelDto: CreateHotelDto): Promise<string> {
    const { hoteladminId, ...hotelData } = hotelDto;

    const hoteladminFound = await this.hotelAdminRepository.findOne({
      where: { id: hoteladminId },
    });
    if (!hoteladminFound)
      throw new NotFoundException('this Admin is not available');

    const newHotel = this.hotelDbRepository.create({
      ...hotelData,
      hotelAdmin: hoteladminFound,
    });
    await this.hotelDbRepository.save(newHotel);
    return newHotel.id;
  }

  async searchHotels(name: string) {
    const hotels = await this.hotelDbRepository
      .createQueryBuilder('hotel')
      .where('LOWER(hotel.name) LIKE LOWER(:name)', { name: `%${name}%` })
      .getMany();
    console.log('hola a todos');

    return hotels;
  }
}
