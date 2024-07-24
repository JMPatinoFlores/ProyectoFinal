export interface IUser {
  id: number;
  name: string;
  lastname: string;
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

export interface IRegisterValues {
  name: string;
  lastname: string;
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
  signIn: (credentials: ILogin) => Promise<boolean>;
  signUp: (user: Omit<IUser, "id">) => Promise<boolean>;
  logOut: () => void;
}

export interface IUserResponse {
  id: number;
  email: string;
  name: string;
  lastname: string;
  token: string;
}
