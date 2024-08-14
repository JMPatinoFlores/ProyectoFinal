import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Review } from './reviews.entity';
import { CreateReviewDto } from './reviews.dtos';
import { Hotel } from 'src/hotels/hotels.entity';
import { Customers } from 'src/customers/customers.entity';
import { UpdateReviewDto } from './reviews.updateDto';
import { format } from 'date-fns';

@Injectable()
export class ReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsDbRepository: Repository<Review>,
    @InjectRepository(Hotel)
    private readonly hotelDbRepository: Repository<Hotel>,
    @InjectRepository(Customers)
    private readonly customerDbRepository: Repository<Customers>,
  ) {}

  async getDbReviews(): Promise<Review[]> {
    const reviewsList: Review[] = await this.reviewsDbRepository.find({
      where: { isDeleted: false },
    });
    return reviewsList.length !== 0 ? reviewsList : [];
  }

  async getDbReviewById(id: string): Promise<Review> {
    const reviewFound: Review = await this.reviewsDbRepository.findOne({
      where: { id },
    });
    if (!reviewFound || reviewFound.isDeleted === true)
      throw new NotFoundException('this comment does not exits');
    else return reviewFound;
  }

  async createReview(createreviewDto: CreateReviewDto): Promise<string> {
    const { hotelId, clienteId, ...reviewData } = createreviewDto;

    const hotelFound: Hotel = await this.hotelDbRepository.findOne({
      where: { id: hotelId },
    });
    const customerFound: Customers = await this.customerDbRepository.findOne({
      where: { id: clienteId },
    });

    if (!customerFound)
      throw new NotFoundException('this customer is not available');

    if (!hotelFound) throw new NotFoundException('this hotel is not available');

    const currentDate = new Date();
    const formatDate = format(currentDate, 'dd-MM-yyyy');

    const newReview = this.reviewsDbRepository.create({
      ...reviewData,
      date: formatDate,
      hotel: hotelFound,
      customer: customerFound,
    });

    await this.reviewsDbRepository.save(newReview);

    const calcAverage = await this.averageRating(hotelId);
    console.log(calcAverage);

    await this.hotelDbRepository.update(hotelId, { rating: calcAverage });

    return newReview.id;
  }

  async searchReviews(hotelId: string, query?: string): Promise<Review[]> {
    const queryBuilder = this.reviewsDbRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.customer', 'customer')
      .where('review.hotel.id = :hotelId', { hotelId });

    if (query) {
      console.log('buscando reviews...');
      const searchTerm = `%${query.toLowerCase()}%`;

      queryBuilder
      .andWhere('review.isDeleted = false')
      .andWhere(
        new Brackets(qb => {
            qb.where('unaccent(LOWER(review.comment)) ILIKE unaccent(:searchTerm)', { searchTerm })
            .orWhere('unaccent(LOWER(customer.name)) ILIKE unaccent(:searchTerm)', { searchTerm })
            .orWhere('unaccent(LOWER(customer.lastName)) ILIKE unaccent(:searchTerm)', { searchTerm });
          })
        )
    }

    return await queryBuilder.getMany();
  }

  async updateDbReview(
    id: string,
    updatereviewDto: Partial<UpdateReviewDto>,
  ): Promise<string> {
    const { hotelId, clienteId, ...reviewData } = updatereviewDto;

    const hotelFound: Hotel = await this.hotelDbRepository.findOne({
      where: { id: hotelId },
    });
    const customerFound: Customers = await this.customerDbRepository.findOne({
      where: { id: clienteId },
    });

    if (!customerFound)
      throw new NotFoundException('this customer is not available');

    if (!hotelFound) throw new NotFoundException('this hotel is not available');

    await this.reviewsDbRepository.update(id, {
      ...reviewData,
      hotel: hotelFound,
      customer: customerFound,
    });

    const calcAverage = await this.averageRating(hotelId);
    await this.hotelDbRepository.update(hotelId, { rating: calcAverage });

    return id;
  }

  async deleteDbReview(id: string): Promise<string> {
    const reviewFound: Review = await this.reviewsDbRepository.findOne({
      where: { id },
      relations: ['hotel'],
    });
    if (!reviewFound) throw new NotFoundException('Review not found');
    if (reviewFound.isDeleted === true)
      throw new BadRequestException('review was eliminated');
    await this.reviewsDbRepository.update(id, { isDeleted: true });

    const calcAverage = await this.averageRating(reviewFound.hotel.id);
    await this.hotelDbRepository.update(reviewFound.hotel.id, {
      rating: calcAverage,
    });

    return id;
  }

  async getDbReviewDeleted(): Promise<Review[]> {
    const listReview: Review[] = await this.reviewsDbRepository.find({
      where: { isDeleted: true },
    });
    if (listReview.length !== 0) {
      return listReview;
    } else throw new NotFoundException('there are not reviews eliminated');
  }

  private async averageRating(id: string): Promise<number> {
    const reviewList: Review[] = await this.reviewsDbRepository.find({
      where: { hotel: { id }, isDeleted: false },
      select: ['rating'],
    });

    if (reviewList.length === 0) return 0;

    console.log(reviewList);

    const totalRating = reviewList.reduce((acc, ini) => acc + ini.rating, 0);
    console.log(totalRating);
    console.log(reviewList.length);

    const average = totalRating / reviewList.length;

    return parseFloat(average.toFixed(2));
  }

  async softDeleteReview(id: string) {
    await this.reviewsDbRepository.update({ id }, { isDeleted: true })
    return true
  }
}
