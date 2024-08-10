import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UpdateCustomerInfoDto } from './customers.dto';
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
import { Customers } from './customers.entity';
@ApiTags('Clientes')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  //* Todos los Clientes

  @Get('allCustomers')
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.SuperAdmin)
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
  @ApiOperation({ summary: 'Ver todos los clientes' })
  getAllCustomers(@Query('page') page: string, @Query('limit') limit: string) {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.customersService.getAllCostumers(Number(page), Number(limit));
  }
  
  @Get('search')
  async searchCustomers(@Query('search') query?: string): Promise<Customers[]> {
    return await this.customersService.searchCustomers(query);
  }

  //* Obtener un Cliente por su ID

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  getCustomerById(@Param('id') id: string) {
    return this.customersService.getCustomerById(id);
  }


  //* Actualizar/modificar la información de un usuario

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.User, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Modificar/Actualizar un cliente' })
  updateCustomerInfo(
    @Param('id') id: string,
    @Body() customer: UpdateCustomerInfoDto,
  ) {
    return this.customersService.updateCustomerInfo(id, customer);
  }

  //* Borrado lógico de un cliente

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.User, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Eliminado lógico de un cliente' })
  logicalDeleteCustomer(@Param('id') id: string) {
    return this.customersService.logicalDeleteCustomer(id);
  }
}
