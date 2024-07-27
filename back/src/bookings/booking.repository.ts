import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Repository } from "typeorm";
import { CreateBookingDto } from "./dtos/create-booking.dto";
import { BookingDetails } from "src/bookingDetails/booking-detail.entity";
import { Customers } from "src/customers/customers.entitiy";
import { RoomsType } from "src/roomstype/roomstype.entity";
import { RoomAvailability } from "src/availabilities/availability.entity";
import { Hotel } from "src/hotels/hotels.entity";
import { Room } from "src/rooms/rooms.entity";
import { BookingDetailsStatus } from "src/bookingDetails/enum/booking-detail-status.enum";

@Injectable()
export class BookingRepository {
    constructor(
        @InjectRepository(Booking) private readonly bookingDBRepository: Repository<Booking>,
        @InjectRepository(BookingDetails) private readonly bookingDetailsDBRepository: Repository<BookingDetails>,
        @InjectRepository(Customers) private readonly customersDBRepository: Repository<Customers>,
        @InjectRepository(RoomsType) private readonly roomTypeDBRepository: Repository<RoomsType>,
        @InjectRepository(RoomAvailability) private readonly roomAvailabilityDBRepository: Repository<RoomAvailability>,
        @InjectRepository(Hotel) private readonly hotelDBRepository: Repository<Hotel>,
        @InjectRepository(Room) private readonly roomDBRepository: Repository<Room>
    ) { }

  async getBookings() {
    return await this.bookingDBRepository.find();
  }

  async getBookingById(id: string) {
    return await this.bookingDBRepository.findOne({
      where: { bookingId: id },
      relations: ['bookingDetails'],
    });
    }

    async getBookingsByCustomerId(id: string) {
        
  }

/*
    async createBooking(bookingData: CreateBookingDto) {
        const { date, time, customerId, hotelToBookId, discount, checkInDate, checkOutDate, roomsTypesAndAmounts } = bookingData

        const customer = await this.customersDBRepository.findOne({where: {id: customerId}})

        if (!customer) throw new NotFoundException('Customer no encontrado.')

        let total: number = 0
        let hotelBooked: Hotel

        const hotel = await this.hotelDBRepository.findOne({
            where: { hotelId: hotelToBookId },
            relations: ['roomstype', 'roomstype.rooms', 'roomstype.rooms.availabilities']
        })

        if (!hotel) throw new NotFoundException('Hotel no encontrado.')

        for (const roomType in roomsTypesAndAmounts) {
            if (roomsTypesAndAmounts.hasOwnProperty(roomType)) {
                for (const roomTypeOfHotel of hotel.roomstype) {
                    if (roomType === roomTypeOfHotel.name) {
                        for (let i = 1; i <= roomsTypesAndAmounts.roomType; i++) {
                            let isBooked = false
                            for (const room of roomTypeOfHotel.rooms) {
                                if (isBooked) break
                                for (const availability of room.availabilities) {
                                    if (isBooked) break
                                    const customerCheckInDate = new Date(checkInDate).getTime()
                                    const customerCheckOutDate = new Date(checkOutDate).getTime()
                                    const availabilityStartDate = new Date(availability.startDate).getTime()
                                    const availabilityEndDate = new Date(availability.endDate).getTime()
                                    
                                    if ((customerCheckInDate < availabilityStartDate && customerCheckOutDate < availabilityEndDate) || (customerCheckInDate > availabilityStartDate && customerCheckOutDate < availabilityEndDate) || (customerCheckInDate > availabilityStartDate && customerCheckOutDate > availabilityEndDate)) {
                                        throw new BadRequestException('Fechas para el booking no disponibles.')
                                    }
        
                                    const availabilityToRelate = this.roomAvailabilityDBRepository.create({
                                        startDate: checkInDate,
                                        endDate: checkOutDate,
                                        room: room
                                    })
        
                                    const roomToRelate = this.roomDBRepository.create({
                                        roomId: room.roomId,
                                        roomtype: roomTypeOfHotel,
                                    })

                                    const roomTypeToRelate = this.roomTypeDBRepository.create({
                                        roomsTypeId: roomTypeOfHotel.roomsTypeId,
                                        hotel: hotel
                                    })

                                    await this.roomAvailabilityDBRepository.save(availabilityToRelate)
                                    await this.roomDBRepository.save(roomToRelate)
                                    await this.roomTypeDBRepository.save(roomTypeToRelate)

                                    hotelBooked = hotel

                                    isBooked = true
                                }
                            }
                        }
                    }
                }
            }
        }

        let bookingDetails = this.bookingDetailsDBRepository.create({ total, discount, checkInDate, checkOutDate, hotel })
        
        let booking = this.bookingDBRepository.create({date, time, bookingDetails, customer})
        
        const newBookingDetails = await this.bookingDetailsDBRepository.save(bookingDetails)

  //     return await this.bookingDBRepository.save(booking);
  //   }

*/
    async cancelBooking(id: string) {
        const booking = await this.bookingDBRepository.findOne({ where: { bookingId: id }, relations: ['bookingDetails'] })
        await this.bookingDetailsDBRepository.update({ bookingDetailsId: booking.bookingDetails.bookingDetailsId }, { status: BookingDetailsStatus.CANCELLED })

        return "Booking cancelado exitosamente."
    }

