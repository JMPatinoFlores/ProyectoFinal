import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  getUsers() {
    return 'Todos los clientes';
  }
}
