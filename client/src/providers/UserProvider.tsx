"use client";
import { User } from "lucide-react";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  SetStateAction,
} from "react";
import axios from "axios";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios(`${process.env.BACKEND}/refresh-user`, {
          headers: { Authorization: token },
        });
        localStorage.setItem("token", response.data);
      }
    };
    fetchToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,setUser
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
