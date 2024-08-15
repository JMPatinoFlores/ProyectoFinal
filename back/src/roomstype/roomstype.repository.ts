import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomsType } from "./roomstype.entity";
import { Brackets, Repository } from "typeorm";
import { CreateRoomTypeDto } from "./roomstype.dtos";
import { Hotel } from "src/hotels/hotels.entity";
import { UpdateRoomsTypeDto } from "./romstype.udpateDto";


@Injectable()
export class RoomsTypeRepository {
    constructor(
        @InjectRepository(RoomsType) private readonly roomstypeDbRepository: Repository<RoomsType>,
        @InjectRepository(Hotel) private readonly hotelDbRepository: Repository<Hotel>
    ) { }

    async getDbRoomsType(): Promise<RoomsType[]> {
        let roomstypeList: RoomsType[] = await this.roomstypeDbRepository.find();
        if (roomstypeList.length !== 0) {
            roomstypeList = roomstypeList.filter(roomtype => roomtype.isDeleted === false)
            return roomstypeList;
        }
        else throw new NotFoundException("there are not roomstype");
    }

    async getRoomTypesByHotelId(hotelId: string): Promise<RoomsType[]> {
        const roomtypes = await this.roomstypeDbRepository.find({ where: { hotel: { id: hotelId } } })
        if (roomtypes.length === 0) throw new NotFoundException('El hotel no tiene room types.')
        return roomtypes
    }

    async getDbRoomTypeById(id: string): Promise<RoomsType> {
        const roomtypeFound: RoomsType = await this.roomstypeDbRepository //findOne({where:{id}, relations:{rooms:true}});
            .createQueryBuilder('roomstype')
            .leftJoinAndSelect('roomstype.rooms', 'room')
            .where('roomstype.id = :id', { id })
            .andWhere('roomstype.isDeleted = false')
            .getOne();

        if (!roomtypeFound) throw new NotFoundException("this roosmtype is not available");

        roomtypeFound.rooms = roomtypeFound.rooms.filter((room) => !room.isDeleted);

        return roomtypeFound;

    }

    async createDbRoomtype(roomtypeDto: CreateRoomTypeDto): Promise<string> {
        const { hotelId, name, price, ...roomtypeData } = roomtypeDto;
        console.log('Received room type DTO:', roomtypeDto);

        const nameRoomtypeFound = await this.roomstypeDbRepository.findOne({ where: { name: name, hotel: { id: hotelId } } });
        console.log('Existing room type found:', nameRoomtypeFound);
        if (nameRoomtypeFound) throw new BadRequestException("this roomtype already exists");

        const hotelFound: Hotel = await this.hotelDbRepository.findOne({ where: { id: hotelId }, relations: { roomstype: true } });
        if (!hotelFound) {
            throw new NotFoundException("Hotel with ID not found");
        }
        const arrayOfPrices = hotelFound.roomstype.map(roomtype => roomtype.price);
        arrayOfPrices.push(price)

        const total = arrayOfPrices.reduce((acc, curr) => acc + curr, 0)

        const averagePrice = Math.round((total / arrayOfPrices.length) * 10) / 10

        await this.hotelDbRepository.update({ id: hotelFound.id }, { price: averagePrice })

        const newRoomtype: RoomsType = this.roomstypeDbRepository.create({
            ...roomtypeData,
            name: name,
            price: price,
            hotel: hotelFound
        });

        await this.roomstypeDbRepository.save(newRoomtype);
        return newRoomtype.id;
    }

    async updateDbRoomstype(id: string, updateDbRoomstype: Partial<UpdateRoomsTypeDto>): Promise<string> {
        const roomstypeFound = await this.roomstypeDbRepository.findOne({ where: { id } });
        if (!roomstypeFound) throw new NotFoundException("Roomstype does not exists")
        await this.roomstypeDbRepository.update({id}, {...updateDbRoomstype});
        return id;
    }

    async deleteDbRoomtype(id: string): Promise<string> {
        const roomtypeFound: RoomsType = await this.roomstypeDbRepository.findOne({ where: { id } });
        if (!roomtypeFound) throw new NotFoundException("Roomtype not found");
        if (roomtypeFound.isDeleted === true) throw new BadRequestException("RoomsType was eliminated");
        await this.roomstypeDbRepository.update({ id }, { isDeleted: true });
        return id;
    }

    async restoreRoomstype(id: string): Promise<string> {
        const roomstypeFound: RoomsType = await this.roomstypeDbRepository.findOne({ where: { id } });
        if (!roomstypeFound) throw new NotFoundException("Roomtype not found");
        if (roomstypeFound.isDeleted === false) throw new BadRequestException("Roomstype is active");

        await this.roomstypeDbRepository.update(id, { isDeleted: false });
        return id;
    }

    async getDbRoomstypeDeleted(): Promise<RoomsType[]> {
        const listRoomstype: RoomsType[] = await this.roomstypeDbRepository.find({ where: { isDeleted: true } });
        if (listRoomstype.length !== 0) {
            return listRoomstype;
        }
        else throw new NotFoundException("There are not roomstype");
    }

    async searchRoomTypes(hotelId: string, query?: string): Promise<RoomsType[]> {
        const queryBuilder = this.roomstypeDbRepository
            .createQueryBuilder('roomtype')
            .where('roomtype.hotel.id = :hotelId', { hotelId });

        if (query) {
            console.log('buscando room types...');
            const searchTerm = `%${query.toLowerCase()}%`;

            queryBuilder
                .andWhere('roomtype.isDeleted = false')
                .andWhere('unaccent(LOWER(roomtype.name)) ILIKE unaccent(:searchTerm)', { searchTerm })
        }

        return await queryBuilder.getMany();
    }

} 