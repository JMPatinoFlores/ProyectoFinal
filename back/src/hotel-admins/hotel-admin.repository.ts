import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelAdmins } from './hotelAdmins.entitity';
import { Repository } from 'typeorm';
import { CreateHotelAdminDto } from './hotel-admin.dto';

@Injectable()
export class HotelAdminRepository {
  constructor(
    @InjectRepository(HotelAdmins)
    private hotelAdminsRepository: Repository<HotelAdmins>,
  ) {}

  //! Crear un Admin de Hotel

  async createHotelAdmin(hotelAdmin: CreateHotelAdminDto) {
    const newHotelAdmin = await this.hotelAdminsRepository.save(hotelAdmin);
    const dbHotelAdmin = await this.hotelAdminsRepository.findOneBy({
      id: newHotelAdmin.id,
    });

    const { password, ...hotelAdminNoPassword } = dbHotelAdmin;

    return hotelAdminNoPassword;
  }

  //! Encontrar un Admin de Hotel por el email

  async getHotelAdminByEmail(email: string) {
    return await this.hotelAdminsRepository.findOneBy({ email });
  }
}
