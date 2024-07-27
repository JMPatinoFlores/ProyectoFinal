import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Repository } from "typeorm";
import { CreateBookingDto } from "./dtos/create-booking.dto";
import { BookingDetails } from "src/bookingDetails/booking-detail.entity";
import { BookingDetailStatus } from "../bookingDetails/enum/booking-detail-status.enum"

@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingDBRepository: Repository<Booking>,
    @InjectRepository(BookingDetails)
    private readonly bookingDetailsDBRepository: Repository<BookingDetails>,
  ) {}

  async getBookings() {
    return await this.bookingDBRepository.find();
  }

  async getBookingById(id: string) {
    return await this.bookingDBRepository.findOne({
      where: { id },
      relations: ['bookingDetails'],
    });
  }

/*
    async createBooking(bookingData: CreateBookingDto) {
        const { date, time, customerId, discount, checkInDate, checkOutDate } = bookingData
        
        // Remover
        const roomsTypesAndAmounts = {
            deluxe: 2,
            familiar: 3,
            matrimonial: 2
        }

  //     // Cambiar a typeorm
  //     const customer = 'Cliente de prueba.';

  //     if (!customer) throw new NotFoundException('Customer no encontrado.');
z
  //     const status = BookingDetailStatus.CONFIRMED;
  //     let total: number = 0;
  //     let rooms;

  //     for (const roomType in roomsTypesAndAmounts) {
  //       if (roomsTypesAndAmounts.hasOwnProperty(roomType)) {
  //         // Reemplazar con TypeORM. Llamar a la tabla de roomType.
  //         // const newRoomType = await this.roomTypeDBRepository.findOne({where: {name: roomType}, relations: ['rooms']})
  //         const newRoomType = {
  //           name: 'familiar',
  //           rooms: [
  //             {
  //               roomId: '1',
  //             },
  //             {
  //               roomId: '2',
  //             },
  //           ],
  //         };

  //         for (const room of newRoomType.rooms) {
  //           //Cambiar a TypeORM. Actualizar la propiedad isAvailable en Room en la BD.
  //           // await this.roomsDBRepository.update({roomId: room.roomId}, {isAvailable: false})
  //           // Preguntar sobre el setTimeOut para reiniciar el isAvailable después del checkOutDate
  //         }
  //       }
  //     }

  //     rooms = 'Array de rooms.';

  //     if (rooms.length < 1) throw new NotFoundException('Rooms no encontrados.');

        let bookingDetails = this.bookingDetailsDBRepository.create({total, discount, checkInDate, checkOutDate, status, rooms})
        
        let booking = this.bookingDBRepository.create({ date, time, customer })
        
        // Agregar cuando estén implementadas las relaciones

        const newBookingDetails = await this.bookingDetailsDBRepository.save(bookingDetails)

        booking.bookingDetails = newBookingDetails

  //     return await this.bookingDBRepository.save(booking);
  //   }

*/
    async cancelBooking(id: string) {
        console.log(id);
        
        const booking = await this.bookingDBRepository.findOne({ where: { id }, relations: ['bookingDetails'] })
        await this.bookingDetailsDBRepository.update({ id: booking.bookingDetails.id }, { status: BookingDetailStatus.CANCELLED })

        return "Booking cancelado exitosamente."
    }

  async postponeBooking(id: string, date: string) {
    // 2024-07-25T17:04:51.143Z
    const booking = await this.bookingDBRepository.findOneBy({ id });
    const newDate = new Date(date);
    const oldDate = new Date(booking.date);
    const differenceInMilliseconds = newDate.getTime() - oldDate.getTime();
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const differenceInDays = differenceInMilliseconds / millisecondsInADay;
    if (differenceInDays > 5) {
    }
  }
}