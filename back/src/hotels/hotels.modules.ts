import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HotelsController } from "./hotels.controllers";
import { Hotel } from "./hotels.entity";
import { HotelsRepository } from "./hotels.repositories";
import { HotelsService } from "./hotels.services";

@Module({
    imports: [TypeOrmModule.forFeature([Hotel])],
    controllers:[HotelsController],
    providers: [HotelsRepository,HotelsService]
})
export class HotelsModule{

}