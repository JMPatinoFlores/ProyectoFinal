import { Module } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdminRepository } from './superAdmin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdmins } from './superAdmin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuperAdmins])],
  providers: [SuperAdminService, SuperAdminRepository],
  controllers: [SuperAdminController],
})
export class SuperAdminModule {}
