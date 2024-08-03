import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './reviews.dtos';
import { UpdateReviewDto } from './reviews.updateDto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Get()
  getDbReviews() {
    return this.reviewService.getDbReviews();
  }
  
  @Get('deleted')
  getDbReviewDeleted(){
    return this.reviewService.getDbReviewDeleted();
  }
  
  @Get(':id')
  getDbReviewById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.getDbReviewById(id);
  }

  @Post()
  createReview(@Body() createreviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createreviewDto);
  }

  @Put(':id')
  updateDbReview(@Param('id', ParseUUIDPipe) id:string, @Body() updatereviewDto: Partial<UpdateReviewDto>){
    return this.reviewService.updateDbReview(id, updatereviewDto);
  }

  @Delete(':id')
  deleteDbReview(@Param('id', ParseUUIDPipe) id: string){
    return this.reviewService.deleteDbReview(id);
  }

}
