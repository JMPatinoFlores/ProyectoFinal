import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateCustomerDto } from 'src/customers/customers.dto';
import { CustomersRepository } from 'src/customers/customers.repository';
import * as bcrypt from 'bcrypt';
import { CreateHotelAdminDto } from 'src/hotel-admins/hotel-admin.dto';
import { HotelAdminRepository } from 'src/hotel-admins/hotel-admin.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly hotelAdminRepository: HotelAdminRepository,
    private readonly jwtService: JwtService,
  ) {}

  //! Creación de Cliente

  async signUpCustomer(customer: CreateCustomerDto) {
    const { email, password } = customer;
    const foundCustomer =
      await this.customersRepository.getCustomerByEmail(email);
    if (foundCustomer) throw new BadRequestException('Email ya registrado');

    //* Hasheo de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //*Crear al usuario en la BBDD

    return await this.customersRepository.createCustomer({
      ...customer,
      password: hashedPassword,
    });
  }

  //! Creación de Hotelero

  async signUpHotelAdmin(hotelAdmin: CreateHotelAdminDto) {
    const { email, password } = hotelAdmin;
    const foundHotelAdmin =
      await this.hotelAdminRepository.getHotelAdminByEmail(email);
    if (foundHotelAdmin) throw new BadRequestException('Email ya registrado');

    //*Hasheo de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //*Crear al Admin del hotel en la BBDD

    return await this.hotelAdminRepository.createHotelAdmin({
      ...hotelAdmin,
      password: hashedPassword,
    });
  }

  //! Logueo de Cliente y Hotelero

  async signIn(email: string, password: string) {
    const customer = await this.customersRepository.getCustomerByEmail(email);
    const adminHotel =
      await this.hotelAdminRepository.getHotelAdminByEmail(email);

    if (!customer && !adminHotel)
      throw new BadRequestException('Credenciales incorrectas');

    if (customer) {
      const validPassword = await bcrypt.compare(password, customer.password);
      if (!validPassword)
        throw new BadRequestException('Credenciales incorrectas');

      //*Firmar el Token

      const payload = {
        id: customer.id,
        email: customer.email,
        isAdmin: customer.isAdmin,
      };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Usuario logueado',
        token,
      };
    }
    if (adminHotel) {
      const validPassword = await bcrypt.compare(password, adminHotel.password);
      if (!validPassword)
        throw new BadRequestException('Credenciales incorrectas');

      //*Firmar el Token

      const payload = {
        id: adminHotel.id,
        email: adminHotel.email,
        isAdmin: adminHotel.isAdmin,
      };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Usuario logueado',
        token,
      };
    }
  }
}
