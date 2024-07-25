import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from './bookings/booking.module';
import { BookingDetailModule } from './bookingDetails/booking-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),                     
    }),
    BookingModule,
    BookingDetailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
