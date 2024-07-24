// import { IUser, IUserContextType, IUserResponse } from "@/interfaces";
// import { createContext, useState } from "react";

// export const UserContext = createContext<IUserContextType>({
//   user: null,
//   setUser: () => {},
//   isLogged: false,
//   setIsLogged: () => {},
//   signIn: async () => false,
//   signUp: async () => false,
//   logOut: () => {},
// });

// export const UserProvider = ({children}: {children: React.ReactNode}) => {
//   const [user, setUser] = useState<Partial<IUserResponse> | null>(null);
//   const [isLogged, setIsLogged] = useState(false);

//   const signUp = async (user: Omit<IUser, "id">) => {
//     try {
//       const data = await postRegister(user);
//     } catch (error) {

//     }
//   }
// }
