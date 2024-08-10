import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './customers.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './customers.dto';
import { IdDto } from 'src/dto/id.dto';
import { validate } from 'class-validator';
import { MailService } from 'src/email-notify/mail.service';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
    private readonly mailService: MailService,
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

  //! Encontrar un cliente por su email

  async getCustomerByEmailOnly(email: string) {
    return await this.customersRepository.findOneBy({ email });
  }

  //! Encontrar un cliente por email con sus bookings

  async getCustomerByEmail(email: string) {
    return await this.customersRepository.findOne({
      where: { email },
      relations: ['bookings'],
    });
  }

  //! Obtener un cliente por su ID

  async getCustomerById(id: string) {
    if (!(await this.isValidUUID(id))) {
      throw new BadRequestException('ID inválido');
    }

    const customer = await this.customersRepository.findOne({
      where: { id },
      relations: {
        bookings: true,
        reviews: true,
      },
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
    await this.mailService.sendWelcomeEmailforCustomer(customer);

    return customerNoPassword;
  }

  //! Modificar un cliente

  async updateCustomerInfo(id: string, customer: any) {
    await this.customersRepository.update(id, customer);
    const updatedCustomer = await this.customersRepository.findOneBy({ id });
    const { password, ...customerNoPassword } = updatedCustomer;
    return customerNoPassword;
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

  async saveCustomerChanges(customer: Customers): Promise<Customers> {
    return await this.customersRepository.save(customer);
  }

  async findOne(options: any): Promise<Customers | undefined> {
    return await this.customersRepository.findOne(options);
  }

  async findOneBy(options: any): Promise<Customers | undefined> {
    return await this.customersRepository.findOneBy(options);
  }

  async update(id: string, updateData: Partial<Customers>): Promise<void> {
    await this.customersRepository.update(id, updateData);
  }
}
