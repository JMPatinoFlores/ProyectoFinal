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
import * as data from '../utils/dataHotelAdmins.json';

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
      ({ password, numberOfHotels, ...hotelAdminNoPassword }) =>
        hotelAdminNoPassword,
    );
  }

  //! Encontrar un Admin de Hotel por email

  async getHotelAdminByEmailOnly(email: string) {
    return await this.hotelAdminsRepository.findOneBy({ email });
  }

  //! Encontrar un Admin de Hotel por el email con sus Hoteles

  async getHotelAdminByEmail(email: string) {
    return await this.hotelAdminsRepository.findOne({
      where: { email },
      relations: ['hotels'],
    });
  }

  async searchHotelAdmins(query?: string): Promise<HotelAdmins[]> {
    if (!query) {
      return [];
    }
    const searchTerm = `%${query.toLowerCase()}%`;

    // Consulta SQL con la función unaccent
    return await this.hotelAdminsRepository
      .createQueryBuilder('hotel-admin')
      .where('unaccent(LOWER(hotel-admin.name)) ILIKE unaccent(:searchTerm)', {
        searchTerm,
      })
      .orWhere('unaccent(LOWER(hotel-admin.lastName)) ILIKE unaccent(:searchTerm)', {
        searchTerm,
      })
      .orWhere('unaccent(LOWER(hotel-admin.email)) ILIKE unaccent(:searchTerm)', {
        searchTerm,
      })
      .getMany();
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
    hotelAdmin.numberOfHotels = hotelAdmin.hotels
      ? hotelAdmin.hotels.length
      : 0;
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

  async saveAdminChanges(hotelAdmin: HotelAdmins): Promise<HotelAdmins> {
    return await this.hotelAdminsRepository.save(hotelAdmin);
  }

  async findOne(options: any): Promise<HotelAdmins | undefined> {
    return await this.hotelAdminsRepository.findOne(options);
  }

  async findOneBy(options: any): Promise<HotelAdmins | undefined> {
    return await this.hotelAdminsRepository.findOneBy(options);
  }

  async update(id: string, updateData: Partial<HotelAdmins>): Promise<void> {
    await this.hotelAdminsRepository.update(id, updateData);
  }

  // ! Cargar usuarios predefinidos de hotel
  async addHotelsAdmins() {
    data?.map(async (e) => {
      const hotelAdmins = new HotelAdmins();
      hotelAdmins.name = e.name;
      hotelAdmins.lastName = e.lastName;
      hotelAdmins.email = e.email;
      hotelAdmins.password = e.password;
      hotelAdmins.country = e.country;
      hotelAdmins.city = e.city;
      hotelAdmins.address = e.address;
      hotelAdmins.birthDate = e.birthDate;
      hotelAdmins.phone = e.phone;

      await this.hotelAdminsRepository
        .createQueryBuilder()
        .insert()
        .into(HotelAdmins)
        .values(hotelAdmins)
        .execute();
    });
    return 'Added Hotel Admins';
  }
}
