import { ILogin, IUser, IUserContextType, IUserResponse } from "@/interfaces";
import { postLogin, postRegister } from "@/lib/server/fetchUsers";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  signIn: async () => false,
  signUp: async () => false,
  logOut: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<IUserResponse> | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const signUp = async (user: Omit<IUser, "id">) => {
    try {
      const data = await postRegister(user);
      if (data.id) {
        await signIn({ email: user.email, password: user.password });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const signIn = async (credentials: ILogin) => {
    try {
        const data = await postLogin(credentials)
        if(data.user && data.token) {
            setUser(data.user);
            setIsLogged(true);
            typeof window !== "undefined" && localStorage.setItem("user", JSON.stringify(data.user))
            typeof window !== "undefined" && localStorage.setItem("token", JSON.stringify(data.token))
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
  }
  const logOut = () => {
    const confirm = window.confirm("¿Seguro que quieres cerrar sesión?")
    if(confirm) {
        setUser(null)
        setIsLogged(false)
        typeof window !== "undefined" && localStorage.removeItem("user")
        typeof window !== "undefined" && localStorage.removeItem("token")
    }
  }
  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("token")
    if(token) {
        setIsLogged(true)
    } else {
        setIsLogged(false)
    }
  }, [])
  useEffect(() => {
    const user = typeof window !== "undefined" && localStorage.getItem("user")
    if(user) {
        setUser(JSON.parse(user))
    } else {
        setUser(null)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        signIn,
        signUp,
        logOut,
      }}
    >
    {children}
    </UserContext.Provider>
  );
};
