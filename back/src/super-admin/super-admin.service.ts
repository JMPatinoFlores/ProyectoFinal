import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SuperAdminRepository } from './superAdmin.repository';

@Injectable()
export class SuperAdminService {
  constructor(private readonly superAdminRepository: SuperAdminRepository) {}

  getAllSuperAdmins(page: number, limit: number) {
    return this.superAdminRepository.getAllSuperAdmins(page, limit);
  }

  getSuperAdminByEmail(email: string) {
    return this.superAdminRepository.getSuperAdminByEmail(email);
  }
}
