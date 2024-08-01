import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  PasswordRecoveryDto,
  ResetPasswordDto,
  UpdateCustomerInfoDto,
  UpdatePasswordDto,
} from './customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  //* Todos los Clientes

  @Get('allCustomers')
  getAllCustomers(@Query('page') page: string, @Query('limit') limit: string) {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.customersService.getAllCostumers(Number(page), Number(limit));
  }

  //* Obtener un Cliente por su ID

  @Get(':id')
  getCustomerById(@Param('id') id: string) {
    return this.customersService.getCustomerById(id);
  }

  @Put('changePassword')
  changePassword(
    @Param('id') id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    return this.customersService.changePassword(id, updatePassword);
  }

  //* Actualizar/modificar la información de un usuario

  @Put(':id')
  updateCustomerInfo(
    @Param('id') id: string,
    @Body() customer: UpdateCustomerInfoDto,
  ) {
    return this.customersService.updateCustomerInfo(id, customer);
  }

  //* Petición para recuperar la contraseña

  @Post('password-recovery')
  passwordRecovery(@Body() passwordRecovery: PasswordRecoveryDto) {
    return this.customersService.passwordRecovery(passwordRecovery);
  }

  //* Reseteo de la contraseña

  @Post('reset-password')
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.customersService.resetPassword(resetPassword);
  }

  //* Borrado lógico de un cliente

  @Delete(':id')
  logicalDeleteCustomer(@Param('id') id: string) {
    return this.customersService.logicalDeleteCustomer(id);
  }
}
