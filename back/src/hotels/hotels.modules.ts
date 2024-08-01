import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HotelsController } from "./hotels.controllers";
import { Hotel } from "./hotels.entity";
import { HotelsRepository } from "./hotels.repositories";
import { HotelsService } from "./hotels.services";
import { HotelAdmins } from "src/hotel-admins/hotelAdmins.entity";
import { NaturalLanguageProcessor } from "src/helper/natural-language-processor";

@Module({
    imports: [TypeOrmModule.forFeature([Hotel,HotelAdmins])],
    controllers:[HotelsController],
    providers: [HotelsRepository,HotelsService,NaturalLanguageProcessor]
})
export class HotelsModule{

}