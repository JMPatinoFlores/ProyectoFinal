import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { ReviewsService } from "./reviews.services";
import { CreateReviewDto } from "./reviews.dtos";


@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewService: ReviewsService
    ){}

    @Get()
    getDbReviews(){
        return this.reviewService.getDbReviews();
    }

    @Get(':id')
    getDbReviewById(@Param('id', ParseUUIDPipe) id:string){
        return this.reviewService.getDbReviewById(id);
    }

    @Post()
    createReview(@Body() createreviewDto: CreateReviewDto){
        return this.reviewService.createReview(createreviewDto);
    }
}