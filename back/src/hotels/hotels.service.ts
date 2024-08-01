import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './hotels.dtos';
import { HotelsRepository } from './hotels.repositories';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsDbRepository: HotelsRepository) {}

  async getDbHotels() {
    return await this.hotelsDbRepository.getDbHotels();
  }

  async getDbHotelById(id: string) {
    return await this.hotelsDbRepository.getDbHotelById(id);
  }

  async createDbHotel(hotelDto: CreateHotelDto) {
    return await this.hotelsDbRepository.createDbHotel(hotelDto);
  }

  async searchHotels(name: string) {
    return await this.hotelsDbRepository.searchHotels(name);
  }
}
