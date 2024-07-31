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
import { PostponeBookingDto } from "./dtos/postpone-booking.dto";

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
        const bookings = await this.bookingDBRepository.find({
            relations: { bookingDetails: { hotel: true, availabilities: { room: { roomtype: true } } }, customer: true }, select: {
                customer: {
                    id: true,
                    name: true,
                    lastName: true,
                    email: true,
                    password: false,
                    phone: true,
                    country: true,
                    city: true,
                    address: true,
                    birthDate: true
                }
            }
        });
        if (bookings.length === 0) throw new NotFoundException('No se encontró ningún booking.')
        return bookings
    }

    async getBookingById(id: string) {
        return await this.bookingDBRepository.findOne({
            where: { id: id },
            relations: { bookingDetails: { availabilities: { room: { roomtype: true } }, hotel: true }, customer: true }, select: {
                customer: {
                    id: true,
                    name: true,
                    lastName: true,
                    email: true,
                    password: false,
                    phone: true,
                    country: true,
                    city: true,
                    address: true,
                    birthDate: true
                }
            },
        });
    }

    async getBookingsByCustomerId(id: string) {
        const bookings = await this.bookingDBRepository.find({
            where: { customer: { id: id } }, relations: { bookingDetails: { availabilities: { room: { roomtype: true } }, hotel: true }, customer: true }, select: {
                customer: {
                    id: true,
                    name: true,
                    lastName: true,
                    email: true,
                    password: false,
                    phone: true,
                    country: true,
                    city: true,
                    address: true,
                    birthDate: true
                }
            },
        })
        if (bookings.length === 0) throw new BadRequestException('No se encontró ningún booking.')
        return bookings
    }

    async getBookingsByHotelAdminId(id: string) {
        const bookings = await this.bookingDBRepository.find({
            where: { bookingDetails: { hotel: { hotelAdmin: { id: id } } } }, relations: { bookingDetails: { availabilities: { room: { roomtype: true } }, hotel: true }, customer: true }, select: {
                customer: {
                    id: true,
                    name: true,
                    lastName: true,
                    email: true,
                    password: false,
                    phone: true,
                    country: true,
                    city: true,
                    address: true,
                    birthDate: true
                }
            }
        })
        if (bookings.length === 0) throw new BadRequestException('No se encontró ningún booking.')
        return bookings
    }

    async createBooking(bookingData: CreateBookingDto) {
        const { date, time, customerId, hotelId, discount, roomTypesIdsAndDates } = bookingData

        const { password, ...customer } = await this.customersDBRepository.findOne({ where: { id: customerId } })

        if (!customer) throw new NotFoundException('Customer no encontrado.')

        let total: number = 0
        const availabilitiesSaved = []
        const roomsBooked = []

        const hotelToBook = await this.hotelDBRepository.findOne({
            where: { id: hotelId },
            relations: ['roomstype', 'roomstype.rooms', 'roomstype.rooms.availabilities']
        })

        if (!hotelToBook) throw new NotFoundException('Hotel no encontrado.')


        for (const roomTypeIdAndDate of roomTypesIdsAndDates) {
            const { roomTypeId, checkInDate, checkOutDate } = roomTypeIdAndDate;
            const customerCheckInDate = new Date(checkInDate).getTime();
            const customerCheckOutDate = new Date(checkOutDate).getTime();
            let isBooked = false

            for (const roomTypeOfHotel of hotelToBook.roomstype) {
                if (roomTypeId !== roomTypeOfHotel.id) continue;

                for (const room of roomTypeOfHotel.rooms) {
                    if (isBooked) {
                        break
                    }
                    let isAvailable = true
                    for (const availability of room.availabilities) {
                        const availabilityStartDate = new Date(availability.startDate).getTime();
                        const availabilityEndDate = new Date(availability.endDate).getTime();

                        if (!(customerCheckOutDate <= availabilityStartDate || customerCheckInDate >= availabilityEndDate)) {
                            isAvailable = false;
                            break;
                        }
                    }

                    if (isAvailable) {
                        const { availabilities, ...newRoom } = room;
                        const newRoomType = await this.roomTypeDBRepository.findOneBy({ id: roomTypeId })
                        newRoom.roomtype = newRoomType
                        const newAvailability = this.roomAvailabilityDBRepository.create({
                            startDate: checkInDate,
                            endDate: checkOutDate,
                            room: newRoom,
                        });

                        const savedAvailability = await this.roomAvailabilityDBRepository.save(newAvailability)

                        availabilitiesSaved.push(savedAvailability)

                        total += roomTypeOfHotel.price
                        isBooked = true;
                        break;
                    }

                }
                if (isBooked) break
            }

            if (!isBooked) {
                throw new BadRequestException('No available rooms for the specified dates.');
            }
        }

        if (availabilitiesSaved.length > 0) {
            const newTotal = total * (100 - discount) / 100
            const { roomstype, ...newHotel } = hotelToBook
            const bookingDetails = this.bookingDetailsDBRepository.create({ total: newTotal, discount, hotel: newHotel, availabilities: availabilitiesSaved })
            const newBookingDetails = await this.bookingDetailsDBRepository.save(bookingDetails)
            const booking = this.bookingDBRepository.create({ date, time, bookingDetails: newBookingDetails, customer })
            const newBooking = await this.bookingDBRepository.save(booking)

            return newBooking
        } else {
            throw new BadRequestException('Booking could not be completed.');
        }

    }

    async cancelBooking(id: string) {
        const booking = await this.bookingDBRepository.findOne({ where: { id: id }, relations: ['bookingDetails'] })
        await this.bookingDetailsDBRepository.update({ id: booking.bookingDetails.id }, { status: BookingDetailsStatus.CANCELLED })

        return "Booking cancelado exitosamente."
    }

    async postponeBooking(bookingData: PostponeBookingDto) {
        // 2024-07-25T17:04:51.143Z
        const { bookingId, newAvailabilities } = bookingData
        const booking = await this.bookingDBRepository.findOne({ where: { id: bookingId }, relations: {bookingDetails: {hotel: {roomstype: {rooms: {availabilities: true}}}}}  })
        const availabilitiesSaved: RoomAvailability[] = []
        let total: number = 0
        
        for (const newAvailability of newAvailabilities) {
            const newAvailabilityWithId = await this.roomAvailabilityDBRepository.findOne({ where: { id: newAvailability.id }, relations: { room: { roomtype: true } } })
            const customerCheckInDate = new Date(newAvailability.startDate).getTime()
            const customerCheckOutDate = new Date(newAvailability.endDate).getTime()
            let isBooked = false
            for (const roomType of booking.bookingDetails.hotel.roomstype) {
                if (isBooked) break
                if (roomType.id !== newAvailabilityWithId.room.roomtype.id) continue
                for (const room of roomType.rooms) {
                    let isAvailable = true
                    for (const oldAvailability of room.availabilities) {
                        if (isBooked) break
                        const oldAvailabilityStartDate = new Date(oldAvailability.startDate).getTime()
                        const oldAvailabilityEndDate = new Date(oldAvailability.endDate).getTime()

                        if (!(customerCheckOutDate <= oldAvailabilityStartDate || customerCheckInDate >= oldAvailabilityEndDate)) {
                            isAvailable = false
                            break
                        }

                        if (isAvailable) {
                            const { availabilities, ...newRoom } = room;
                            const newRoomType = await this.roomTypeDBRepository.findOneBy({ id: roomType.id })
                            
                            newRoom.roomtype = newRoomType
                            const availabilityToBook = this.roomAvailabilityDBRepository.create({
                                id: newAvailability.id,
                                startDate: newAvailability.startDate,
                                endDate: newAvailability.endDate,
                                room: newRoom,
                            });

                            const savedAvailability = await this.roomAvailabilityDBRepository.save(availabilityToBook)

                            availabilitiesSaved.push(savedAvailability)

                            total += roomType.price
                            isBooked = true;
                            break;
                        }
                    }
                    if (isBooked) break
                }
                if (!isBooked) {
                    throw new BadRequestException('No available rooms for the specified dates.');
                }
            }
        }

        if (availabilitiesSaved.length > 0) {
            const newBooking = await this.bookingDBRepository.findOne({
                where: { id: booking.id },
                relations: { bookingDetails: { availabilities: { room: { roomtype: true } }, hotel: true }, customer: true }, select: {
                    customer: {
                        id: true,
                        name: true,
                        lastName: true,
                        email: true,
                        password: false,
                        phone: true,
                        country: true,
                        city: true,
                        address: true,
                        birthDate: true
                    }
                }
            })

            return {
                message: 'Booking con availabilities actualizadas.',
                newBooking
            }
        } else {
            throw new BadRequestException('Booking could not be completed.');
        }
    }
}