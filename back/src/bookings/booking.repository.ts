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
    return await this.bookingDBRepository.find({relations: {bookingDetails: {hotel:{roomstype:{rooms:{availabilities: true}}}}}});
  }

  async getBookingById(id: string) {
    return await this.bookingDBRepository.findOne({
      where: { id: id },
      relations: ['bookingDetails'],
    });
    }

    async getBookingsByCustomerId(id: string) {
        
  }


    async createBooking(bookingData: CreateBookingDto) {
        const { date, time, customerId, hotelToBookId, discount, roomsTypesAndAmounts } = bookingData

        const customer = await this.customersDBRepository.findOne({ where: { id: customerId } })

        if (!customer) throw new NotFoundException('Customer no encontrado.')

        let total: number = 0
        let availabilityToRelate: RoomAvailability
        let roomsToRelate: Room[] = []
        let roomTypeToRelate: RoomsType
        let roomTypesToRelate: RoomsType[] = []

        const hotel = await this.hotelDBRepository.findOne({
            where: { id: hotelToBookId },
            relations: ['roomstype', 'roomstype.rooms', 'roomstype.rooms.availabilities']
        })

        if (!hotel) throw new NotFoundException('Hotel no encontrado.')
        
        const availabilitiesBooked = []

        for (let i = 0; i < roomsTypesAndAmounts.length; i++) {
            let isBooked = false
            
                for (const roomTypeOfHotel of hotel.roomstype) {
                    // console.log("hola"); // si
                    if (isBooked) break

                    if (roomsTypesAndAmounts[i]["roomType"] === roomTypeOfHotel.name) {
                        // console.log("hola"); // si

                            for (const room of roomTypeOfHotel.rooms) {
                                if (isBooked) break
                                for (const availability of room.availabilities) {
                                    
                                    if (isBooked) break
                                    const customerCheckInDate = new Date(roomsTypesAndAmounts[i]["checkInDate"]).getTime()
                                    const customerCheckOutDate = new Date(roomsTypesAndAmounts[i]["checkOutDate"]).getTime()
                                    const availabilityStartDate = new Date(availability.startDate).getTime()
                                    const availabilityEndDate = new Date(availability.endDate).getTime()
                                    
                                    // console.log("checkInDate: ", customerCheckInDate);
                                    // console.log("checkOutDate: ", customerCheckOutDate);
                                    // console.log("availabilityStartDate: ", availabilityStartDate);
                                    // console.log("availabilityEndDate: ", availabilityEndDate);

                                    if (customerCheckOutDate <= availabilityStartDate || customerCheckInDate >= availabilityEndDate) {
                                        
                                        const availabilityToRelate = this.roomAvailabilityDBRepository.create({
                                            startDate: roomsTypesAndAmounts[i]["checkInDate"],
                                            endDate: roomsTypesAndAmounts[i]["checkOutDate"],
                                            room: room
                                        })
            
                                        let roomToRelate = this.roomDBRepository.create({
                                            id: room.id,
                                            roomtype: roomTypeOfHotel,
                                        })

                                        await this.roomAvailabilityDBRepository.save(availabilityToRelate)
                                        roomToRelate = await this.roomDBRepository.save(roomToRelate)
    
                                        availabilitiesBooked.push(availabilityToRelate)
                                        if (availabilityToRelate) {
                                            roomTypeToRelate = roomTypeOfHotel
                                            roomsToRelate.push(roomToRelate)
                                            roomTypesToRelate.push(roomTypeOfHotel)
                                            isBooked = true
                                        }
                                    }
                                }
                            }
                    }
                }
        }
    
        if (availabilitiesBooked.length > 0) {
            roomTypeToRelate = this.roomTypeDBRepository.create({ id: roomTypeToRelate.id, rooms: roomsToRelate })
            
            await this.roomTypeDBRepository.save(roomTypeToRelate)

            let hotelToRelate = this.hotelDBRepository.create({ id: hotel.id, roomstype: roomTypesToRelate })
            
            await this.hotelDBRepository.save(hotelToRelate)

            let bookingDetails = this.bookingDetailsDBRepository.create({ total, discount, hotel: hotelToRelate })
            
            const newBookingDetails = await this.bookingDetailsDBRepository.save(bookingDetails)
    
            let booking = this.bookingDBRepository.create({ date, time, bookingDetails, customer })
    
            return await this.bookingDBRepository.save(booking);
            
        } else {
            throw new BadRequestException('Fechas no disponibles.')
        }

    }

    async cancelBooking(id: string) {
        const booking = await this.bookingDBRepository.findOne({ where: { id: id }, relations: ['bookingDetails'] })
        await this.bookingDetailsDBRepository.update({ id: booking.bookingDetails.id }, { status: BookingDetailsStatus.CANCELLED })

        return "Booking cancelado exitosamente."
    }
    
    // async postponeBooking(id: string, checkInDate: string) {
    //     // 2024-07-25T17:04:51.143Z
    //     const booking = await this.bookingDBRepository.findOne({ where: { id: id }, relations: ['hotel', 'hotel.roomstype', 'hotel.roomstype.rooms', 'hotel.roomstype.rooms.availabilities']})
    //     const newDate = new Date(checkInDate)
    //     const oldDate = new Date(booking.date)
    //     const differenceInMilliseconds = newDate.getTime() - oldDate.getTime()
    //     const millisecondsInADay = 24 * 60 * 60 * 1000
    //     const differenceInDays = differenceInMilliseconds / millisecondsInADay
    //     if (differenceInDays > 5) {
    //         for (const roomType of booking.bookingDetails.hotel.roomstype) {
    //             let isBooked = false
    //             const newRoomType = await this.roomTypeDBRepository.findOne({where: {id: roomType.id}, relations: ['roomstype.rooms', 'roomstype.rooms.availabilities']})
    //             for (const room of newRoomType.rooms) {
    //                 if (isBooked) break
    //                 for (const availability of room.availabilities) {
    //                     if (isBooked) break
    //                     let newCheckInDate: number | string = new Date(checkInDate).getTime()
    //                     const oldCheckInDate = new Date(booking.bookingDetails.checkInDate).getTime()
    //                     const timeToPostpone = newCheckInDate - oldCheckInDate
    //                     const oldCheckOutDate = new Date(booking.bookingDetails.checkOutDate)
    //                     let newCheckOutDate: number | string = oldCheckOutDate.setTime(oldCheckOutDate.getTime() + timeToPostpone)
    //                     const availabilityStartDate = new Date(availability.startDate).getTime()
    //                     const availabilityEndDate = new Date(availability.endDate).getTime()

    //                     if ((newCheckInDate < availabilityStartDate && newCheckOutDate < availabilityEndDate) || (newCheckInDate > availabilityStartDate && newCheckOutDate < availabilityEndDate) || (newCheckInDate > availabilityStartDate && newCheckOutDate > availabilityEndDate)) {
    //                         throw new BadRequestException('Fechas para el booking no disponibles.')
    //                     }

    //                     newCheckInDate = new Date(newCheckInDate).toISOString()
    //                     newCheckOutDate = new Date(newCheckOutDate).toISOString()

    //                     await this.bookingDetailsDBRepository.update({ id: booking.bookingDetails.id }, { checkInDate: newCheckInDate, checkOutDate: newCheckOutDate })

    //                     const availabilityToRelate = this.roomAvailabilityDBRepository.create({ startDate: newCheckInDate, endDate: newCheckOutDate, room: room })
                        
    //                     const roomToRelate = this.roomDBRepository.create({ id: room.id, roomtype: newRoomType })
                        
    //                     const roomTypeToRelate = this.roomTypeDBRepository.create({ id: newRoomType.id, hotel: booking.bookingDetails.hotel })

    //                     await this.roomAvailabilityDBRepository.save(availabilityToRelate)
    //                     await this.roomDBRepository.save(roomToRelate)
    //                     await this.roomTypeDBRepository.save(roomTypeToRelate)
                        
    //                     isBooked = true
    //                 }
    //             }
    //         }
    //     }
    // }
}