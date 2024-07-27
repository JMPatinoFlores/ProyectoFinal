import { Injectable } from '@nestjs/common';
import { HotelAdminRepository } from './hotel-admin.repository';
import { UpdateHotelAdminInfoDto } from './hotel-admin.dto';

@Injectable()
export class HotelAdminsService {
  constructor(private readonly hotelAdminRepository: HotelAdminRepository) {}

  getAllHotelAdmins(page: number, limit: number) {
    return this.hotelAdminRepository.getAllHotelAdmins(page, limit);
  }

  getHotelAdminById(id: string) {
    return this.hotelAdminRepository.getHotelAdminById(id);
  }

  updateHotelAdminInfo(id: string, hotelAdmin: UpdateHotelAdminInfoDto) {
    return this.hotelAdminRepository.updateHotelAdminInfo(id, hotelAdmin);
  }

  logicalDeleteHotelAdmin(id: string) {
    return this.hotelAdminRepository.logicalDeleteHotelAdmin(id);
  }
}
