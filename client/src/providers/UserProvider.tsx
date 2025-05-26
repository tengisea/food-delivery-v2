"use client";
import { User } from "lucide-react";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import axios, { Axios } from "axios";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
};

 const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { user, setUser } = useState<User>({ email: "", password: "" });

  useEffect(()=> {
    const token = localStorage.getItem("token")

    if(token) {
      const refreshToken = await axios(`${process.env.BACKEND}/refresh-user`, { headers: {Authorization: token}})
      localStorage.setItem("token", refreshToken)
    }      
  },[])

  return (
    <UserContext.Provider
      value={{
        user
      }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
