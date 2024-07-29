import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repositories';
import { CreateReviewDto } from './reviews.dtos';

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
}
