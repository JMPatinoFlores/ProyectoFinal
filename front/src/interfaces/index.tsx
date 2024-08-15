import { JwtPayload } from "jwt-decode";
import React from "react";

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birthDate: string;
}

export interface IUserResponse extends IUser {
  isAdmin: boolean;
  hotels?: IHotel[];
  reviews?: IReview[];
  bookings?: IBooking[];
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
  customerRegister: (user: Omit<IUser, "id">) => Promise<boolean>;
  hotelierRegister: (user: Omit<IUser, "id">) => Promise<boolean>;
  getReviews: () => void;
  reviews: IReview[];
  getBookings: (customerId: string) => Promise<void>;
  getHotelsByAdmin: (adminId: string) => Promise<void>;
  addNewHotel: (newHotel: IHotel) => void;
  logOut: () => void;
}

export interface IPostReview {
  rating: number;
  comment: string;
}

export interface ICreateReview extends IPostReview {
  clienteId: string;
  hotelId: string;
}

export interface IReview {
  id: string;
  comment: string;
  date: string;
  rating: number;
}

export interface IReviewResponse extends IReview {
  isDeleted: boolean;
  customer: IUser;
}

export interface IReviewProps {
  review: IReview;
}

export interface IDecodeToken extends JwtPayload {
  id: string;
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

export interface ICreateNumberOfRoom {
  roomNumber: string;
  roomsTypeId: string;
}
export interface IRoomType {
  id: string;
  roomTypeId: string;
  name: string;
  capacity: number;
  totalBathrooms: number;
  totalBeds: number;
  images: string[];
  price: number;
}

export interface IRoomTypeRegister {
  id: string;
  roomTypeId: string;
  name: string;
  capacity: number;
  totalBathrooms: number;
  totalBeds: number;
  images: string[];
  price: number;
  hotelId: string;
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

export interface IHotelFormData {
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
  images: string[];
  hotel_admin_id: string;
}

export interface IHotelErrors {
  name: string;
  description: string;
  email: string;
  country: string;
  city: string;
  address: string;
  location: string;
  totalRooms: string;
  services: string;
  rating: string;
  images: string;
  hotel_admin_id: string;
}

export interface ICreateBooking {
  customerId: string;
  hotelId: string;
  roomTypesIdsAndDates: IRoomTypesIdsAndDates[];
}

export interface IRoomTypesIdsAndDates {
  roomTypeId: string;
  checkInDate: string;
  checkOutDate: string;
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
  reviews?: IReview[];
  hotelAdminId: string;
  isDeleted: boolean;
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
  fetchHotelsByFilters: (queryParams: string) => Promise<IHotelDetail[]>;
  fetchHotelsByAdmin: (adminId: string) => Promise<IHotel[]>;
  updateHotelDetails: (
    hotelId: string,
    hotelDetails: Partial<IAdminHotel>
  ) => Promise<boolean>;
  deleteHotelById: (hotelId: string) => Promise<boolean>;
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
  images: string[];
  rating: number;
  reviews?: IReview[];
  hotelAdminId: string;
}

export interface IAdminHotel {
  id: string;
  name: string;
  description: string;
  email: string;
  country: string;
  city: string;
  address: string;
  totalRooms: number;
  services: string[];
  images: string[];
}

export interface IHotelAdmin {
  hotelAdminId: string;
  hotelsNumber: number;
  isAdmin: boolean;
  userId: string;
}

export interface IBooking {
  id: string;
  date: string;
  isDeleted: boolean;
  bookingDetails: IBookingDetails;
}

export interface IBookingDetails {
  id: string;
  total: number;
  isDeleted: boolean;
  status: string;
  hotel: IHotel;
  availabilities: IAvailabilities[];
}

export interface IAvailabilities {
  id: string;
  startDate: string;
  endDate: string;
  isAvailable: boolean;
  isDeleted: boolean;
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
  reviews: IReviewResponse[];
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
  queryParams: string;
}

export interface QueryParams {
  rating?: number;
  country?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ILocationDetail {
  country: string;
  city: string;
  address: string;
}

export interface ISearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

export interface IHotelsFilterProps {
  onFilter: (params: QueryParams) => void;
}

export interface ISuperAdminDashboardProps {
  totalCustomers: number;
  totalBookings: number;
  totalEarnings: number;
}

export interface ISuperAdminContextType {
  superAdmin: ISuperAdmin | null;
  setSuperAdmin: (superAdmin: ISuperAdmin | null) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  isSuperAdmin: boolean;
  setIsSuperAdmin: (isSuperAdmin: boolean) => void;
  signIn: (credentials: ILoginUser) => Promise<boolean>;
  fetchCustomers: () => Promise<ICustomerDetails[]>;
  fetchBookings: () => Promise<IBookingOfSuperAdmin[]>;
  fetchBookingsByCustomerId: (
    customerId: string
  ) => Promise<IBookingOfSuperAdmin[]>;
  fetchHotelAdmins: () => Promise<IHotelAdminDetails[]>;
  fetchDeleteHotelAdmin: (hotelAdminId: string) => Promise<boolean>;
  fetchDeleteCustomer: (customerId: string) => Promise<boolean>;
  fetchHotelAdminById: (
    hotelAdminId: string
  ) => Promise<IHotelAdminDetails | undefined>;
  fetchHotelById: (hotelId: string) => Promise<IHotelOfSuperAdmin | undefined>;
  fetchCustomerById: (
    customerId: string
  ) => Promise<ICustomerDetails | undefined>;
  fetchDeleteHotelOfHotelAdmin: (
    hotelId: string,
    hotelAdminId: string
  ) => Promise<boolean>;
  fetchDeleteBookingOfCustomer: (
    bookingId: string,
    customerId: string
  ) => Promise<boolean>;
  fetchUpdateHotelDetails: (
    hotelId: string,
    selectedHotel: Partial<IHotelOfSuperAdmin> | null,
    hotelAdminId: string
  ) => Promise<boolean>;
  fetchUpdateHotelAdminDetails: (
    hotelAdminId: string,
    selectedHotelAdmin: Partial<IHotelAdminDetails> | null
  ) => Promise<boolean>;
  fetchUpdateCustomerDetails: (
    customerId: string,
    selectedCustomer: Partial<ICustomerDetails> | null
  ) => Promise<boolean>;
  fetchHotelAdminsBySearch: (
    searchQuery: string
  ) => Promise<IHotelAdminDetails[]>;
  fetchHotelsBySearch: (
    hotelAdminId: string,
    searchQuery: string
  ) => Promise<IHotelOfSuperAdmin[]>;
  fetchCustomersBySearch: (searchQuery: string) => Promise<ICustomerDetails[]>;
  fetchReviewsBySearch: (
    hotelId: string,
    searchQuery: string
  ) => Promise<IReviewOfSuperAdmin[]>;
  fetchDeleteReviewOfHotel: (reviewId: string) => Promise<boolean>;
  fetchDeleteRoomTypeOfHotel: (roomtypeId: string) => Promise<boolean>;
  fetchUpdateRoomTypeDetails: (
    roomtypeId: string,
    selectedRoomType: Partial<IRoomTypeOfSuperAdmin> | null
  ) => Promise<boolean>;
  fetchRoomTypesBySearch: (
    hotelId: string,
    searchQuery: string
  ) => Promise<IRoomTypeOfSuperAdmin[]>;
  fetchRoomsByRoomTypeId: (roomTypeId: string) => Promise<IRoomOfSuperAdmin[]>;
  fetchDeleteRoom: (roomId: string) => Promise<boolean>;
  fetchUpdateRoom: (
    roomId: string,
    selectedRoom: Partial<IRoomOfSuperAdmin>
  ) => Promise<boolean>;
  fetchRoomsBySearch: (
    roomTypeId: string,
    searchQuery: string
  ) => Promise<IRoomOfSuperAdmin[]>;
}

export interface IHotelAdminDetails {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birthDate: string;
  numberOfHotels: number;
  isAdmin: boolean;
  hotels: IHotelOfSuperAdmin[];
}

export interface ICustomerDetails {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birthDate: string;
  isAdmin: boolean;
  bookings: IBookingOfSuperAdmin[];
}

export interface IBookingOfSuperAdmin {
  id: string;
  date: string;
  isDeleted: boolean;
  bookingDetails: IBookingDetailsOfSuperAdmin;
  customer: ICustomerOfSuperAdmin;
  availabilities: Partial<IAvailabilityOfSuperAdmin>[];
}

export interface IBookingDetailsOfSuperAdmin {
  id: string;
  total: number;
  isDeleted: boolean;
  status: string;
  hotel: IHotelOfSuperAdmin;
  availabilities: Partial<IAvailabilityOfSuperAdmin>[];
}

export interface IHotelOfSuperAdmin {
  id: string;
  name: string;
  description: string;
  email: string;
  country: string;
  city: string;
  price: number;
  address: string;
  location: number[];
  totalRooms: number;
  services: string[] | string;
  rating: string;
  images: string[];
  isDeleted: boolean;
  roomstype: IRoomTypeOfSuperAdmin[];
  reviews: IReviewOfSuperAdmin[];
}

export interface IRoomTypeOfSuperAdmin {
  id: string;
  name: string;
  capacity: number;
  totalBathrooms: number;
  totalBeds: number;
  price: number;
  images: string[];
  isDeleted: boolean;
  rooms: IRoomOfSuperAdmin[];
}

export interface IRoomOfSuperAdmin {
  id: string;
  roomNumber: string;
  isDeleted: boolean;
  isAvailable: boolean;
  roomtype: IRoomTypeOfSuperAdmin;
}

export interface IAvailabilityOfSuperAdmin {
  id: string;
  startDate: string;
  endDate: string;
  isAvailable: boolean;
  isDeleted: boolean;
  room: IRoomOfSuperAdmin;
}

export interface ICustomerOfSuperAdmin {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  birthDate: string;
  isAdmin: boolean;
  bookings: IBookingOfSuperAdmin[];
}

export interface IDecodedTokenSuperAdmin extends JwtPayload {
  id: string;
  name: string;
  email: string;
  superAdmin: boolean;
}

export interface ISuperAdmin {
  id: string;
  name: string;
  email: string;
  superAdmin: boolean;
}

export interface IHotelAdminsProps {
  searchQuery: string;
}

export interface IEditProfileUser {
  name: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  phone: string;
}

export interface IEditProfileHotelier {
  name: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  birthDate: string;
}

export interface ICustomersProps {
  searchQuery: string;
}

export interface IReviewOfSuperAdmin {
  id: string;
  comment: string;
  date: string;
  rating: number;
  customer: ICustomerOfSuperAdmin;
}

export interface IReviewErrors {
  rating: string;
  comment: string;
}
