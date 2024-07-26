import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsModule } from './hotels/hotels.modules';
import { RoomsModule } from './rooms/rooms.modules';
import { RoomsTypeModule } from './roomstype/roomstype.modules';

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
    HotelsModule, RoomsModule, RoomsTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
