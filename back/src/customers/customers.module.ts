import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './customers.repository';
import { Customers } from './customers.entity';
import { MailService } from 'src/email-notify/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  controllers: [CustomersController],
  providers: [CustomersService, CustomersRepository, MailService],
  exports: [CustomersRepository],
})
export class CustomersModule {}
