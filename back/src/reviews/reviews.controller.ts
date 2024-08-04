import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './reviews.dtos';
import { UpdateReviewDto } from './reviews.updateDto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/guards/roles.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Get()
  getDbReviews() {
    return this.reviewService.getDbReviews();
  }
  
  @Get('deleted')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getDbReviewDeleted(){
    return this.reviewService.getDbReviewDeleted();
  }
  
  @Get(':id')
  getDbReviewById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.getDbReviewById(id);
  }

  @Post()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  createReview(@Body() createreviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createreviewDto);
  }

  @Put(':id')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  updateDbReview(@Param('id', ParseUUIDPipe) id:string, @Body() updatereviewDto: Partial<UpdateReviewDto>){
    return this.reviewService.updateDbReview(id, updatereviewDto);
  }

  @Delete(':id')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  deleteDbReview(@Param('id', ParseUUIDPipe) id: string){
    return this.reviewService.deleteDbReview(id);
  }

}
