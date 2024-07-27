import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HotelsController } from "./hotels.controllers";
import { Hotel } from "./hotels.entity";
import { HotelsRepository } from "./hotels.repositories";
import { HotelsService } from "./hotels.services";
import { HotelAdmins } from "src/hotel-admins/hotelAdmins.entitity";

@Module({
    imports: [TypeOrmModule.forFeature([Hotel,HotelAdmins])],
    controllers:[HotelsController],
    providers: [HotelsRepository,HotelsService]
})
export class HotelsModule{

}