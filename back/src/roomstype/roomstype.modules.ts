import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsType } from "./roomstype.entity";
import { RoomsTypeController } from "./roomstype.controllers";
import { RoomsTypeRepository } from "./roomstype.repositories";
import { RoomsTypeService } from "./roomstype.services";
import { Hotel } from "src/hotels/hotels.entity";


@Module({
    imports: [TypeOrmModule.forFeature([RoomsType, Hotel])],
    controllers: [RoomsTypeController],
    providers: [RoomsTypeRepository,RoomsTypeService]
})
export class RoomsTypeModule{

}