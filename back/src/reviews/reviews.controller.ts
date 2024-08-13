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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @ApiOperation({summary: 'List all reviews'})
  @ApiResponse({ status: 200, description: 'List of reviews :)'})
  @ApiResponse({ status: 404, description: 'There are not reviews :('})
  @Get()
  getDbReviews() {
    return this.reviewService.getDbReviews();
  }
  
  @ApiOperation({summary: 'List all Reviews deleted'})
  @ApiResponse({ status: 200, description: 'List of reviews deleted :)'})
  @ApiResponse({ status: 404, description: 'There are not reviews deleted :('})
  @ApiBearerAuth()
  @Get('deleted')
  @Roles(Role.Admin,Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  getDbReviewDeleted(){
    return this.reviewService.getDbReviewDeleted();
  }
  
  @ApiOperation({summary: 'List only one review by ID'})
  @ApiParam({ name: 'id', required: true, description: 'ID Review', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Review found successfuly :)'})
  @ApiResponse({ status: 404, description: 'Review not found :('})
  @Get(':id')
  getDbReviewById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.getDbReviewById(id);
  }

  @ApiOperation({summary: 'Create a new Review'})
    @ApiBody({type: CreateReviewDto,
        examples: {
            example:{
                summary:"Example of registering a new review",
                value:{
                    "comment": "ya fue no regresare jamsssss son malos sus servicios",
                    "rating": 1,
                    "hotelId": "2fa912a4-7835-46e6-b895-220eae822ae0",
                    "clienteId": "8951b891-bb9f-4768-bee9-496b644a102e"
                }
            }
        }
    })
  @ApiResponse({ status: 200, description: 'Review created successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Review not created :('})
  @ApiBearerAuth()
  @Post()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  createReview(@Body() createreviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createreviewDto);
  }

  @ApiOperation({summary: 'Edit data of Review'})
  @ApiParam({ name: 'id', required: true, description: 'ID Review', example: '1121qwewasd-qw54wqeqwe-45121' })
    @ApiBody({type: UpdateReviewDto,
        examples: {
            example:{
                summary:"Example of editing a review",
                value:{
                  "comment": "la pase super, regresare....",
                  "rating": 4,
                  "hotelId": "2fa912a4-7835-46e6-b895-220eae822ae0",
                  "clienteId": "8951b891-bb9f-4768-bee9-496b644a102e" 
                }
            }
        }
    })
  @ApiResponse({ status: 200, description: 'Review updated successfully :)'})
  @ApiResponse({ status: 400, description: 'The format used is incorrect :('})
  @ApiResponse({ status: 404, description: 'Review not was updated :('})
  @Put(':id')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  updateDbReview(@Param('id', ParseUUIDPipe) id:string, @Body() updatereviewDto: Partial<UpdateReviewDto>){
    return this.reviewService.updateDbReview(id, updatereviewDto);
  }
  
  @ApiOperation({summary: 'Delete a review'})
  @ApiParam({ name: 'id', required: true, description: 'ID Review', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully :)'})
  @ApiResponse({ status: 404, description: 'Review not was eliminated  :('})
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  deleteDbReview(@Param('id', ParseUUIDPipe) id: string){
    return this.reviewService.deleteDbReview(id);
  }

  @ApiOperation({ summary: 'Borrado lógico de una reseña.' })
  @ApiParam({ name: 'id', required: true, description: 'ID Review', example: '1121qwewasd-qw54wqeqwe-45121' })
  @ApiResponse({ status: 200, description: 'Review soft delete successfully :)' })
  @ApiResponse({ status: 404, description: 'Review not was eliminated with soft delete  :(' })
  @ApiBearerAuth()
  @Roles(Role.User, Role.SuperAdmin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('softDelete/:id')
  async softDeleteReview(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewService.softDeleteReview(id)
  }

}
