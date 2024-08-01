import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './customers.repository';
import {
  PasswordRecoveryDto,
  ResetPasswordDto,
  UpdateCustomerInfoDto,
  UpdatePasswordDto,
} from './customers.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly costumersRepository: CustomersRepository) {}

  getAllCostumers(page: number, limit: number) {
    return this.costumersRepository.getAllCustomers(page, limit);
  }

  getCustomerById(id: string) {
    return this.costumersRepository.getCustomerById(id);
  }

  updateCustomerInfo(id: string, customer: UpdateCustomerInfoDto) {
    return this.costumersRepository.updateCustomerInfo(id, customer);
  }

  changePassword(id: string, updatePassword: UpdatePasswordDto) {
    return this.costumersRepository.changePassword(id, updatePassword);
  }

  passwordRecovery(passwordRecovery: PasswordRecoveryDto) {
    return this.costumersRepository.passwordRecovery(passwordRecovery);
  }

  resetPassword(resetPassword: ResetPasswordDto) {
    return this.costumersRepository.resetPassword(resetPassword);
  }

  logicalDeleteCustomer(id: string) {
    return this.costumersRepository.logicalDeleteCustomer(id);
  }
}
