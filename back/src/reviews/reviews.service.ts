import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewDto } from './reviews.dtos';
import { UpdateReviewDto } from './reviews.updateDto';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewRepository: ReviewsRepository) {}

  async getDbReviews() {
    return await this.reviewRepository.getDbReviews();
  }

  async getDbReviewById(id: string) {
    return await this.reviewRepository.getDbReviewById(id);
  }

  async createReview(createreviewDto: CreateReviewDto) {
    return await this.reviewRepository.createReview(createreviewDto);
  }

  async updateDbReview(id: string, updatereviewDto: Partial<UpdateReviewDto>){
    return await this.reviewRepository.updateDbReview(id, updatereviewDto)
  }

  async deleteDbReview(id: string){
    return await this.reviewRepository.deleteDbReview(id);
  }

  async getDbReviewDeleted(){
    return await this.reviewRepository.getDbReviewDeleted();
  }

  async softDeleteReview(id: string) {
    return await this.reviewRepository.softDeleteReview(id);
  }
}
