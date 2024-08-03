import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsType } from "./roomstype.entity";
import { RoomsTypeController } from "./roomstype.controller";
import { RoomsTypeRepository } from "./roomstype.repository";
import { RoomsTypeService } from "./roomstype.service";
import { Hotel } from "src/hotels/hotels.entity";


@Module({
    imports: [TypeOrmModule.forFeature([RoomsType, Hotel])],
    controllers: [RoomsTypeController],
    providers: [RoomsTypeRepository,RoomsTypeService]
})
export class RoomsTypeModule{

}