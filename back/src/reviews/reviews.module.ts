import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsController } from "./reviews.controller";
import { ReviewsRepository } from "./reviews.repositories";
import { ReviewsService } from "./reviews.services";
import { Review } from "./reviews.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    controllers:[ReviewsController],
    providers:[ReviewsRepository, ReviewsService]
})
export class ReviewsModule{

}