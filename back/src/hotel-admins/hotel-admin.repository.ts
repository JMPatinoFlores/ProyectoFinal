import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelAdmins } from './hotelAdmins.entity';
import { Repository } from 'typeorm';
import {
  CreateHotelAdminDto,
  UpdateHotelAdminInfoDto,
} from './hotel-admin.dto';
import { IdDto } from 'src/dto/id.dto';
import { validate } from 'class-validator';

@Injectable()
export class HotelAdminRepository {
  constructor(
    @InjectRepository(HotelAdmins)
    private hotelAdminsRepository: Repository<HotelAdmins>,
  ) {}

  //! Validar ID

  async isValidUUID(id: string): Promise<boolean> {
    const idDto = new IdDto();
    idDto.id = id;
    const errors = await validate(idDto);
    return errors.length === 0;
  }

  //! Obtener todos los admins de Hotel

  async getAllHotelAdmins(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const hotelAdmins = await this.hotelAdminsRepository.find({
      take: limit,
      skip: skip,
    });
    return hotelAdmins.map(
      ({ password, ...hotelAdminNoPassword }) => hotelAdminNoPassword,
    );
  }

  //! Encontrar un Admin de Hotel por el email

  async getHotelAdminByEmail(email: string) {
    return await this.hotelAdminsRepository.findOneBy({ email });
  }

  //! Obtener un admin de Hotel por su ID

  async getHotelAdminById(id: string) {
    if (!(await this.isValidUUID(id))) {
      throw new BadRequestException('ID inválido');
    }
    const hotelAdmin = await this.hotelAdminsRepository.findOne({
      where: { id },
      relations: {
        hotels: true,
      },
    });
    if (!hotelAdmin) return `No se encontro el administrador con ID: ${id}`;
    const { password, ...userNoPassword } = hotelAdmin;
    return userNoPassword;
  }

  //! Crear un Admin de Hotel

  async createHotelAdmin(hotelAdmin: CreateHotelAdminDto) {
    const newHotelAdmin = await this.hotelAdminsRepository.save(hotelAdmin);
    const dbHotelAdmin = await this.hotelAdminsRepository.findOneBy({
      id: newHotelAdmin.id,
    });

    const { password, ...hotelAdminNoPassword } = dbHotelAdmin;

    return hotelAdminNoPassword;
  }

  //! Modificar un admin Hotel

  async updateHotelAdminInfo(id: string, hotelAdmin: UpdateHotelAdminInfoDto) {
    await this.hotelAdminsRepository.update(id, hotelAdmin);
    const updatedHotelAdmin = await this.hotelAdminsRepository.findOneBy({
      id,
    });
    const { password, ...userNoPassword } = updatedHotelAdmin;
    return userNoPassword;
  }

  //! Eliminación lógica de admin de Hotel

  async logicalDeleteHotelAdmin(id: string) {
    const fakeEmail = `deleted_${id}@example.com`;
    await this.hotelAdminsRepository.update(id, {
      isDeleted: true,
      email: fakeEmail,
    });
    return { message: 'Borrado lógico de Admin de hotel exitoso' };
  }
}
