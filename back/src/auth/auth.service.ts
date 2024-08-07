import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateCustomerDto } from 'src/customers/customers.dto';
import { CustomersRepository } from 'src/customers/customers.repository';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CreateHotelAdminDto } from 'src/hotel-admins/hotel-admin.dto';
import { HotelAdminRepository } from 'src/hotel-admins/hotel-admin.repository';
import {
  PasswordRecoveryDto,
  ResetPasswordDto,
  UpdatePasswordDto,
} from './passwords.dto';
import { MailService } from 'src/email-notify/mail.service';
import { MoreThan, Repository } from 'typeorm';
import { HotelAdmins } from 'src/hotel-admins/hotelAdmins.entity';
import { Request } from 'express';
import { Customers } from 'src/customers/customers.entity';
import { GoogleRegisterUserDetails } from './types/google-register-user-details.type';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperAdminRepository } from 'src/super-admin/superAdmin.repository';
import { SuperAdmins } from 'src/super-admin/superAdmin.entity';
import { CreateSuperAdmin } from 'src/super-admin/superAdmin.dto';
import { GoogleLoginUserDetails } from './types/google-login-user-details.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly hotelAdminRepository: HotelAdminRepository,
    private readonly superAdminRepository: SuperAdminRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    @InjectRepository(Customers)
   
    private readonly customersDBRepository: Repository<Customers>,
    @InjectRepository(HotelAdmins)
   
    private readonly hotelAdminsDBRepository: Repository<HotelAdmins>,
    @InjectRepository(SuperAdmins)
    private readonly SuperAdminsDBRepository: Repository<SuperAdmins>,
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

  //! Creación de Super Admin

  async signUpSuperAdmin(superAdmin: CreateSuperAdmin) {
    const { email, password } = superAdmin;
    const foundSuperAdmin =
      await this.superAdminRepository.getSuperAdminByEmail(email);
    if (foundSuperAdmin) throw new BadRequestException('Email ya registrado');

    //*Hasheo de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //*Crear el super admin en la BBDD

    return await this.superAdminRepository.createSuperAdmin({
      ...superAdmin,
      password: hashedPassword,
    });
  }

  //! Logueo de Cliente, Hotelero y Super Admin

  async signIn(email: string, password: string) {
    const customer = await this.customersRepository.getCustomerByEmail(email);
    const adminHotel =
      await this.hotelAdminRepository.getHotelAdminByEmail(email);
    const superAdmin =
      await this.superAdminRepository.getSuperAdminByEmail(email);

    if (!customer && !adminHotel && !superAdmin)
      throw new BadRequestException('Credenciales incorrectas');

    if (customer) {
      const validPassword = await bcrypt.compare(password, customer.password);
      if (!validPassword)
        throw new BadRequestException('Credenciales incorrectas');

      //*Firmar el Token

      const payload = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        city: customer.city,
        country: customer.country,
        adress: customer.address,
        isAdmin: customer.isAdmin,
      };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Usuario logueado',
        bookings: customer.bookings,
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
        name: adminHotel.name,
        email: adminHotel.email,
        city: adminHotel.city,
        country: adminHotel.country,
        address: adminHotel.address,
        isAdmin: adminHotel.isAdmin,
      };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Hotelero logueado',
        hotels: adminHotel.hotels,
        token,
      };
    }
    if (superAdmin) {
      const validPassword = await bcrypt.compare(password, superAdmin.password);
      if (!validPassword)
        throw new BadRequestException('Credenciales incorrectas');

      //*Firmar el Token

      const payload = {
        id: superAdmin.id,
        name: superAdmin.name,
        email: superAdmin.email,
        superAdmin: superAdmin.superAdmin,
      };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Super Admin logueado',
        token,
      };
    }
  }

  //! Recuperación de contraseña

  async passwordRecovery(passwordRecovery: PasswordRecoveryDto) {
    const { email } = passwordRecovery;
    const customer =
      await this.customersRepository.getCustomerByEmailOnly(email);
    const adminHotel =
      await this.hotelAdminRepository.getHotelAdminByEmailOnly(email);
    if (!customer && !adminHotel) {
      throw new BadRequestException(
        'No se encontró el cliente con el email proporcionado',
      );
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    if (customer) {
      customer.passwordResetToken = token;
      customer.passwordResetExpires = expirationDate;
      await this.customersRepository.saveCustomerChanges(customer);

      const resetUrl = `http://localhost:3001/reset-password/${token}`;

      await this.mailService.sendMail(
        customer.email,
        'Recuperación de contraseña',
        `Hola, para restablecer tu contraseña, por favor haz clic en el siguiente enlace: ${resetUrl}`,
        `<p>Hola,</p><p>Para restablecer tu contraseña, por favor haz clic en el siguiente enlace: <a href="${resetUrl}">${resetUrl}</a></p>`,
      );
    } else if (adminHotel) {
      adminHotel.passwordResetToken = token;
      adminHotel.passwordResetExpires = expirationDate;
      await this.hotelAdminRepository.saveAdminChanges(adminHotel);

      const resetUrl = `http://localhost:3001/reset-password/${token}`;

      await this.mailService.sendMail(
        adminHotel.email,
        'Recuperación de contraseña',
        `Hola, para restablecer tu contraseña, por favor haz clic en el siguiente enlace: ${resetUrl}`,
        `<p>Hola,</p><p>Para restablecer tu contraseña, por favor haz clic en el siguiente enlace: <a href="${resetUrl}">${resetUrl}</a></p>`,
      );
    }

    const resetUrl = `http://localhost:3001/reset-password/${token}`;

    await this.mailService.sendMail(
      customer.email,
      'Recuperación de contraseña',
      `Hola, para restablecer tu contraseña, por favor haz clic en el siguiente enlace: ${resetUrl}`,
      `<p>Hola,</p><p>Para restablecer tu contraseña, por favor haz clic en el siguiente enlace: <a href="${resetUrl}">${resetUrl}</a></p>`,
    );

    return {
      message:
        'Se ha enviado un correo con instrucciones para reestablecer tu contraseña',
    };
  }

  //! Reestablecer la contraseña en la BD

  async resetPassword(resetPassword: ResetPasswordDto) {
    const { token, newPassword } = resetPassword;
    const customer = await this.customersRepository.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: MoreThan(new Date()),
      },
    });
    const hotelAdmin = await this.hotelAdminRepository.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: MoreThan(new Date()),
      },
    });

    if (!customer && !hotelAdmin) {
      throw new BadRequestException('Token inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (customer) {
      customer.password = hashedPassword;
      customer.passwordResetToken = null;
      customer.passwordResetExpires = null;
      await this.customersRepository.saveCustomerChanges(customer);
    } else if (hotelAdmin) {
      hotelAdmin.password = hashedPassword;
      hotelAdmin.passwordResetToken = null;
      hotelAdmin.passwordResetExpires = null;
      await this.hotelAdminRepository.saveAdminChanges(hotelAdmin);
    }

    return { message: 'Contraseña restablecida correctamente' };
  }

  //! Cambiar la contraseña

  async changePassword(id: string, updatePassword: UpdatePasswordDto) {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) {
      throw new BadGatewayException('Cliente no encontrado');
    }
    const isPasswordMatching = await bcrypt.compare(
      updatePassword.currentPassword,
      customer.password,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Contraseña actual incorrecta');
    }

    const hashedPassword = await bcrypt.hash(updatePassword.newPassword, 10);
    await this.customersRepository.update(id, { password: hashedPassword });

    return { message: 'Contraseña actualizada correctamente' };
  }

  async googleRegisterCustomer(details: GoogleRegisterUserDetails) {
    const foundCustomer = await this.customersRepository.getCustomerByEmail(
      details.email,
    );
    if (foundCustomer)
      throw new BadRequestException('Cuenta de Google ya registrada.');
    const newCustomer = await this.customersDBRepository.save(details);
    if (!newCustomer)
      throw new InternalServerErrorException(
        'Error del servidor al hacer el registro.',
      );
    return newCustomer;
  }

  async googleRegisterHotelAdmin(details: GoogleRegisterUserDetails) {
    const foundHotelAdmin =
      await this.hotelAdminRepository.getHotelAdminByEmail(details.email);
    if (foundHotelAdmin)
      throw new BadRequestException('Cuenta de Google ya registrada.');
    const newHotelAdmin = await this.hotelAdminsDBRepository.save(details);
    if (!newHotelAdmin)
      throw new InternalServerErrorException(
        'Error del servidor al hacer el registro.',
      );
    return newHotelAdmin;
  }

  async googleLogin(details: GoogleLoginUserDetails) {
    const customer = await this.customersRepository.getCustomerByEmail(
      details.email,
    );
    const adminHotel = await this.hotelAdminRepository.getHotelAdminByEmail(
      details.email,
    );

    if (!customer && !adminHotel)
      throw new BadRequestException('Cuenta de Google no registrada aún.');

    if (customer) {
      return customer;
    }
    if (adminHotel) {
      return adminHotel;
    }
  }

  async findUser(id: number) {
    let user: Customers | HotelAdmins =
      await this.customersRepository.findOneBy({ id });
    if (!user) {
      user = await this.hotelAdminRepository.findOneBy({ id });
    }
    return user;
  }
}
