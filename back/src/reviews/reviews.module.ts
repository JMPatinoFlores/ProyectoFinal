import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsController } from "./reviews.controller";
import { ReviewsRepository } from "./reviews.repository";
import { ReviewsService } from "./reviews.service";
import { Review } from "./reviews.entity";
import { Hotel } from "src/hotels/hotels.entity";
import { Customers } from "src/customers/customers.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Review,Hotel,Customers])],
    controllers:[ReviewsController],
    providers:[ReviewsRepository, ReviewsService]
})
export class ReviewsModule{

}