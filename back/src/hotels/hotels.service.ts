import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';
import { CreateHotelDto } from './hotels.dtos';
import { UpdateHotelDto } from './hotels.updateDto';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsDbRepository: HotelsRepository) {}

  async getDbHotels() {
    return await this.hotelsDbRepository.getDbHotels();
  }

  async getHotelsByHotelAdminId(hotelAdminId: string) {
    return await this.hotelsDbRepository.getHotelsByHotelAdminId(hotelAdminId)
  }

  async getDbHotelById(id: string) {
    return await this.hotelsDbRepository.getDbHotelById(id);
  }

  async createDbHotel(hotelDto: CreateHotelDto) {
    return await this.hotelsDbRepository.createDbHotel(hotelDto);
  }

  async searchHotels(query: string) {
    return await this.hotelsDbRepository.searchHotels(query);
  }

  async getFilteredHotels(rating: number, country: string, city: string, minPrice: number, maxPrice: number) {
    return await this.hotelsDbRepository.getFilteredHotels(rating, country, city, minPrice, maxPrice)
  }

  async updateDbHotel(id: string, updateHotelDto: Partial<UpdateHotelDto>) {
    return await this.hotelsDbRepository.updateDbHotel(id, updateHotelDto);
  }

  async deleteDbHotel(id: string) {
    return await this.hotelsDbRepository.deleteDbHotel(id);
  }

  async restoreHotel(id: string) {
    return await this.hotelsDbRepository.restoreHotel(id);
  }

  async getDbHotelsDeleted() {
    return await this.hotelsDbRepository.getDbHotelsDeleted();
  }
  async addHotels() {
    return await this.hotelsDbRepository.addHotels();
  }
}

// async searchHotels(
//     name?: string,
//     country?: string,
//     city?: string,
//     service?: string,
//     room?: string
// ) {
//     // Construye un objeto de filtro basado en los parámetros proporcionados
//     const filter: any = {};
//     if (name) filter.name = name;
//     if (country) filter.country = country;
//     if (city) filter.city = city;
//     if (service) filter.service = service;
//     if (room) filter.room = room;

//     // Llama al método en el repositorio con el objeto de filtro
//     return await this.hotelsDbRepository.searchHotels(filter);
// }

// async searchHotels(filter: any) {
//     return await this.hotelsDbRepository.searchHotels(filter);
//   }
