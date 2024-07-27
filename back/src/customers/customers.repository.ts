import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './customers.entitiy';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerInfoDto } from './customers.dto';
import { IdDto } from 'src/dto/id.dto';
import { validate } from 'class-validator';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
  ) {}

  //! Validar ID

  async isValidUUID(id: string): Promise<boolean> {
    const idDto = new IdDto();
    idDto.id = id;
    const errors = await validate(idDto);
    return errors.length === 0;
  }

  //!Obtener todos los clientes

  async getAllCustomers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const customers = await this.customersRepository.find({
      take: limit,
      skip: skip,
    });
    return customers.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  //! Encontrar un cliente por email

  async getCustomerByEmail(email: string) {
    return await this.customersRepository.findOneBy({ email });
  }

  //! Obtener un cliente por su ID

  async getCustomerById(id: string) {
    if (!(await this.isValidUUID(id))) {
      throw new BadRequestException('ID inválido');
    }

    const customer = await this.customersRepository.findOne({
      where: { id },
    });
    if (!customer) return `No se encontró el cliente con el ID: ${id}`;
    const { password, ...userNoPassword } = customer;
    return userNoPassword;
  }

  //! Crear un Cliente

  async createCustomer(customer: CreateCustomerDto) {
    const newCustomer = await this.customersRepository.save(customer);
    const dbCustomer = await this.customersRepository.findOneBy({
      id: newCustomer.id,
    });

    const { password, ...customerNoPassword } = dbCustomer;

    return customerNoPassword;
  }

  //! Modificar un cliente

  async updateCustomerInfo(id: string, customer: UpdateCustomerInfoDto) {
    await this.customersRepository.update(id, customer);
    const updatedCustomer = await this.customersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updatedCustomer;
    return updatedCustomer;
  }

  //! Eliminado lógico de un Cliente

  async logicalDeleteCustomer(id: string) {
    const fakeEmail = `deleted_${id}@example.com`;
    await this.customersRepository.update(id, {
      isDeleted: true,
      email: fakeEmail,
    });
    return { message: 'Borrado lógico de cliente exitoso' };
  }
}
