import { JwtPayload } from "jwt-decode";

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birthDate: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birthDate: string;
}

export interface IHotelierRegisterValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birthDate: string;
}

export interface IUserContextType {
  user: Partial<IUser> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUser> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  login: (credentials: ILogin) => Promise<boolean>;
  customerRegister: (user: Omit<IUser, "id">) => Promise<boolean>;
  hotelierRegister: (user: Omit<IUser, "id">) => Promise<boolean>;
  logOut: () => void;
}

export interface IDecodeToken extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

export interface IUserResponse {
  id: number;
  email: string;
}

export interface IRoom {
  roomId: string;
  numRoom: string;
  type: IRoomType[];
  status: boolean;
  hotelId: string;
}

export interface IRoomType {
  roomTypeId: string;
  name: string;
  capacity: number;
  totalBathrooms: number;
  totalBeds: number;
  image: string[];
  price: number;
}

export interface IRoomTypeRegister {
  name: string;
  capacity: number;
  totalBathrooms: number;
  totalBeds: number;
  price: number;
}

export interface IHotelRegister {
  name: string;
  description: string;
  email: string;
  country: string;
  city: string;
  address: string;
  location: number[];
  services: string;
}

export interface IHotelImage {
  image: File[];
}

export interface IHotel {
  hotelId: string;
  name: string;
  description: string;
  email: string;
  country: string;
  city: string;
  address: string;
  location: number[];
  totalRooms: number;
  availableRooms: IRoom[];
  services: string[];
  image: string[];
  rating: number;
  hotelAdminId: string;
}

export interface IHotelContextType {
  hotels: IHotel[] | null;
  setHotels: React.Dispatch<React.SetStateAction<IHotel[] | null>>;
  addHotel: (hotel: IHotelRegister) => Promise<boolean>;
  fetchHotels: () => Promise<void>;
  fetchBookingsByHotel: (hotelId: string) => Promise<IBooking[]>;
  fetchRoomsByHotel: (hotelId: string) => Promise<IRoom[]>;
  fetchHotelById: (hotelId: string) => Promise<IHotel | null>;
}

export interface IHotelResponse {
  hotelId: string;
  name: string;
  description: string;
  email: string;
  country: string;
  city: string;
  address: string;
  location: number[];
  totalRooms: number;
  avaliableRooms: IRoom[];
  services: string[];
  image: string[];
  rating: number;
  hotelAdminId: string;
}

export interface IHotelAdmin {
  hotelAdminId: string;
  hotelsNumber: number;
  isAdmin: boolean;
  userId: string;
}

export interface IReview {
  reviewId: string;
  userId: string;
  hotelId: string;
  comment: string;
  date: string;
  rating: number;
}

export interface IBooking {
  bookingId: string;
  date: string;
  time: string;
  status: boolean;
  userId: string;
}

export interface IBookingDetails {
  bookingDetailsId: string;
  price: number;
  checkInDate: string;
  checkOutDate: string;
  status: boolean;
  bookingId: string;
}

export interface IBookingForm {
  checkInDate: string;
  checkOutDate: string;
}

export interface IHotelDetail {
  id: string;
  name: string;
  price: number;
  country: string;
  city: string;
  distance: number;
  image: string;
  address: string;
  description: string;
  services: string[];
  recommendations: string;
}

export interface IHotelLocation {
  country: string;
  city: string;
  address: string;
}

export interface IProductsListProps {
  searchQuery: string;
}

export interface ILocationDetail {
  country: string;
  city: string;
  address: string;
}

export interface ISearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}