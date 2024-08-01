import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './customers.entitiy';
import { MoreThan, Repository } from 'typeorm';
import {
  CreateCustomerDto,
  PasswordRecoveryDto,
  ResetPasswordDto,
  UpdatePasswordDto,
} from './customers.dto';
import { IdDto } from 'src/dto/id.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
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

  //! Encontrar un cliente por email

  async getCustomerByEmail(email: string) {
    return await this.customersRepository.findOneBy({ email });
  }

  //! Recuperación de contraseña

  async passwordRecovery(passwordRecovery: PasswordRecoveryDto) {
    const { email } = passwordRecovery;
    const customer = await this.customersRepository.findOneBy({ email });
    if (!customer) {
      throw new BadRequestException(
        'No se encontró el cliente con el email proporcionado',
      );
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    customer.passwordResetToken = token;
    customer.passwordResetExpires = expirationDate;
    await this.customersRepository.save(customer);

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

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

    if (!customer) {
      throw new BadRequestException('Token inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    customer.password = hashedPassword;
    customer.passwordResetToken = null;
    customer.passwordResetExpires = null;

    await this.customersRepository.save(customer);

    return { message: 'Contraseña restablecida correctamente' };
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

    return customerNoPassword;
  }

  //! Modificar un cliente

  async updateCustomerInfo(id: string, customer: any) {
    await this.customersRepository.update(id, customer);
    const updatedCustomer = await this.customersRepository.findOneBy({ id });
    const { password, ...customerNoPassword } = updatedCustomer;
    return customerNoPassword;
  }

  //! Cambiar contraseña de un cliente

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
