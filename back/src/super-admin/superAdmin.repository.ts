import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperAdmins } from './superAdmin.entity';
import { Repository } from 'typeorm';
import { CreateSuperAdmin } from './superAdmin.dto';

@Injectable()
export class SuperAdminRepository {
  constructor(
    @InjectRepository(SuperAdmins)
    private superAdminsRepository: Repository<SuperAdmins>,
  ) {}

  //! Obtener todos los superAdmins

  async getAllSuperAdmins(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const superAdmins = await this.superAdminsRepository.find({
      take: limit,
      skip: skip,
    });
    return superAdmins.map(
      ({ password, ...superAdminNoPassword }) => superAdminNoPassword,
    );
  }

  //! Llamar a un Super Admin por su Email

  async getSuperAdminByEmail(email: string) {
    return await this.superAdminsRepository.findOneBy({ email });
  }

  //! Crear un SuperAdmin

  async createSuperAdmin(superAdmin: CreateSuperAdmin) {
    const newSuperAdmin = await this.superAdminsRepository.save(superAdmin);
    const dbSuperAdmin = await this.superAdminsRepository.findOneBy({
      email: newSuperAdmin.email,
    });

    const { password, ...superAdminNoPassword } = dbSuperAdmin;

    return superAdminNoPassword;
  }
}
