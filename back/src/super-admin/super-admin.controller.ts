import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('SuperAdmins')
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly SuperAdminServices: SuperAdminService) {}

  //* Llamar a todos los SuperAdmins

  @Get('all-super-admins')
  @ApiBearerAuth()
  @Roles(Role.User, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Límite de elementos por página',
    example: '5',
  })
  @ApiOperation({ summary: 'Llamar a todos los Super Admins' })
  getAllSuperAdmins(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.SuperAdminServices.getAllSuperAdmins(
        Number(page),
        Number(limit),
      );
  }
  @Get('superadmin-by')
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Email de Super Admin',
    example: 'superadmin@mail.com',
  })
  @ApiOperation({ summary: 'Llammar un Super Admin por su email' })
  getSuperAdminByEmail(@Query('email') email: string) {
    return this.SuperAdminServices.getSuperAdminByEmail(email);
  }
}
