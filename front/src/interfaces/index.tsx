import { JwtPayload } from "jwt-decode";

export interface IUser {
  id: string;
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

export interface IUserResponse extends IUser {
  isAdmin: boolean;
  hotels?: IHotel[];
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

export interface INewPassword {
  newPassword: string;
  confirmPassword: string;
}

export interface IResetPasswordProps {
  token: string;
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
  user: IUserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  login: (credentials: ILogin) => Promise<boolean>;
  googleLogin: (token: string, user: IUserResponse) => Promise<boolean>;
  customerRegister: (user: Omit<IUser, "id">) => Promise<boolean>;
  hotelierRegister: (user: Omit<IUser, "id">) => Promise<boolean>;
  postReview: (review: ICreateReview) => Promise<boolean>;
  getReviews: () => void;
  reviews: IReviewResponse[];
  logOut: () => void;
}

export interface ICreateReview {
  userId: number;
  hotelId: number;
  rating: number;
  comment: string;
}

export interface IReview {
  rating: number;
  comment: string;
}

export interface IReviewResponse {
  id: string;
  userId: string;
  hotelId: string;
  comment: string;
  date: string;
  rating: number;
}

export interface IReviewProps {
  review: IReviewResponse;
}

export interface IDecodeToken extends JwtPayload {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
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
  totalRooms: number;
  services: string[];
  rating: number;
  images: string[] | File[];
  hotel_admin_id: string;
}

export interface IHotelImage {
  image: File[];
}

export interface IHotel {
  id: string;
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
  images: string[];
  rating: number;
  hotelAdminId: string;
}

export interface IHotelContextType {
  hotels: IHotel[] | null;
  setHotels: React.Dispatch<React.SetStateAction<IHotel[] | null>>;
  addHotel: (hotel: IHotelRegister) => Promise<boolean>;
  fetchHotels: () => Promise<IHotelDetail[]>;
  fetchBookingsByHotel: (hotelId: string) => Promise<IBooking[]>;
  fetchRoomsByHotel: (hotelId: string) => Promise<IRoom[]>;
  fetchHotelById: (hotelId: string) => Promise<IHotelDetail | null>;
  fetchHotelsBySearch: (searchQuery: string) => Promise<IHotelDetail[]>;
  fetchHotelsByAdmin: (adminId: string) => Promise<IHotel[]>;
}

export interface IHotelResponse {
  id: string;
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
  images: string[];
  rating: number;
  hotelAdminId: string;
}

export interface IHotelAdmin {
  hotelAdminId: string;
  hotelsNumber: number;
  isAdmin: boolean;
  userId: string;
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
  description: string;
  email: string;
  price: number;
  country: string;
  city: string;
  address: string;
  location: number[];
  totalRooms: number;
  services: string[];
  rating: string;
  images: string[];
  isDeleted: boolean;
  roomstype: [];
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
