import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./reviews.entity";
import { CreateReviewDto } from "./reviews.dtos";
import { Hotel } from "src/hotels/hotels.entity";



@Injectable()
export class ReviewsRepository{
    constructor(
        @InjectRepository(Review) private readonly reviewsDbRepository: Repository<Review>,
        @InjectRepository(Hotel) private readonly hotelDbRepository: Repository<Hotel>
    ){}

    async getDbReviews(): Promise<Review[]>{
        const reviewsList: Review[] = await this.reviewsDbRepository.find();
        return reviewsList.length !==0 ? reviewsList : [];
    }

    async getDbReviewById(id: string): Promise<Review>{
        const reviewFound: Review = await this.reviewsDbRepository.findOne({where:{reviewId:id}});
        if(!reviewFound) throw new NotFoundException("this comment does not exits");
        else return reviewFound;
    }

    async createReview(createreviewDto: CreateReviewDto): Promise<string> {
        const { hotelId, ...reviewData } = createreviewDto;

        const hotelFound: Hotel = await this.hotelDbRepository.findOne({where:{hotelId}});
        
        if(!hotelFound) throw new NotFoundException("this hotel is not available");
        const newReview  = this.reviewsDbRepository.create({
            ...reviewData,
            hotel: hotelFound
        });

        await this.reviewsDbRepository.save(newReview);
        return newReview.reviewId;

    }
}