    async postponeBooking(id: string, checkInDate: string) {
        // 2024-07-25T17:04:51.143Z
        const booking = await this.bookingDBRepository.findOne({ where: { bookingId: id }, relations: ['hotel', 'hotel.roomstype', 'hotel.roomstype.rooms', 'hotel.roomstype.rooms.availabilities']})
        const newDate = new Date(checkInDate)
        const oldDate = new Date(booking.date)
        const differenceInMilliseconds = newDate.getTime() - oldDate.getTime()
        const millisecondsInADay = 24 * 60 * 60 * 1000
        const differenceInDays = differenceInMilliseconds / millisecondsInADay
        if (differenceInDays > 5) {
            for (const roomType of booking.bookingDetails.hotel.roomstype) {
                let isBooked = false
                const newRoomType = await this.roomTypeDBRepository.findOne({where: {roomsTypeId: roomType.roomsTypeId}, relations: ['roomstype.rooms', 'roomstype.rooms.availabilities']})
                for (const room of newRoomType.rooms) {
                    if (isBooked) break
                    for (const availability of room.availabilities) {
                        if (isBooked) break
                        let newCheckInDate: number | string = new Date(checkInDate).getTime()
                        const oldCheckInDate = new Date(booking.bookingDetails.checkInDate).getTime()
                        const timeToPostpone = newCheckInDate - oldCheckInDate
                        const oldCheckOutDate = new Date(booking.bookingDetails.checkOutDate)
                        let newCheckOutDate: number | string = oldCheckOutDate.setTime(oldCheckOutDate.getTime() + timeToPostpone)
                        const availabilityStartDate = new Date(availability.startDate).getTime()
                        const availabilityEndDate = new Date(availability.endDate).getTime()

                        if ((newCheckInDate < availabilityStartDate && newCheckOutDate < availabilityEndDate) || (newCheckInDate > availabilityStartDate && newCheckOutDate < availabilityEndDate) || (newCheckInDate > availabilityStartDate && newCheckOutDate > availabilityEndDate)) {
                            throw new BadRequestException('Fechas para el booking no disponibles.')
                        }

                        newCheckInDate = new Date(newCheckInDate).toISOString()
                        newCheckOutDate = new Date(newCheckOutDate).toISOString()

                        await this.bookingDetailsDBRepository.update({ bookingDetailsId: booking.bookingDetails.bookingDetailsId }, { checkInDate: newCheckInDate, checkOutDate: newCheckOutDate })

                        const availabilityToRelate = this.roomAvailabilityDBRepository.create({ startDate: newCheckInDate, endDate: newCheckOutDate, room: room })
                        
                        const roomToRelate = this.roomDBRepository.create({ roomId: room.roomId, roomtype: newRoomType })
                        
                        const roomTypeToRelate = this.roomTypeDBRepository.create({ roomsTypeId: newRoomType.roomsTypeId, hotel: booking.bookingDetails.hotel })

                        await this.roomAvailabilityDBRepository.save(availabilityToRelate)
                        await this.roomDBRepository.save(roomToRelate)
                        await this.roomTypeDBRepository.save(roomTypeToRelate)
                        
                        isBooked = true
                    }
                }
            }
        }
    }
}