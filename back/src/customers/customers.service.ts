import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import { UpdateCustomerInfoDto } from './customers.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly costumersRepository: CustomersRepository) {}

  getAllCostumers(page: number, limit: number) {
    return this.costumersRepository.getAllCustomers(page, limit);
  }

  getCustomerById(id: string) {
    return this.costumersRepository.getCustomerById(id);
  }

  async searchCustomers(query: string) {
    return await this.costumersRepository.searchCustomers(query);
  }

  updateCustomerInfo(id: string, customer: UpdateCustomerInfoDto) {
    return this.costumersRepository.updateCustomerInfo(id, customer);
  }

  logicalDeleteCustomer(id: string) {
    return this.costumersRepository.logicalDeleteCustomer(id);
  }
}
