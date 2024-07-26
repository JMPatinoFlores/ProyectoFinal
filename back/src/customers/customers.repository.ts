import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './customers.entitiy';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './customers.dto';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
  ) {}

  //! Crear un Cliente

  async createCustomer(customer: CreateCustomerDto) {
    const newCustomer = await this.customersRepository.save(customer);
    const dbCustomer = await this.customersRepository.findOneBy({
      id: newCustomer.id,
    });

    const { password, ...customerNoPassword } = dbCustomer;

    return customerNoPassword;
  }

  //! Encontrar un cliente por email

  async getCustomerByEmail(email: string) {
    return await this.customersRepository.findOneBy({ email });
  }
}
