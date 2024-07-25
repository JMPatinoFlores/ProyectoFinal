import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelAdminsService {
  getHotels() {
    return 'Obtener todos los hoteles';
  }
}
